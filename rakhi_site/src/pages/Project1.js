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
        padding: "3rem 1rem",
        gap: "3rem",
        backgroundColor: "#F7F7EF",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "600px",
          overflowY: "auto", 
          backgroundColor: "#fff",
          padding: "3rem 4rem",
          boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: "1.7",
          color: "#222",
        }}
      >
        <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        Colorizing the Prokudin-Gorskii Photo Collection
      </h1>

      <p>
        The objective of this process was to reconstruct color photographs
        from digitized Prokudin-Gorskii glass plate images. Each plate contained
        three grayscale exposures corresponding to the blue, green, and red
        channels. To form a proper RGB image, the channels first had to be
        extracted, placed on top of each other, and then accurately aligned to
        form a single RGB color image.
      </p>

      <p>
        My first attempt at alignment utilized an exhaustive single-scale search
        over a displacement window of [−15, 15] pixels. For each
        shift, the alignment quality was determined by the Normalized
        Cross-Correlation (NCC), which is defined as:
      </p>

      <pre
        style={{
          backgroundColor: "#f9f9f9",
          padding: "1rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          overflowX: "auto",
        }}
      >
        {"NCC(I1, I2) = (I1 / ||I1||) ⋅ (I2 / ||I2||)"}
      </pre>

      <p>
        The displacement that produced the maximum NCC score was optimal.
        While this approach worked well for the smaller, low-resolution images, jpg,
        its limited search range and high computational cost made it more impractical
        for the high-resolution glass plate scans, where displacements were
        often much larger.
      </p>

      <p>
        To overcome these limitations, I implemented a multiscale pyramid
        alignment strategy. In this approach, the image was represented at
        multiple resolutions, each reduced by a factor of two. The alignment started
        at the coarsest resolution, where a rough displacement estimate was
        obtained using the NCC method. This estimate was then scaled up by a factor of 2 
        and then further refined
        at progressively higher resolutions until the final alignment was
        determined at full resolution. This hierarchical approach both reduced
        computation time and created better results when handling large
        displacements.
      </p>

      <p>
        Despite these improvements, there were some challenges. A major issue was
        the presence of high-contrast borders around the plates, which dominated
        the similarity metric and frequently would mislead the alignment. To solve
        this, I cropped away the one-third of each edge off each image, ensuring that
        the alignment was based primarily on central image pixels.
      </p>

      <p>
        Another challenge appeared in the case of the Emir of Bukhara. Here, the
        multiscale method consistently failed when relying on raw pixel
        intensities, mainly due to brightness discrepancies across the three
        channels. This mismatch meant the pixel-wise similarity measure was not very effective alone. To
        solve this, I used a gradient-based alignment. Gradients
        in the horizontal and vertical directions were computed for each
        channel, and the resulting gradient magnitudes were used as the new basis
        for NCC scoring. Because gradients are able to emphasize the structural edges rather
        than absolute brightness values, this method was able to create better images and
        successfully aligned the Emir image where intensity-based methods
        were not as strong.
      </p>

      <p>
        The pyramid method also performed less effectively on the smaller JPEG test
        images. These images had lower resolution and were compressed, so they did not have the same 
        high structural detail that was needed for the pyramid alignment. This ultimate lead to poorer
        results compared to the glass plate scans.
      </p>

      <p>
        In summary, two alignment strategies were used in order to reconstruct
        the Prokudin-Gorskii color images. The single-scale method was good
        for small displacements in low-resolution images, but the pyramid
        approach was much better on high-resolution scans.
        Moreover, using gradient-based alignment improved
        overall images in cases where cross-channel brightness differences were
        more clear, such as in the Emir of Bukhara. Overall, these methods successfully 
        reconstructed color images from individual channels, emphasizing both the 
        the effectiveness of these alignment techniques.
      </p>
    </div>

      {/* --- Image sections styled as gallery --- */}
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
        </div>
      ))}
    </div>
  );
}
