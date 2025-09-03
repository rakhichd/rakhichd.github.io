export default function Project0() {
    const sections = [
      {
        title: "part one",
        subtitle: "selfie: the wrong way vs. the right way",
        images: [
          { src: "/images/proj0/p1_close.jpeg", caption: "close up" },
          { src: "/images/proj0/p1_zoom.jpeg", caption: "zoomed in" },
        ],
      },
      {
        title: "part two",
        subtitle: "architectural perspective compression",
        images: [
          { src: "/images/proj0/p2_close.jpeg", caption: "close up" },
          { src: "/images/proj0/p2_zoom.jpeg", caption: "zoomed in" },
        ],
      },
      {
        title: "part three",
        subtitle: "the dolly zoom",
        images: [
          { src: "/images/proj0/dollyzoom.gif", caption: "the dolly zoom" },
        ],
      },
    ];
  
    return (
      <div 
        className="background-pattern"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          gap: "3rem",
          backgroundColor: "#F7F7EF",
          minHeight: "100vh",
        }}
      >
        {sections.map((section, idx) => (
          <div key={idx} style={{ width: "100%" }}>
            <h2 style={{ color: "#333", fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
              {section.title}
            </h2>
            <h3 style={{textAlign: "center" }}>{section.subtitle}</h3>
  
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
              {section.images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    padding: "5px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #CC4274, #FF6F91,rgb(255, 160, 192))",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                    textAlign: "center",
                    width: img.src.endsWith(".gif") ? "500px" : "300px",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{
                      width: "100%",
                      height: img.src.endsWith(".gif") ? "500px" : "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ fontSize: "1.25rem", marginTop: "0.5rem", color: "#333", fontWeight: "500" }}>
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  