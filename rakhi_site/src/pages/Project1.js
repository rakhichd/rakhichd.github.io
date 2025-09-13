import SmoothSlider from "../components/SmoothSlider";

export default function Project1() {
  const sections = [
    {
      title: "Part One",
      subtitle: "Single-scale implementation",
      images: [
        {
          caption: "green: (5, 2) | red: (12, 3)",
          subcaption: "cathedral.jpg",
          before: "/images/proj1/b_cathedral.jpg",
          after: "/images/proj1/a_cathedral.jpg",
        },
        {
          caption: "green: (-3, 2) | red: (3, 2)",
          subcaption: "monastery.jpg",
          before: "/images/proj1/b_monastery.jpg",
          after: "/images/proj1/a_monastery.jpg",
        },
        {
          caption: "green: (3, 2) | red: (6, 3)",
          subcaption: "tobolsk.jpg",
          before: "/images/proj1/b_tobolsk.jpg",
          after: "/images/proj1/a_tobolsk.jpg",
        },
      ],
      subcaption: "welcome to this"
    },
    {
      title: "Part Two",
      subtitle: "Multiscale pyramid implementation",
      images: [
        {
          caption: "green: (59, 17) | red: (123, 15)",
          subcaption: "harvesters.tif",
          before: "/images/proj1/b_harvesters.jpg",
          after: "/images/proj1/a_harvesters.jpg",
        },
        {
          caption: "green: (41, 18) | red: (90, 23)",
          subcaption: "icon.tif",
          before: "/images/proj1/b_icon.jpg",
          after: "/images/proj1/a_icon.jpg",
        },
        {
          caption: "green: (37, 21) | red: (76, 36)",
          subcaption: "italil.tif",
          before: "/images/proj1/b_italil.jpg",
          after: "/images/proj1/a_italil.jpg",
        },
        {
          caption: "green: (-3, -1) | red: (74, -8)",
          subcaption: "lastochikino.tif",
          before: "/images/proj1/b_lastochikino.jpg",
          after: "/images/proj1/a_lastochikino.jpg",
        },
        {
          caption: "green: (40, -15) | red: (93, -28)",
          subcaption: "lugano.tif",
          before: "/images/proj1/b_lugano.jpg",
          after: "/images/proj1/a_lugano.jpg",
        },
        {
          caption: "green: (82, 9) | red: (179, 21)",
          subcaption: "melons.tif",
          before: "/images/proj1/b_melons.jpg",
          after: "/images/proj1/a_melons.jpg",
        },
        {
          caption: "green (78, 29) | red: (175, 37)",
          subcaption: "self_portrait.tif",
          before: "/images/proj1/b_self_portrait.jpg",
          after: "/images/proj1/a_self_portrait.jpg",
        },
        {
          caption: "green (49, -5) | red: (96, -23)",
          subcaption: "siren.tif",
          before: "/images/proj1/b_siren.jpg",
          after: "/images/proj1/a_siren.jpg",
        },
        {
          caption: "green (50, 14) | red: (109, 11)",
          subcaption: "three_generations.tif",
          before: "/images/proj1/b_three_generations.jpg",
          after: "/images/proj1/a_three_generations.jpg",
        },
        {
          caption: "green: (25, 4) | red: (58, -4)",
          subcaption: "church.tif",
          before: "/images/proj1/b_church.jpg",
          after: "/images/proj1/a_church.jpg",
        },
        {
          caption: "green: (49, 24) | red: (107, 41)",
          subcaption: "emir.tif",
          before: "/images/proj1/b_emir.jpg",
          after: "/images/proj1/a_emir.jpg",
        },
      ],
    },
    {
      title: "Part Three",
      subtitle: "Additional Images with multiscale pyramid",
      images: [
        {
          caption: "green (49, 5) | red: (123, 13)",
          subcaption: "border.tif",
          before: "/images/proj1/b_border.jpg",
          after: "/images/proj1/a_border.jpg",
        },
        {
          caption: "green (0, 7) | red: (106, 10)",
          subcaption: "railroad.tif",
          before: "/images/proj1/b_railroad.jpg",
          after: "/images/proj1/a_railroad.jpg",
        },
        {
          caption: "green (40, 15) | red: (91, 25)",
          subcaption: "sboku.tif",
          before: "/images/proj1/b_sboku.jpg",
          after: "/images/proj1/a_sboku.jpg",
        },
        {
          caption: "green (45, 2) | red: (106, 0)",
          subcaption: "smolensk.tif",
          before: "/images/proj1/b_smolensk.jpg",
          after: "/images/proj1/a_smolensk.jpg",
        },
      ],
    },
  ];

  return (
    <div
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
        <div
          key={idx}
          style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        >
          <h2
            style={{
              color: "#333",
              fontSize: "2rem",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            {section.title}
          </h2>
          <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>
            {section.subtitle}
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {section.images.map((img, i) => (
              <div
                key={i}
                style={{
                  width: "500px",
                  borderRadius: "12px",
                  padding: "1rem",
                  backgroundColor: "#fff",
                  border: "2px solid #ddd",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  textAlign: "center",
                }}
              >
                <SmoothSlider before={img.before} after={img.after} />

                <div
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                >
                  {img.caption}
                </div>

                {img.subcaption && (
                  <div
                    style={{
                      marginTop: "0.25rem",
                      fontSize: "1rem",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  >
                    {img.subcaption}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <h4>{section.subcaption}</h4> */}
        </div>
      ))}
    </div>
  );
}
