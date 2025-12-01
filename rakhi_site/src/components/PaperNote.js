import React from "react";

export default function PaperNote({ title, children, height }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        backgroundColor: "#fff",
        padding: "2rem 2.5rem",
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        lineHeight: 1.7,
        color: "#222",
        margin: "0 auto",
        ...(height ? { height, overflowY: "auto" } : {}),
      }}
    >
      {title && (
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            marginBottom: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}

