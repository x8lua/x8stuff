import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function NotApproved() {
  return (
    <main className="xpScreen">
      <div className="topBar" />
      <section className="loginPanel">
        <div className="brandSide">
          <div className="windowsFlag">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <h1>x8stuff</h1>
            <p>Microsoft Windows XP Professional</p>
          </div>
        </div>

        <div className="divider" />

        <div className="authSide">
          <SignedOut>
            <p className="instruction">To begin, click your user name.</p>
            <div className="userTile">
              <div className="avatar">x8</div>
              <div className="signinWrap">
                <div className="userName">Administrator</div>
                <SignIn
                  routing="path"
                  path="/not-approved"
                  signUpUrl="/not-approved"
                  afterSignInUrl="/"
                  appearance={{
                    elements: {
                      rootBox: 'clerkRoot',
                      card: 'clerkCard',
                      headerTitle: 'clerkHidden',
                      headerSubtitle: 'clerkHidden',
                      socialButtonsBlockButton: 'xpButton',
                      formButtonPrimary: 'xpPrimary',
                      footerAction: 'clerkHidden',
                    },
                  }}
                />
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <p className="instruction">You are logged on.</p>
            <div className="signedBox">
              <UserButton afterSignOutUrl="/not-approved" />
              <a className="enterBtn" href="/">Enter x8stuff</a>
            </div>
          </SignedIn>
        </div>
      </section>

      <footer className="bottomBar">
        <span>After you log on, protected x8 folders will open automatically.</span>
        <span>Turn off computer</span>
      </footer>

      <style jsx global>{`
        html, body, #__next { margin: 0; min-height: 100%; }
        .clerkRoot { width: 100%; }
        .clerkCard {
          box-shadow: none !important;
          border: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          width: 100% !important;
        }
        .clerkHidden { display: none !important; }
        .xpButton, .xpPrimary {
          font-family: Tahoma, Verdana, sans-serif !important;
          border-radius: 3px !important;
        }
        .xpPrimary {
          background: linear-gradient(#6fa7ff, #245edb) !important;
          border: 1px solid #003c9d !important;
          color: white !important;
          box-shadow: inset 1px 1px rgba(255,255,255,0.45) !important;
        }
      `}</style>

      <style jsx>{`
        .xpScreen {
          min-height: 100vh;
          font-family: Tahoma, Verdana, sans-serif;
          background: linear-gradient(180deg, #5b8fe8 0%, #1d4fc5 46%, #1743a8 100%);
          color: white;
          display: grid;
          grid-template-rows: 88px 1fr 72px;
          overflow: hidden;
        }
        .topBar {
          background: linear-gradient(180deg, #2c72dc, #0c44b0);
          border-bottom: 2px solid rgba(255,255,255,0.35);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .bottomBar {
          background: linear-gradient(180deg, #1f5dd0, #0b3f9f);
          border-top: 2px solid rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 42px;
          font-size: 13px;
          box-shadow: 0 -4px 14px rgba(0,0,0,0.25);
        }
        .loginPanel {
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          align-items: center;
          width: min(980px, calc(100vw - 48px));
          margin: 0 auto;
          gap: 42px;
        }
        .brandSide {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 22px;
          text-align: right;
          text-shadow: 1px 2px 2px rgba(0,0,0,0.35);
        }
        .brandSide h1 {
          font-size: 52px;
          font-weight: 400;
          margin: 0;
          letter-spacing: -1px;
        }
        .brandSide p {
          margin: 6px 0 0;
          font-size: 16px;
          opacity: 0.92;
        }
        .windowsFlag {
          width: 72px;
          height: 62px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 4px;
          transform: skewY(-7deg);
          filter: drop-shadow(0 5px 5px rgba(0,0,0,0.35));
        }
        .windowsFlag span:nth-child(1) { background: #f35325; }
        .windowsFlag span:nth-child(2) { background: #81bc06; }
        .windowsFlag span:nth-child(3) { background: #05a6f0; }
        .windowsFlag span:nth-child(4) { background: #ffba08; }
        .divider {
          height: 250px;
          background: linear-gradient(transparent, rgba(255,255,255,0.55), transparent);
        }
        .authSide {
          min-width: 340px;
        }
        .instruction {
          font-size: 18px;
          margin: 0 0 18px;
          text-shadow: 1px 2px 2px rgba(0,0,0,0.35);
        }
        .userTile {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 8px;
          padding: 14px;
          box-shadow: inset 1px 1px rgba(255,255,255,0.22), 0 4px 12px rgba(0,0,0,0.2);
        }
        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 6px;
          background: linear-gradient(135deg, #fff7c1, #f0a020);
          color: #1743a8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.35);
        }
        .signinWrap { flex: 1; min-width: 0; }
        .userName {
          font-size: 22px;
          margin-bottom: 8px;
          text-shadow: 1px 2px 2px rgba(0,0,0,0.35);
        }
        .signedBox {
          display: flex;
          align-items: center;
          gap: 18px;
          background: rgba(255,255,255,0.15);
          padding: 18px;
          border-radius: 8px;
        }
        .enterBtn {
          color: white;
          text-decoration: none;
          background: linear-gradient(#6fa7ff, #245edb);
          border: 1px solid #003c9d;
          border-radius: 4px;
          padding: 8px 14px;
          box-shadow: inset 1px 1px rgba(255,255,255,0.45);
        }
        @media (max-width: 760px) {
          .loginPanel {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .divider { display: none; }
          .brandSide { justify-content: flex-start; text-align: left; }
          .brandSide h1 { font-size: 40px; }
          .bottomBar { padding: 0 18px; font-size: 11px; }
        }
      `}</style>
    </main>
  );
}
