import { useState } from 'react';

export default function Project3() {
  const [hoveredImg, setHoveredImg] = useState(null);

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
          paragraph: `Before I could warp my images into alignment, I first needed to recover the parameters of the transformation between each pair of images. Here the transformation is a homography: p'=Hp, where H is a 3x3 matrix with 8 degrees of freedom (lower right corner is a scaling factor and is set to 1). I recovered the homography via a set of (p',p) pairs of corresponding points taken from the two images.`,
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
            { src: "/images/proj3/hp.jpeg", caption: "Step 1 - we represent the projective transformation between each left and right image using a homography matrix, H." },
            { src: "/images/proj3/trans.jpeg", caption: "Step 2 - given the correspondences, the projective transformation between two images" },
            { src: "/images/proj3/recover.jpeg", caption: "Step 3 – recover the homography by solving the following system using least squares. we have 8 degrees of freedom, so at least 4 points are needed" },
            { src: "/images/proj3/cor1.jpeg", caption: "Correspondences: Doe Library (H Matrix 1)" },
            { src: "/images/proj3/cor2.jpeg", caption: "Correspondences: MLK Student Union (H Matrix 2)" },
          ],
        },
        {
          title: "A.3: Warp the Images",
          paragraph: `With the homography parameters recovered, each image can be warped toward a reference image using inverse warping to avoid holes in the output.`,
          paragraph1: `• The first was Nearest Neighbor Interpolation where coordinates were rounded to their nearest pixel value. I observed that this method tended to be faster in comparison and simpler to implement, however the overall image quality seemed to be slightly less. In this case however where my pictures weren't as high in quality, I would prefer to use this method given its speed.`,
          paragraph2: `• The next method was Bilinear Interpolation where the weighted average of the four neighboring pixels were used to compute. I observed that this method provided images that were a little smoother and of higher quality, yet the time taken to compute was much longer in comparison.`,
          gallery: [
            { src: "/images/proj3/window.jpeg", caption: "Original Window Image" },
            { src: "/images/proj3/windowNN.jpeg", caption: "Window via Bilinear Interpolation" },
            { src: "/images/proj3/windowBi.jpeg", caption: "Window via Nearest Neighbor Interpolation" },
            { src: "/images/proj3/swim.jpeg", caption: "Original Poster Image", group: "swim" },
            { src: "/images/proj3/swimNN.jpeg", caption: "Poster – Nearest Neighbor", group: "swim" },
            { src: "/images/proj3/swimBi.jpeg", caption: "Poster – Bilinear", group: "swim" },
          ],
        },
        {
          title: "A.4: Blend the Images into a Mosaic",
          paragraph: `Here, images were warped so they could create an image mosaic. Instead of having one picture overwrite the other, which would lead to strong edge artifacts, weighted averaging was used. Each image was resized to ~1000px width for consistency.`,
          paragraph1: `I warped all images into a new projection, and did this in one shot. I first determined the size of the final mosaic by using the dimensions of my two images, based on which image i was computing homographies on. Then I warped all my images into that size by computing the final image size. This way I had a stack of images together defining the mosaic. Next, to blend them together to produce a single image, I made sure to use weighted averaging and blending to reduce edge artifacts. This way the mask would not be visible after the images were blended together. I used bilinear interpolation for my warping here.`,
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
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", 
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)",
      color: "#1a1a2e",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 30%, rgba(31, 31, 46, 0.02) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(31, 31, 46, 0.03) 0%, transparent 40%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Hero Header */}
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)",
        padding: "8rem 2rem 6rem 2rem",
        textAlign: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(20px)",
        zIndex: 1,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)"
      }}>
        {/* Floating particles */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "6px",
          height: "6px",
          background: "rgba(31, 31, 46, 0.15)",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(31, 31, 46, 0.1)"
        }} />
        <div style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "8px",
          height: "8px",
          background: "rgba(31, 31, 46, 0.1)",
          borderRadius: "50%",
          boxShadow: "0 0 30px rgba(31, 31, 46, 0.08)"
        }} />
        
        <h1 style={{ 
          fontSize: "5rem", 
          fontWeight: 900, 
          background: "linear-gradient(135deg, #1f1f2e 0%, #4a5568 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1.5rem",
          letterSpacing: "-0.03em"
        }}>
          Stitching Photo Mosaics
        </h1>
        <div style={{
          width: "120px",
          height: "4px",
          background: "linear-gradient(90deg, transparent, #1f1f2e, transparent)",
          margin: "2rem auto",
          borderRadius: "2px"
        }} />
        <p style={{
          fontSize: "1.4rem",
          color: "#4a5568",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.8",
          fontWeight: 500
        }}>
          Exploring homographies, image warping, and seamless blending through computational photography
        </p>
      </div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          padding: "4rem 2rem",
          position: "relative",
          zIndex: 1
        }}>
          {section.text.map((txt, tIdx) => (
            <div
              key={tIdx}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(40px)",
                padding: "4rem",
                borderRadius: "32px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                marginBottom: "4rem",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Subtle corner accent */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle at 100% 0%, rgba(31, 31, 46, 0.03) 0%, transparent 70%)",
                pointerEvents: "none"
              }} />
              
              {txt.title && (
                <div style={{ marginBottom: "3rem", position: "relative" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "linear-gradient(135deg, #1f1f2e 0%, #2d3748 100%)",
                    padding: "0.8rem 2rem",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 10px 40px rgba(31, 31, 46, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)"
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
                      borderRadius: "50%",
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
                    }} />
                    <h2 style={{ 
                      fontSize: "1.2rem", 
                      fontWeight: 700, 
                      color: "#ffffff",
                      margin: 0,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}>
                      {txt.title}
                    </h2>
                  </div>
                </div>
              )}

              <div style={{ position: "relative", zIndex: 1 }}>
                {[txt.paragraph, txt.paragraph1, txt.paragraph2]
                  .filter(Boolean)
                  .map((p, i) => (
                    <p 
                      key={i} 
                      style={{ 
                        fontSize: "1.2rem", 
                        lineHeight: "2", 
                        marginBottom: "2rem",
                        color: "#2d3748"
                      }} 
                      dangerouslySetInnerHTML={{ __html: p }} 
                    />
                  ))}

                {txt.matrices &&
                  txt.matrices.map((matrix, mIdx) => (
                    <div key={mIdx} style={{ 
                      margin: "3rem 0",
                      background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
                      padding: "2.5rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.5rem"
                      }}>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          background: "#60a5fa",
                          borderRadius: "50%",
                          boxShadow: "0 0 20px #60a5fa"
                        }} />
                        <p style={{ 
                          fontWeight: 700, 
                          margin: 0,
                          color: "#e5e7eb",
                          fontSize: "1.15rem",
                          letterSpacing: "0.03em"
                        }}>
                          Homography Matrix {mIdx + 1}
                        </p>
                      </div>
                      <pre
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          color: "#d4d4d4",
                          padding: "2rem",
                          borderRadius: "16px",
                          fontFamily: "'Fira Code', 'SF Mono', monospace",
                          fontSize: "1rem",
                          overflowX: "auto",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          lineHeight: "1.8"
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
                      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                      gap: "2.5rem",
                      marginTop: "4rem",
                    }}
                  >
                    {txt.gallery.map((img, i) => (
                      <div 
                        key={i}
                        onMouseEnter={() => setHoveredImg(`${tIdx}-${i}`)}
                        onMouseLeave={() => setHoveredImg(null)}
                        style={{ 
                          gridColumn: img.standalone ? "1 / -1" : undefined,
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "20px",
                          background: "white",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          boxShadow: hoveredImg === `${tIdx}-${i}` 
                            ? "0 30px 90px rgba(0,0,0,0.15), 0 0 0 1px rgba(31, 31, 46, 0.1)"
                            : "0 20px 60px rgba(0,0,0,0.08)",
                          transform: hoveredImg === `${tIdx}-${i}` ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          cursor: "pointer"
                        }}
                      >
                        {/* Subtle glow effect on hover */}
                        {hoveredImg === `${tIdx}-${i}` && (
                          <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "radial-gradient(circle at 50% 0%, rgba(31, 31, 46, 0.04) 0%, transparent 70%)",
                            pointerEvents: "none",
                            zIndex: 1
                          }} />
                        )}
                        
                        <div style={{
                          position: "relative",
                          overflow: "hidden",
                          background: "#f8f9fa"
                        }}>
                          <img
                            src={img.src}
                            alt={img.caption}
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: img.standalone ? "700px" : "450px",
                              objectFit: "contain",
                              display: "block",
                              filter: hoveredImg === `${tIdx}-${i}` ? "brightness(1.05)" : "brightness(1)",
                              transition: "filter 0.4s ease"
                            }}
                          />
                        </div>
                        <div style={{
                          padding: "1.75rem",
                          background: "white",
                          borderTop: "1px solid rgba(0, 0, 0, 0.06)"
                        }}>
                          <p style={{ 
                            fontSize: "1rem", 
                            color: "#4a5568",
                            margin: 0,
                            fontWeight: 500,
                            lineHeight: "1.6"
                          }}>
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      
      {/* Premium Footer */}
      <div style={{
        position: "relative",
        textAlign: "center",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        zIndex: 1
      }}>
        <div style={{
          width: "60px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(31, 31, 46, 0.3), transparent)",
          margin: "0 auto 1.5rem auto"
        }} />
        <p style={{ 
          margin: 0,
          color: "#6b7280",
          fontSize: "1rem",
          letterSpacing: "0.05em",
          fontWeight: 500
        }}>
          Computer Vision • Image Stitching & Mosaics
        </p>
      </div>
    </div>
  );
}