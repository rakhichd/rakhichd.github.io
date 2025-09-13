import React, { useState, useRef, useEffect } from "react";

export default function SmoothSlider({ before, after }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0.5);
  const [hovered, setHovered] = useState(false);
  const draggingRef = useRef(false);

  const handleMouseMove = (e) => {
    if (!draggingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPos = (e.clientX - rect.left) / rect.width;
    newPos = Math.max(0, Math.min(1, newPos));
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const handleMouseDown = () => {
    draggingRef.current = true;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "500px",
        height: "400px",
        cursor: "grab",
        overflow: "hidden",
        borderRadius: "8px",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* After image */}
      <img
        src={after}
        alt="After"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Before image clipped to position */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${position * 100}%`,
          height: "100%",
          overflow: "hidden",
          transition: draggingRef.current ? "none" : "width 0.15s ease-out",
        }}
      >
        <img
          src={before}
          alt="Before"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Slider handle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${position * 100}%`,
          transform: "translateX(-50%)",
          height: "100%",
          width: "50px",
          cursor: "ew-resize",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thick handle line */}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "6px",
            background: "white",
            borderRadius: "3px",
            boxShadow: hovered
              ? "0 0 12px 4px rgba(229, 229, 229, 0.9)"
              : "0 0 8px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.2s ease-in-out",
            zIndex: 1,
          }}
        />

        {/* Circular knob */}
        <div
          style={{
            position: "absolute",
            width: "36px",
            height: "36px",
            background: "#000000ff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hovered
              ? "0 0 20px 4px rgba(0, 0, 0, 0.9)"
              : "0 0 10px rgba(0, 0, 0, 0.7)",
            transition: "box-shadow 0.2s ease-in-out",
            zIndex: 2,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              textShadow: "0 0 3px rgba(0,0,0,0.5)",
            }}
          >
            ◀▶
          </span>
        </div>
      </div>
    </div>
  );
}
