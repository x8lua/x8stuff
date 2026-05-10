import { useState } from 'react';

export default function NotApproved() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('ACCESS_DENIED');

  async function login() {
    const password = window.prompt('administrator password');
    if (!password) return;

    setBusy(true);
    setMessage('VERIFYING_CREDENTIALS');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setMessage('INVALID_PASSWORD');
        return;
      }

      setMessage('ACCESS_GRANTED');
      window.location.href = '/';
    } catch {
      setMessage('AUTH_SERVICE_UNAVAILABLE');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="screen">
      <button className="hiddenLogin" type="button" onClick={login} disabled={busy} aria-label="admin login" />
      <section className="bsod">
        <p>A problem has been detected and access has been shut down to prevent damage to your universe.</p>
        <p>X8_NOT_APPROVED</p>
        <p>
          If this is the first time you've seen this stop error screen, restart your brain. If this screen appears again,
          follow these steps:
        </p>
        <p>Check to make sure you are allowed to view this directory. If a new folder is protected, ask the administrator for clearance.</p>
        <p>Technical information:</p>
        <p>*** STOP: 0x0000008X ({message})</p>
        <p className="hint">press the invisible corner if you know the password</p>
      </section>

      <style jsx>{`
        .screen {
          min-height: 100vh;
          margin: 0;
          background: #0000aa;
          color: white;
          font-family: 'Lucida Console', 'Courier New', monospace;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }
        .bsod {
          width: min(900px, 100%);
          font-size: clamp(16px, 2.2vw, 24px);
          line-height: 1.45;
          text-shadow: 1px 1px #000;
        }
        .hiddenLogin {
          position: fixed;
          right: 0;
          bottom: 0;
          width: 64px;
          height: 64px;
          opacity: 0;
          border: 0;
          cursor: default;
        }
        .hint {
          opacity: 0.18;
          font-size: 0.72em;
        }
      `}</style>
    </main>
  );
}
