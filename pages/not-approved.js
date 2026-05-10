import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function NotApproved() {
  return (
    <main className="screen">
      <section className="bsod">
        <p>A problem has been detected and access has been shut down to prevent damage to your universe.</p>
        <p>X8_NOT_APPROVED</p>
        <p>
          If this is the first time you've seen this stop error screen, sign in with an approved x8 account. If this
          screen appears again, check whether your account has access.
        </p>
        <p>Technical information:</p>
        <p>*** STOP: 0x0000008X (CLERK_AUTH_REQUIRED)</p>
        <div className="authBox">
          <SignedOut>
            <SignIn routing="path" path="/not-approved" signUpUrl="/not-approved" afterSignInUrl="/" />
          </SignedOut>
          <SignedIn>
            <p className="signedIn">You are signed in. Return to the protected page or go home.</p>
            <UserButton afterSignOutUrl="/not-approved" />
            <a className="home" href="/">return home</a>
          </SignedIn>
        </div>
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
          width: min(920px, 100%);
          font-size: clamp(16px, 2vw, 22px);
          line-height: 1.45;
          text-shadow: 1px 1px #000;
        }
        .authBox {
          margin-top: 28px;
          display: inline-block;
          color: #111827;
          text-shadow: none;
        }
        .signedIn {
          color: white;
          text-shadow: 1px 1px #000;
          margin-bottom: 12px;
        }
        .home {
          display: inline-block;
          margin-left: 16px;
          color: white;
          text-shadow: 1px 1px #000;
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}
