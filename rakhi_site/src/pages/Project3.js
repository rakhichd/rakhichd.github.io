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
          gallery: [
            { src: "/images/proj3/hp.jpeg", caption: "step 1 - we represent the projective transformation between each left and right image using a homography matrix, H. " },
            { src: "/images/proj3/trans.jpeg", caption: "step 2 - given the correspondences, the projective transformation between two images" },
            { src: "/images/proj3/recover.jpeg", caption: "step 3 - recover the homography by solving the following system using least squares. we have 8 degrees of freedom, so at least 4 points are needed" },
            { src: "/images/proj3/cor1.jpeg", caption: "Correspondences between pair of Doe Library Images" },
            { src: "/images/proj3/cor2.jpeg", caption: "Correspondences between pair of MLK Images" },

          ],
        },
        {
          title: "A.3: Warp the Images",
          paragraph: `Knowing the parameters of the homography, we can use the homography to warp each image towards a reference image. Inverse warping was also used in order to avoid holes in the output image. Two different interpolation methods were used here.`,
          paragraph1: `The first was Nearest Neighbor Interpolation where coordinates were rounded to their nearest pixel value. I observed that this method tended to be faster in comparison and simpler to implement, however the overall image quality seemed to be slightly less. In this case however where my pictures weren't as high in quality, I would prefer to use this method given its speed.`,
          paragraph2: `The next method was Bilinear Interpolation where the weighted average of the four neighboring pixels were used to compute. I observed that this method provided images that were a little smoother and of higher quality, yet the time taken to compute was much longer in comparison.`,
          gallery: [
            { src: "/images/proj3/window.jpeg", caption: "Original Window Image" },
            { src: "/images/proj3/windowNN.jpeg", caption: "Window via Bilinear Interpolation" },
            { src: "/images/proj3/windowBi.jpeg", caption: "Window via Nearest Neighbor Interpolation" },
            { src: "/images/proj3/swim.jpeg", caption: "Original Poster Image", group: "swim" },
            { src: "/images/proj3/swimNN.jpeg", caption: "Poster via Nearest Neighbor Interpolation", group: "swim" },
            { src: "/images/proj3/swimBi.jpeg", caption: "Poster via Bilinear Interpolation", group: "swim" },
          ],
        },
        {
          title: "A.4: Blend the Images into a Mosaic",
          paragraph: `Here, images were warped so they could create an image mosaic. Instead of having one picture overwrite the other, which would lead to strong edge artifacts, weighted averaging was used. After taking pictures of my original images, I resized all of them to have dimensions of approximately ~1000 pixels.`,
          paragraph1: `I warped all images into a new projection, and did this in one shot. I first determined the size of the final mosaic by using the dimensions of my two images, based on which image i was computing homographies on. Then I warped all my images into that size by computing the final image size. This way I had a stack of images together defining the mosaic. Next, to blend them together to produce a single image, I made sure to use weighted averaging and blending to reduce edge artifacts. This way the mask would not be visible after the images were blended together. I used bilinear interpolation for my warping here.`,
          gallery: [
            { src: "/images/proj3/room1.jpeg", caption: "Original Room Image 1", standalone: true },
            { src: "/images/proj3/room2.jpeg", caption: "Original Room Image 2", standalone: true },
            { src: "/images/proj3/finalRoom.jpeg", caption: "Room Image as a Mosaic", standalone: true },
            { src: "/images/proj3/ny1.jpg", caption: "Met Rooftop Image 1" },
            { src: "/images/proj3/ny3.jpg", caption: "Met Rooftop Image 2 " },
            { src: "/images/proj3/finalNyc.jpeg", caption: "Met Rooftop as a Mosaic", standalone: true },
            { src: "/images/proj3/kitchen1.jpeg", caption: "My Kitchen 1" },
            { src: "/images/proj3/kitchen2.jpeg", caption: "My Kitchen 2" },
            { src: "/images/proj3/finalKitchen.jpeg", caption: "My Kitchen as a Mosaic", standalone: true },
          ],
        },
      ],
    },
  ];

  

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F0F0F5", color: "#333", paddingBottom: "4rem" }}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2rem" }}>
          <h1 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "2rem", fontWeight: "700", color: "#1f1f2e" }}>
            {section.title}
          </h1>
          {section.text.map((txt, tIdx) => (
            <div key={tIdx} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9fc 100%)",
              padding: "2.5rem",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
              marginBottom: "3rem",
              transition: "transform 0.3s",
            }}>
              {txt.title && <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1.5rem", color: "#2c2c3e" }}>{txt.title}</h2>}
              {txt.paragraph && <p style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "1rem" }}>{txt.paragraph}</p>}
              {txt.paragraph1 && <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "1rem" }}>{txt.paragraph1}</p>}
              {txt.paragraph2 && <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "1rem" }}>{txt.paragraph2}</p>}

              {txt.gallery && (
                <div
                    style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gap: "2rem",
                    marginTop: "2rem",
                    }}
                >
                    {txt.gallery.map((imgObj, i) => (
                    <div
                        key={i}
                        style={{
                        gridColumn: imgObj.standalone ? "1 / -1" : undefined,
                        textAlign: "center",
                        }}
                    >
                        <img
                        src={imgObj.src}
                        alt={imgObj.caption}
                        style={{
                            width: "100%",
                            height: "auto", // maintains aspect ratio
                            maxHeight: imgObj.standalone ? "650px" : "450px",
                            borderRadius: imgObj.standalone ? "16px" : "12px",
                            objectFit: "contain", // prevents cropping
                            boxShadow: imgObj.standalone
                            ? "0 10px 35px rgba(0,0,0,0.25)"
                            : "0 6px 20px rgba(0,0,0,0.15)",
                        }}
                        />
                        {imgObj.caption && (
                        <p
                            style={{
                            fontSize: imgObj.standalone ? "1rem" : "0.95rem",
                            color: imgObj.standalone ? "#666" : "#555",
                            marginTop: imgObj.standalone ? "0.7rem" : "0.5rem",
                            }}
                        >
                            {imgObj.caption}
                        </p>
                        )}
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
