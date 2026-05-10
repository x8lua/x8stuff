import crypto from 'crypto';

function hashPassword(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const adminPassword = process.env.X8_ADMIN_PASSWORD;
  const submittedPassword = req.body?.password;

  if (!adminPassword || typeof submittedPassword !== 'string') {
    return res.status(401).json({ ok: false });
  }

  const expected = Buffer.from(adminPassword);
  const received = Buffer.from(submittedPassword);

  if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
    return res.status(401).json({ ok: false });
  }

  const token = hashPassword(adminPassword);
  res.setHeader(
    'Set-Cookie',
    `x8_auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=86400`
  );

  return res.status(200).json({ ok: true });
}
