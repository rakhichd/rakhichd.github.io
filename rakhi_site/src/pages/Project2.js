export default function Project2() {
  const sections = [
    {
      title: "Part 1: Filters and Edges",
      text: [
        {
          title: "1.1 Comparing Convolutions",
          paragraph: `I started off with a naive implementation of convolution, on a simple black and white image.`,
          paragraph1: "The process started with four for loops.",
          code: `# Four for loops convolution
def conv_forloop_4(img_arr, filter_arr):
    img_h, img_w = img_arr.shape
    filter_arr_flip = np.flip(np.flip(filter_arr, axis = 1), axis = 0)
    filter_h, filter_w = filter_arr_flip.shape
    output = np.zeros((img_h, img_w)
    img_pad = np.pad(img_arr, ((filter_h//2, filter_h//2), (filter_w//2, filter_w//2)), mode="constant")
    for r in range(img_h):
        for c in range(img_w):
            for i in range(filter_h):
                for j in range(filter_w):
                    convl = img_pad[r+i, c+j] * filter_arr_flip[i, j]
                    output[r, c] += convl
    return output `,
          paragraph2: `Then to improve the process, the process was done with two for loops.`,
          code2: `# Two for loops convolution
def conv_forloop_2(img_arr, filter_arr):
    img_h, img_w = img_arr.shape
    filter_arr_flip = np.flip(np.flip(filter_arr, axis = 1), axis = 0)
    filter_h, filter_w = filter_arr_flip.shape
    output = np.zeros((img_h, img_w))
    img_pad = np.pad(img_arr, ((filter_h//2, filter_h//2), (filter_w//2, filter_w//2)), mode="constant")
    for i in range(img_h):
        for j in range(img_w):
            output[i, j] = (filter_arr_flip * img_pad[i:i+filter_h, j:j+filter_w]).sum()
    return output`,
          paragraph3: "Finally, numpy has its own convolution function, scipy.signal.convolve2d.",
          paragraph4: `When examining the runtimes of each of these functions, ...`,
          gallery: [
            { src: "/images/proj2/self.jpg", caption: "Original Image" },
            { src: "/images/proj2/self4.jpg", caption: "After 4-loop convolution" },
            { src: "/images/proj2/self2.jpg", caption: "After 2-loop convolution" },
            { src: "/images/proj2/selfNP.jpg", caption: "Using NumPy function" },
          ],
        },
        {
          title: "1.2 Finite Difference Operator",
          paragraph: `Convolving images with the finite difference operators D_x and D_y reveal interesting information about images.`,
          gallery: [
            { src: "/images/proj2/finOp.jpeg", caption: "Finite Difference Operators" },
            { src: "/images/proj2/selfdx.jpeg", caption: "Dx operator result" },
            { src: "/images/proj2/selfdy.jpeg", caption: "Dy operator result" },
            { src: "/images/proj2/camera.jpg", caption: "Original Cameraman" },
            { src: "/images/proj2/camdx.jpeg", caption: "Cameraman Dx" },
            { src: "/images/proj2/camdy.jpeg", caption: "Cameraman Dy" },
            { src: "/images/proj2/camGradMag.jpeg", caption: "Gradient Magnitude" },
            { src: "/images/proj2/cameraEdge.jpg", caption: "Binarized Edge" },
          ],
        },
        {
          title: "1.3 Derivative of Gaussian (DoG) Filter",
          paragraph: `In the previous part, the binary edge image is still a little noisy. The noise can be reduced by using a gaussian filter to filter out the noise. This blurs the image. Then after that convolution, we are able to repeat the same steps are before to get the following image.`,
          paragraph1: `We can simplify the above process by doing it in fewer steps as well. The Derivative of Gaussian (DoG) filter is the convolution of a Gaussian filter with a finite difference operator. We can directly apply this onto the original cameraman image, without having to blur the image initially. Instead the DoG filter handles this smoothing step. 
We see that this resulting image is similar and also less noisy than the previous images using the finite difference method. I used a threshold of 0.07 here and kept it the same for the images.`,
          gallery: [
            { src: "/images/proj2/guass.jpeg", caption: "Gaussian Filter" },
            { src: "/images/proj2/smooth.jpeg", caption: "Smoothed Image" },
            { src: "/images/proj2/gsmooth.jpeg", caption: "Gaussian Smoothed Edge" },
            { src: "/images/proj2/dx2.jpeg", caption: "Dx via DoG" },
            { src: "/images/proj2/dy2.jpeg", caption: "Dy via DoG" },
            { src: "/images/proj2/camxy.jpeg", caption: "Gradient Magnitude DoG" },
          ],
        },
      ],
    },
    {
      title: "Part 2: Applications",
      subtitle: "Fun with Frequencies",
      text: [
        {
          title: "2.1 Image Sharpening",
          paragraph: `Another enhancement to do to images is sharpening them. 
The way this process works is by first using a blur filter, which is where the high frequencies are removed, leaving us with a low pass image. Then in order to get the high frequencies, we can subtract the blurred image from the original image. Finally to get the sharpened image, we are able to enhance the high frequency components by using an alpha value. This is the original image + alpha * the high pass image. The alpha value represents how much the image is being sharpened by. `,
          gallery: [
            { src: "/images/proj2/taj.jpeg", caption: "Original Taj" },
            { src: "/images/proj2/tajBlur.jpeg", caption: "Blurred Taj" },
            { src: "/images/proj2/tajHigh.jpeg", caption: "High Frequencies" },
            { src: "/images/proj2/taj15.jpeg", caption: "Sharp alpha=1.5" },
            { src: "/images/proj2/taj3.jpeg", caption: "Sharp alpha=3" },
            { src: "/images/proj2/taj5.jpeg", caption: "Sharp alpha=5" },
          ],
          paragraph1: "We can observe that as we change the sharpening amounts via the alpha values, at higher values the image appears less clear and instead more contorted.",
        },
        {
          title: "More Image Sharpening",
          gallery: [
            { src: "/images/proj2/nycOg.jpeg", caption: "Original Image" },
            { src: "/images/proj2/nycBlur.jpeg", caption: "Blurred Image" },
            { src: "/images/proj2/nycHigh.jpeg", caption: "High Frequencies" },
            { src: "/images/proj2/nycSharp.jpeg", caption: "Sharp, alpha = 5" },
            { src: "/images/proj2/nyc2Og.jpeg", caption: "Original Image" },
            { src: "/images/proj2/nyc2Sharp.jpeg", caption: "Sharp Image, alpha = 9" },
          ],
        },
        {
          title: "2.2 Hybrid Images",
          paragraph: "Hybrid images combine low frequencies of one image with high frequencies of another.",
          gallery: [
            { src: "/images/proj2/DerekPicture.jpg", caption: "Derek, cutoff freq:6" },
            { src: "/images/proj2/nutmeg.jpg", caption: "Nutmeg, cutoff freq:10" },
            { src: "/images/proj2/derek_cat.jpeg", caption: "Hybrid Result" },
            { src: "/images/proj2/shweta.jpeg", caption: "Shweta, cutoff freq:9" },
            { src: "/images/proj2/panda.jpeg", caption: "Panda, cutoff freq: 3" },
            { src: "/images/proj2/pash.jpeg", caption: "Shweta x Panda" },
            { src: "/images/proj2/hybridAn.jpeg", caption: "Hybrid Analysis", standalone: true },
            { src: "/images/proj2/shweta.jpeg", caption: "Shweta" },
            { src: "/images/proj2/monkey.jpeg", caption: "Monkey" },
            { src: "/images/proj2/shweta_monkey.png", caption: "Shweta x Monkey" },
            { src: "/images/proj2/shrek.jpeg", caption: "Shrek" },
            { src: "/images/proj2/rakhi2.jpeg", caption: "Rakhi" },
            { src: "/images/proj2/rakhiShrek.jpeg", caption: "Rakhi x Shrek" },
            { src: "/images/proj2/hh.jpeg", caption: "Homelander" },
            { src: "/images/proj2/rakhi2.jpeg", caption: "Rakhi" },
            { src: "/images/proj2/rhh.jpeg", caption: "Rakhi x Homelander" },
          ],
        },
        {
          title: "2.3 Gaussian and Laplacian Stacks",
          gallery: [
            { src: "/images/proj2/hybrid_blend.png", standalone: true },
            { src: "/images/proj2/bb.jpeg", standalone: true },
            { src: "/images/proj2/a1.jpeg", caption: "Laplacian of Apple Sum"},
            { src: "/images/proj2/o1.jpeg", caption: "Laplacian of Orange Sum"},
            { src: "/images/proj2/oa1.jpeg", caption: "Laplacian of Blend Sum"},
          ],
        },
        {
          title: "2.4 Multiresolution Blending",
          gallery: [
            { src: "/images/proj2/orple.jpeg", standalone: true },
            { src: "/images/proj2/apple.jpeg", caption: "Apple" },
            { src: "/images/proj2/orange.jpeg", caption: "Orange" },
            { src: "/images/proj2/orpleMask.jpeg", caption: "Mask" },

            { src: "/images/proj2/finalS.jpeg", standalone: true },
            { src: "/images/proj2/m2.jpeg", caption: "Mask" },
            { src: "/images/proj2/sff.jpeg", caption: "SF" },
            { src: "/images/proj2/moonn.jpeg", caption: "Moon" },

            { src: "/images/proj2/oceanMtFinal.jpeg", standalone: true },
            { src: "/images/proj2/ocean.jpeg", caption: "Ocean" },
            { src: "/images/proj2/mt.jpeg", caption: "Mountain" },
            { src: "/images/proj2/oceanMask.jpeg", caption: "Mask" },
          ],
        },
        {
          title: "Conclusion",
          paragraph: "The most important thing i learned from this project was the idea about how adjusting different frequency components, we can enhance details and create smoother images. I enjoyed creating hybrid and smoothly transitioning images in this project as well."
        },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 1rem", gap: "3rem", backgroundColor: "#F7F7EF", minHeight: "100vh" }}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} style={{ width: "100%", maxWidth: "1000px" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>{section.title}</h2>
          {section.subtitle && <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>{section.subtitle}</h3>}
          {section.text.map((txt, tIdx) => (
            <div key={tIdx} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)", marginBottom: "2rem" }}>
              {txt.title && <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>{txt.title}</h4>}
              {txt.paragraph && <p>{txt.paragraph}</p>}
              {txt.paragraph1 && <p>{txt.paragraph1}</p>}
              {txt.paragraph2 && <p>{txt.paragraph2}</p>}
              {txt.code && <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem", borderRadius: "8px", overflowX: "auto", marginBottom: "1rem" }}><code>{txt.code}</code></pre>}
              {txt.code2 && <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem", borderRadius: "8px", overflowX: "auto", marginBottom: "1rem" }}><code>{txt.code2}</code></pre>}
              {txt.gallery && (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", margin: "1rem 0" }}>
                    {txt.gallery.map((imgObj, i) => {
                    if (imgObj.standalone) {
                        // full row image
                        return (
                        <div key={i} style={{ textAlign: "center", width: "100%", margin: "1rem 0" }}>
                            <img src={imgObj.src} alt={imgObj.caption} style={{ width: "80%", borderRadius: "8px" }} />
                            {imgObj.caption && <small>{imgObj.caption}</small>}
                        </div>
                        );
                    }
                    return (
                        <div key={i} style={{ textAlign: "center", maxWidth: "300px" }}>
                        <img src={imgObj.src} alt={imgObj.caption} style={{ width: "100%", borderRadius: "8px" }} />
                        {imgObj.caption && <small>{imgObj.caption}</small>}
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
  );
}
