import React, { useState } from "react";

export default function Project4() {
  const [hoveredKey, setHoveredKey] = useState(null);

  // Quick hero config — edit title/subtitle to fit your project
  const hero = {
    title: "Neural Radiance Field",
    subtitle:
      "NeRF represents a 3D scene volumetrically, without explicit surfaces using a neural network. The network is trained on a set of 2D images to synthesize novel 2D views of the scene.",
  };

  // Edit the sections array below by updating titles, paragraphs, and image paths.
  // Drop your images into /public/images/proj4 and reference them like "/images/proj4/your-file.jpg"
  const sections = [
    {
      title: "Part 0: Calibrating Your Camera and Capturing a 3D Scan",
      text: [
        {
          title: "0.1: Calibrating Your Camera",
          paragraph:
            "For my project, I will take a 3D scan of an object that I will later use to build a NeRF. To capture the necessary images, I use visual tracking markers called ArUco tags. These tags allow me to reliably identify the same 3D keypoints across multiple images. The process involves two main steps: first, I calibrate my camera to determine its intrinsic parameters, and second, I use this calibration to estimate the camera’s pose for each image.",
          gallery: [
            { src: "/images/proj4/arco1.jpeg", caption: "Example of Arco Tags" },
            { src: "/images/proj4/arco2.jpeg", caption: "Example of Arco Tags" }
          ],
        },
        {
          title: "0.2: Capturing a 3D Object Scan",
          paragraph:
            "For this next step, I used one arco tag and a plushie where I captured images of the two from different angles. This is in order to create a 360 degree view.",
          gallery: [
            { src: "/images/proj4/IMG_6311.jpeg", caption: "Single Arco Tag and Bear" },
            { src: "/images/proj4/IMG_6247.jpeg", caption: "Single Arco Tag and Bear from Different Angles" },
          ],
        },
        {
          title: "0.3: Estimating Camera Pose",
          paragraph:
            "After calibrating the camera, I estimated the pose (position and orientation) for every image using an ArUco tag as a marker. Because the tag’s physical size is known, it provides fixed 3D corner points visible in all views. For each frame, I detected the four tag corners in pixel coordinates and paired them with the tag’s 3D corner coordinates in real‑world units, then solved the Perspective‑n‑Point (PnP) problem with OpenCV’s solvePnP to recover the pose, giving us a rotation vector (orientation) and a translation vector (position). OpenCV returns world‑to‑camera transforms, so I inverted each to obtain camera‑to‑world matrices used later for NeRF rendering. To keep the pipeline robust, I skipped frames where the ArUco tag was not detected. Finally, I visualized the estimated poses as 3D camera frustums in viser to confirm they formed a consistent trajectory around the object.",
          gallery: [
            { src: "/images/proj4/v1.png", caption: "Pose 1" },
            { src: "/images/proj4/v2.png", caption: "Pose 2" },
          ],
        },
        {
          title: "0.4: Undistorting images and creating a dataset",
          paragraph:
            "With intrinsics and poses in hand, I undistorted all images using OpenCV’s cv2.undistort so they follow a pinhole camera model (as assumed by NeRF). When undistortion introduced black borders, I computed an optimal new camera matrix with cv2.getOptimalNewCameraMatrix, cropped to the valid ROI, and updated the principal point to account for the crop offset. Finally, I packaged the dataset into an .npz with train/val/test splits, and the focal length from intrinsics. This matches the expected loader format, so later parts can train and render.",
        },
      ],
    },
    {
      title: "Part 1: Fit a Neural Field to a 2D Image",
      text: [
        {
          title: "2D Neural Field: Positional Encoding + MLP",
          paragraph:
            "Before building a full 3D NeRF, I implemented a simplified 2D neural field to internalize the core ideas: representing a continuous signal with an MLP and sinusoidal positional encoding. Because radiance is undefined in 2D, the task becomes learning a function f that maps pixel coordinates to colors: f: ℝ² → [0,1]³, i.e., (x, y) ↦ RGB.",
          gallery: [
            { src: "/images/proj4/sample.jpeg", caption: "original image", standalone: true },
            { src: "/images/proj4/f1.png"},
            { src: "/images/proj4/f2.png"},
            { src: "/images/proj4/f3.png"},
            { src: "/images/proj4/f4.png", caption: "final image", standalone: true},
            { src: "/images/proj4/foxp.png", caption: "psnr plot", standalone: true },
            { src: "/images/proj4/bak.jpeg", caption: "original image, L=10, width=256",standalone: true },
            { src: "/images/proj4/b1.png"},
            { src: "/images/proj4/b2.png"},
            { src: "/images/proj4/b3.png"},
            { src: "/images/proj4/b4.png", caption: "final image",standalone: true},
            { src: "/images/proj4/2_64.png", caption: "original image, L=2, width=64"},
            { src: "/images/proj4/2_256.png", caption: "original image, L=2, width=256"},
            { src: "/images/proj4/10_64.png", caption: "original image, L=10, width=64"},
            { src: "/images/proj4/10_256.png", caption: "original image, L=10, width=256"},
          ],
        },
        {
          paragraph:
            "Higher positional encoding frequencies (L=10) capture fine details better than lower frequencies (L=2). Similarly, wider networks (256 units) produce smoother reconstructions compared to narrower ones (64 units).",
        },
      ],
    },
    {
      title: "Part 2: Fit a Neural Radiance Field from Multi-view Images",
      text: [
        {
          title: "Part 2.1: Create Rays from Cameras",
          paragraph: "To produce camera rays, I created three key coordinate transformations. First, I applied the 4×4 extrinsic matrix to map points from camera space into world coordinates. Next, I inverted the intrinsic matrix to transform pixel locations into 3D coordinates in the camera frame. Finally, I constructed rays by taking the camera center as the origin and computing the direction as the normalized vector from the camera center through each pixel.",
        },
        {
          title: "Part 2.2: Sampling",
          paragraph: "I built a randomized ray-sampling pipeline across all training images. UV coordinates are offset by 0.5 so samples come from pixel centers rather than edges. Along each selected ray, I draw 64 evenly spaced depth samples between the near and far bounds. During training, I inject a small random jitter into these depth values so the model doesn’t latch onto fixed sample positions and instead learns a smoother, more general representation.",
        },
        {
          title: "Part 2.3: Putting the Dataloading All Together",
          paragraph: "I implemented a consolidated RaysData class that precomputes all ray origins and directions for the training set, allowing fast sampling of 10,000 random rays each iteration. The dataloader outputs ray origins, ray directions, and the matching ground-truth RGB values for batch training. To confirm correctness, I visualized the camera frustums, rays, and sampled 3D points in Viser.",
          gallery: [
            { src: "/images/proj4/renderLego1.png", caption: "Camera Frustums, Rays, and Sampled 3D Points" },
            { src: "/images/proj4/renderLego2.png", caption: "Camera Frustums, Rays, and Sampled 3D Points" },
          ],
        },
        {
          title: "Part 2.4: Neural Radiance Field",
          paragraph: "For my new model, compared to part 1, I added in more layers in order for the 3D objects to show up better. My model is made up of the 8-layer MLP. Among these 8 layesr, it has skip connections at layer 5 and using Sigmoid, I used color correction, depending on the view. With this structure, I was able to capture the effects that depended on views along with the geometry. A lot of this code was replicated from the part 1.",
          gallery: [
            { src: "/images/proj4/arc.png", caption: "3D Neural Radiance Field Architecture" },
          ],
        },
        {
          title: "Part 2.5: Volume Rendering",
          paragraph: "I created a model using the equation that shows how colors on the rays work and used cumprod to get the probability of light stopping at a certain point. Using a training loop, I was able to train the lego data set model well before outputting the final results. Between the first and last iteration, we see a significant improvement in the quality of the render, making it look more like the ground truth.",
          gallery: [
            { src: "/images/proj4/legoG.png", standalone: true },
            { src: "/images/proj4/legoAll.png", standalone: true },
            { src: "/images/proj4/legoNovel.gif", caption: "Lego Novel View - reload page to view again", standalone: true },
            { src: "/images/proj4/legoTest.gif", caption: "Lego Novel View - reload page to view again", standalone: true },
          ],
        },
        {
          title: "Part 2.6: Training with your own data",
          paragraph: "I played around with the values a lot and had to take images from different angles to get a good view of the object. In the end, I was able to get some views of the obejcts. i think with more iterations, I could have gotten a better view of the object, but this is what it looks like after 3000 iterations and a batch size of 10000. I used near and far values of 0.1 and 0.55 as well.",
          gallery: [
            { src: "/images/proj4/lossGraph.png", caption: "Loss Graph", standalone: true },
            { src: "/images/proj4/bear3.png", standalone: true },
            { src: "/images/proj4/bear7.gif" },
            { src: "/images/proj4/bear8.gif"},
          ],
        },
        {
          title: "Conclusion",
          paragraph:
            "At the beginning of the project, I encountered issues because the calibration images and the actual object images were not resized to the same dimensions. This mismatch led to blurry and inaccurate results when rendering the scene. After ensuring that all images were properly aligned in size, the outputs improved significantly, though there was still room for optimization.",
          paragraph1:
            "Through experimentation, I discovered that the most influential factors for improving render quality were the near and far plane parameters. Choosing appropriate values was essential for capturing the full depth of the scene without clipping details or introducing excessive empty space. My final near and far values were 0.1 and 0.55, respectively, which stabilized training and improved sharpness.",
          paragraph2:
            "To make the initial training process faster and more manageable, I began with a lower number of sample points per ray (n_samples = 32) to quickly test configurations. Once I confirmed the near/far planes were properly set, I increased n_samples to 64, which significantly improved detail and visual accuracy. Overall, careful preprocessing, parameter tuning, and iterative experimentation had a large impact on the quality of the reconstructed 3D scene and deepened my understanding of practical NeRF training.",
        },
      ],
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background:
          "linear-gradient(120deg, #f6f7fb 0%, #eef1f4 35%, #f7f8fb 100%)",
        color: "#0f172a",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Subtle decorative backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.06) 0%, transparent 35%), radial-gradient(circle at 90% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 35%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "8rem 2rem 5rem 2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: 900,
            lineHeight: 1.05,
            background:
              "linear-gradient(135deg, #0f172a 0%, #334155 35%, #111827 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {hero.title}
        </h1>
        <p
          style={{
            margin: "1.25rem auto 0 auto",
            maxWidth: "900px",
            fontSize: "1.25rem",
            color: "#475569",
            lineHeight: 1.9,
            fontWeight: 500,
          }}
        >
          {hero.subtitle}
        </p>
        <div
          style={{
            width: "140px",
            height: "5px",
            margin: "2rem auto 0 auto",
            background:
              "linear-gradient(90deg, transparent, rgba(15,23,42,0.5), transparent)",
            borderRadius: "999px",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {sections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: "4rem" }}>
            {section.title && (
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    boxShadow:
                      "0 10px 30px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background:
                        "linear-gradient(135deg, #a5b4fc 0%, #93c5fd 100%)",
                      borderRadius: "999px",
                      boxShadow: "0 0 16px rgba(147,197,253,0.8)",
                    }}
                  />
                  {section.title}
                </span>
                {section.subtitle && (
                  <p
                    style={{
                      marginTop: "1rem",
                      color: "#475569",
                      fontSize: "1.05rem",
                    }}
                  >
                    {section.subtitle}
                  </p>
                )}
              </div>
            )}

            {section.text.map((txt, tIdx) => (
              <div
                key={tIdx}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(18px)",
                  borderRadius: "28px",
                  border: "1px solid rgba(15,23,42,0.06)",
                  boxShadow:
                    "0 30px 80px rgba(2,6,23,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                  padding: "2.5rem",
                  marginBottom: "2.5rem",
                }}
              >
                {txt.title && (
                  <h2
                    style={{
                      marginTop: 0,
                      marginBottom: "1.25rem",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {txt.title}
                  </h2>
                )}

                {[txt.paragraph, txt.paragraph1, txt.paragraph2]
                  .filter(Boolean)
                  .map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: "1.1rem",
                        color: "#334155",
                        lineHeight: 1.9,
                        margin: "0 0 1.25rem 0",
                      }}
                    >
                      {p}
                    </p>
                  ))}

                {txt.gallery && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: "1.5rem",
                      marginTop: "2rem",
                    }}
                  >
                    {txt.gallery.map((imgObj, i) => {
                      const key = `${sIdx}-${tIdx}-${i}`;

                      if (imgObj.standalone) {
                        return (
                          <div
                            key={key}
                            style={{
                              gridColumn: "1 / -1",
                              position: "relative",
                              overflow: "hidden",
                              borderRadius: "20px",
                              background: "#fff",
                              border: "1px solid rgba(15,23,42,0.06)",
                              boxShadow:
                                "0 30px 90px rgba(2,6,23,0.12), 0 2px 8px rgba(2,6,23,0.04)",
                            }}
                          >
                            <img
                              src={imgObj.src}
                              alt={imgObj.caption || "figure"}
                              style={{
                                width: "100%",
                                height: "auto",
                                maxHeight: "720px",
                                objectFit: "contain",
                                display: "block",
                              }}
                            />
                            {imgObj.caption && (
                              <div
                                style={{
                                  padding: "1rem 1.25rem",
                                  borderTop: "1px solid rgba(15,23,42,0.06)",
                                  background: "rgba(255,255,255,0.85)",
                                  fontSize: "0.95rem",
                                  color: "#475569",
                                }}
                              >
                                {imgObj.caption}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div
                          key={key}
                          onMouseEnter={() => setHoveredKey(key)}
                          onMouseLeave={() => setHoveredKey(null)}
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "20px",
                            background: "#fff",
                            border: "1px solid rgba(15,23,42,0.06)",
                            transform:
                              hoveredKey === key
                                ? "translateY(-8px) scale(1.015)"
                                : "translateY(0) scale(1)",
                            transition:
                              "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 320ms ease",
                            boxShadow:
                              hoveredKey === key
                                ? "0 30px 90px rgba(2,6,23,0.15), 0 2px 8px rgba(2,6,23,0.06)"
                                : "0 20px 60px rgba(2,6,23,0.08), 0 1px 4px rgba(2,6,23,0.04)",
                          }}
                        >
                          <img
                            src={imgObj.src}
                            alt={imgObj.caption || "image"}
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "460px",
                              objectFit: "contain",
                              display: "block",
                              filter:
                                hoveredKey === key
                                  ? "brightness(1.06)"
                                  : "brightness(1)",
                              transition: "filter 280ms ease",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              padding: "1rem 1.25rem",
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.86) 48%, rgba(255,255,255,0.96) 100%)",
                              borderTop: "1px solid rgba(15,23,42,0.06)",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: "0.98rem",
                                color: "#334155",
                                fontWeight: 500,
                              }}
                            >
                              {imgObj.caption || ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

