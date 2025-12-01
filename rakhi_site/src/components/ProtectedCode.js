import React, { useState } from "react";

export default function ProtectedCode({ code }) {
  const [entered, setEntered] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shown, setShown] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (entered.trim().toLowerCase() === "pink") {
      setUnlocked(true);
      setShown(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  if (unlocked) {
    return (
      <div style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          style={{
            padding: "0.45rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid rgba(15,23,42,0.2)",
            background: "#f1f5f9",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          {shown ? "Hide code" : "Show code"}
        </button>
        {shown && (
          <pre
            style={{
              backgroundColor: "#f9f9f9",
              padding: "1rem",
              borderRadius: "8px",
              fontFamily: "monospace",
              overflowX: "auto",
              border: "1px solid rgba(15,23,42,0.08)",
            }}
          >
            <code>{code}</code>
          </pre>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "0.75rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: 600, color: "#0f172a" }}>
          Enter password to view code:
        </span>
        <input
          type="password"
          value={entered}
          onChange={(e) => setEntered(e.target.value)}
          placeholder="password"
          style={{
            padding: "0.4rem 0.6rem",
            borderRadius: "6px",
            border: "1px solid rgba(15,23,42,0.2)",
            fontSize: "0.95rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.45rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid rgba(15,23,42,0.2)",
            background: "#f1f5f9",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Unlock
        </button>
        {error && (
          <span style={{ color: "#b91c1c", fontSize: "0.9rem" }}>{error}</span>
        )}
      </div>
    </form>
  );
}

