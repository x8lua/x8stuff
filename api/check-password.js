// /api/check-password.js
// requires: npm install bcrypt
// recommended: set env var SEARCH_PWD_HASH to a bcrypt hash of your password
// generate a hash locally: node -e "console.log(require('bcrypt').hashSync('x8AuditLog', 12))"

import bcrypt from 'bcrypt';

const MAX_ATTEMPTS = 6;
const LOCK_SECONDS = 60 * 5; // 5 minutes lock

// simple in-memory store for rate limiting (ephemeral — use Redis/Upstash in production)
const attempts = new Map(); // key: ip, value: { count, lockedUntil }

// helper to parse JSON body (works in vercel serverless)
async function parseJsonBody(req) {
  let body = '';
  for await (const chunk of req) body += chunk;
  try { return JSON.parse(body || '{}'); } catch (e) { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'use POST' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  let rec = attempts.get(ip) || { count: 0, lockedUntil: 0 };

  // check lockout
  const now = Date.now();
  if (rec.lockedUntil && rec.lockedUntil > now) {
    return res.status(429).json({ ok: false, error: 'too_many_attempts' });
  }

  const body = await parseJsonBody(req);
  if (!body) return res.status(400).json({ ok: false, error: 'invalid_json' });

  const password = (body.password || '').toString();

  const hash = process.env.SEARCH_PWD_HASH; // bcrypt hash, not plaintext
  if (!hash) {
    // don't reveal the real secret — but let you know in logs
    console.error('SEARCH_PWD_HASH not set');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  try {
    const ok = await bcrypt.compare(password, hash);

    if (!ok) {
      // increment attempts
      rec.count = (rec.count || 0) + 1;
      if (rec.count >= MAX_ATTEMPTS) {
        rec.lockedUntil = now + LOCK_SECONDS * 1000;
        rec.count = 0; // reset after locking (optional)
      }
      attempts.set(ip, rec);
      return res.status(401).json({ ok: false });
    }

    // success: reset attempts for this ip
    attempts.delete(ip);

    // create a simple session token (signed) OR return ok true
    // for production, set a secure httpOnly cookie or return JWT
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('compare error', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}
