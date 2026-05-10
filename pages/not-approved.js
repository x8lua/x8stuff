import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function NotApproved() {
  return (
    <main className="xpScreen">
      <section className="loginPanel">
        <div className="brandSide">
          <div className="windowsFlag"><span /><span /><span /><span /></div>
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
                      main: 'clerkMain',
                      header: 'clerkHidden',
                      headerTitle: 'clerkHidden',
                      headerSubtitle: 'clerkHidden',
                      footer: 'clerkFooter',
                      footerAction: 'clerkHidden',
                      form: 'clerkForm',
                      formFieldLabel: 'clerkLabel',
                      formFieldInput: 'clerkInput',
                      formButtonPrimary: 'xpPrimary',
                      socialButtonsBlockButton: 'xpButton',
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
        <span>Protected x8 folders require sign-in.</span>
        <span>Turn off computer</span>
      </footer>

      <style jsx global>{`
        html, body, #__next { margin: 0; min-height: 100%; }
        .clerkRoot { width: 100%; max-width: 320px; }
        .clerkCard {
          width: 100% !important;
          max-width: 320px !important;
          min-width: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .clerkMain { padding: 0 !important; }
        .clerkHidden, .clerkFooter { display: none !important; }
        .clerkForm { gap: 8px !important; }
        .clerkLabel { font: 11px Tahoma, Verdana, sans-serif !important; color: #0b2f77 !important; }
        .clerkInput {
          height: 28px !important;
          min-height: 28px !important;
          font: 12px Tahoma, Verdana, sans-serif !important;
          border-radius: 3px !important;
        }
        .xpButton, .xpPrimary {
          height: 28px !important;
          min-height: 28px !important;
          font: 12px Tahoma, Verdana, sans-serif !important;
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
          background: linear-gradient(180deg, #5b8fe8 0%, #1d4fc5 48%, #1743a8 100%);
          color: white;
          display: grid;
          grid-template-rows: 1fr 58px;
          overflow: hidden;
        }
        .loginPanel {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          align-items: center;
          width: min(860px, calc(100vw - 48px));
          margin: 0 auto;
          gap: 34px;
        }
        .brandSide {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 18px;
          text-align: right;
          text-shadow: 1px 2px 2px rgba(0,0,0,0.35);
        }
        .brandSide h1 { font-size: 44px; font-weight: 400; margin: 0; letter-spacing: -1px; }
        .brandSide p { margin: 5px 0 0; font-size: 14px; opacity: 0.92; }
        .windowsFlag {
          width: 58px;
          height: 50px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 3px;
          transform: skewY(-7deg);
          filter: drop-shadow(0 5px 5px rgba(0,0,0,0.35));
        }
        .windowsFlag span:nth-child(1) { background: #f35325; }
        .windowsFlag span:nth-child(2) { background: #81bc06; }
        .windowsFlag span:nth-child(3) { background: #05a6f0; }
        .windowsFlag span:nth-child(4) { background: #ffba08; }
        .divider { height: 240px; background: linear-gradient(transparent, rgba(255,255,255,0.45), transparent); }
        .authSide { width: 400px; max-width: 100%; }
        .instruction { font-size: 16px; margin: 0 0 14px; text-shadow: 1px 2px 2px rgba(0,0,0,0.35); }
        .userTile {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          width: 360px;
          max-width: 100%;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 7px;
          padding: 12px;
          box-shadow: inset 1px 1px rgba(255,255,255,0.22), 0 4px 12px rgba(0,0,0,0.2);
        }
        .avatar {
          width: 54px;
          height: 54px;
          border-radius: 6px;
          background: linear-gradient(135deg, #fff7c1, #f0a020);
          color: #1743a8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.35);
          flex: 0 0 auto;
        }
        .signinWrap { flex: 1; min-width: 0; }
        .userName { font-size: 20px; margin-bottom: 8px; text-shadow: 1px 2px 2px rgba(0,0,0,0.35); }
        .signedBox { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.15); padding: 14px; border-radius: 8px; width: fit-content; }
        .enterBtn { color: white; text-decoration: none; background: linear-gradient(#6fa7ff, #245edb); border: 1px solid #003c9d; border-radius: 4px; padding: 7px 12px; box-shadow: inset 1px 1px rgba(255,255,255,0.45); }
        .bottomBar {
          background: linear-gradient(180deg, #1f5dd0, #0b3f9f);
          border-top: 2px solid rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          font-size: 12px;
          box-shadow: 0 -4px 14px rgba(0,0,0,0.25);
        }
        @media (max-width: 760px) {
          .loginPanel { grid-template-columns: 1fr; gap: 24px; width: min(420px, calc(100vw - 32px)); }
          .divider { display: none; }
          .brandSide { justify-content: flex-start; text-align: left; }
          .brandSide h1 { font-size: 38px; }
          .authSide, .userTile { width: 100%; }
          .bottomBar { padding: 0 18px; font-size: 11px; }
        }
      `}</style>
    </main>
  );
}
