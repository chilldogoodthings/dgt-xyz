export default function SomeOtherPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to the Bare Landing Page</h1>
      <p>
        This page has no header or footer because it sits in the (bare) group.
      </p>

      <div className="cta-section">
        <button>Get Started</button>
      </div>
    </main>
  );
}
