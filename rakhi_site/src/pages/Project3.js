export default function Project3() {
  const sections = [
    {
      title: "Stitching Photo Mosaics",
      text: [
        {
          title: "A.1: Shoot the Pictures",
          paragraph: `I started off by taking images with my phone, keeping the center of projection fixed. This allows the transforms between the images to be projective.`,
          gallery: [
            { src: "/images/proj3/t1.jpeg", caption: "Doe Library 1" },
            { src: "/images/proj3/t2.jpeg", caption: "Doe Library 2" },
            { src: "/images/proj3/t3.jpeg", caption: "Doe Library 3" },
            { src: "/images/proj3/mlk1.jpeg", caption: "MLK Student Union 1" },
            { src: "/images/proj3/mlk2.jpeg", caption: "MLK Student Union 2" },
            { src: "/images/proj3/mlk3.jpeg", caption: "MLK Student Union 3" },
          ],
        },
        {
          title: "A.2: Recover Homographies",
          paragraph: `Before I could warp my images into alignment, I first needed to recover the parameters of the transformation between each pair of images. Here the transformation is a homography: p’=Hp, where H is a 3x3 matrix with 8 degrees of freedom (lower right corner is a scaling factor and is set to 1). I recovered the homography via a set of (p’,p) pairs of corresponding points taken from the two images.`,
          matrices: [
            [
              [1.30388187e+00, -8.78985976e-03, -8.75895503e+02],
              [5.89996198e-02, 1.14950739e+00, -9.89548920e+01],
              [6.75529586e-05, 9.09774882e-06, 1.00000000e+00],
            ],
            [
              [1.10447822e+00, -6.54836142e-02, -4.13891883e+02],
              [5.55060371e-02, 1.01322611e+00, -1.71479872e+01],
              [3.29964318e-05, -2.06440482e-05, 1.00000000e+00],
            ],
          ],
          gallery: [
            { src: "/images/proj3/hp.jpeg", caption: "Step 1 – Represent projective transform between each pair using H." },
            { src: "/images/proj3/trans.jpeg", caption: "Step 2 – Given correspondences, compute the projective transform." },
            { src: "/images/proj3/recover.jpeg", caption: "Step 3 – Recover H using least squares (requires ≥ 4 points)." },
            { src: "/images/proj3/cor1.jpeg", caption: "Correspondences: Doe Library (H Matrix 1)" },
            { src: "/images/proj3/cor2.jpeg", caption: "Correspondences: MLK Student Union (H Matrix 2)" },
          ],
        },
        {
          title: "A.3: Warp the Images",
          paragraph: `With the homography parameters recovered, each image can be warped toward a reference image using inverse warping to avoid holes in the output.`,
          paragraph1: `• **Nearest Neighbor Interpolation** rounds coordinates to the nearest pixel. It’s faster and simpler, but slightly lower in quality — useful for quick tests or lower-res inputs.`,
          paragraph2: `• **Bilinear Interpolation** computes weighted averages of the four surrounding pixels. Produces smoother, higher-quality results, but at higher compute cost.`,
          gallery: [
            { src: "/images/proj3/window.jpeg", caption: "Original Window Image" },
            { src: "/images/proj3/windowNN.jpeg", caption: "Window – Nearest Neighbor" },
            { src: "/images/proj3/windowBi.jpeg", caption: "Window – Bilinear" },
            { src: "/images/proj3/swim.jpeg", caption: "Original Poster Image", group: "swim" },
            { src: "/images/proj3/swimNN.jpeg", caption: "Poster – Nearest Neighbor", group: "swim" },
            { src: "/images/proj3/swimBi.jpeg", caption: "Poster – Bilinear", group: "swim" },
          ],
        },
        {
          title: "A.4: Blend the Images into a Mosaic",
          paragraph: `To combine warped images into a mosaic, I used weighted averaging to reduce edge artifacts instead of simple overwriting. Each image was resized to ~1000px width for consistency.`,
          paragraph1: `I computed the canvas size based on both image dimensions, warped each image into this shared projection, and blended them via weighted averaging. Bilinear interpolation was used for smooth warping and reduced visible seams.`,
          gallery: [
            { src: "/images/proj3/room1.jpeg", caption: "Room 1"},
            { src: "/images/proj3/room2.jpeg", caption: "Room 2"},
            { src: "/images/proj3/finalRoom.jpeg", caption: "Blended Room Mosaic"},
            { src: "/images/proj3/ny1.jpg", caption: "Met Rooftop 1" },
            { src: "/images/proj3/ny3.jpg", caption: "Met Rooftop 2" },
            { src: "/images/proj3/finalNyc.jpeg", caption: "Met Rooftop Mosaic"},
            { src: "/images/proj3/kitchen1.jpeg", caption: "Kitchen 1" },
            { src: "/images/proj3/kitchen2.jpeg", caption: "Kitchen 2" },
            { src: "/images/proj3/finalKitchen.jpeg", caption: "Blended Kitchen Mosaic"},
            { src: "/images/proj3/campus1.jpeg", caption: "Campus 1" },
            { src: "/images/proj3/campus2.jpeg", caption: "Campus 2" },
            { src: "/images/proj3/finalCampus.jpeg", caption: "Blended Campus Mosaic"},
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F7F7FB", color: "#333", paddingBottom: "4rem" }}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
          <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: 700, color: "#1f1f2e", marginBottom: "2.5rem" }}>
            {section.title}
          </h1>

          {section.text.map((txt, tIdx) => (
            <div
              key={tIdx}
              style={{
                background: "white",
                padding: "2.5rem",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                marginBottom: "3rem",
              }}
            >
              {txt.title && <h2 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#2c2c3e", marginBottom: "1.2rem" }}>{txt.title}</h2>}
              {[txt.paragraph, txt.paragraph1, txt.paragraph2]
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i} style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: p }} />
                ))}

              {txt.matrices &&
                txt.matrices.map((matrix, mIdx) => (
                  <div key={mIdx} style={{ margin: "1.5rem 0" }}>
                    <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Homography Matrix {mIdx + 1}:</p>
                    <pre
                      style={{
                        background: "#1e1e1e",
                        color: "#d4d4d4",
                        padding: "1rem 1.25rem",
                        borderRadius: "8px",
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        overflowX: "auto",
                      }}
                    >
{matrix.map(row => `[${row.map(v => v.toExponential(6)).join(", ")}]`).join("\n")}
                    </pre>
                  </div>
                ))}

              {txt.gallery && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "1.5rem",
                    marginTop: "2rem",
                  }}
                >
                  {txt.gallery.map((img, i) => (
                    <div key={i} style={{ gridColumn: img.standalone ? "1 / -1" : undefined, textAlign: "center" }}>
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: img.standalone ? "600px" : "400px",
                          borderRadius: "12px",
                          objectFit: "contain",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        }}
                      />
                      <p style={{ fontSize: "0.95rem", color: "#555", marginTop: "0.6rem" }}>{img.caption}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
