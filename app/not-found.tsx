export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>404 - Page Not Found</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          background: "#2563eb",
          color: "white",
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go Home
      </a>
    </div>
  );
}

