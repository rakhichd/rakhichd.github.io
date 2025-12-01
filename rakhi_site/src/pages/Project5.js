import React, { useState } from "react";
import PaperNote from "../components/PaperNote";
import ProtectedCode from "../components/ProtectedCode";

export default function Project5() {
    const [hoveredKey, setHoveredKey] = useState(null);

    const hero = {
        title: "Fun With Diffusion Models",
        subtitle:
            "Exploring how denoising diffusion probabilistic models synthesize and edit images, step-by-step.",
    };

    const sections = [
        {
            title: "Part A: The Power of Diffusion Models!",
            text: [
                {
                    title: "Part 0: Setup",
                    paragraph:
                        "Some interesting text prompts which encodings were created using Huggingface. I used a seed of 42 in order to reproduce the same results.",
                    prompts: [
                        "a high quality picture",
                        "an oil painting of a sunset from on top of the mountain",
                        "a photo of a boat under the Golden Gate Bridge",
                        "a photo of a dog licking ice cream",
                        "a photo of a girl watching a tv show on a laptop",
                        "a photo of a 11 people wearing party hats and celebrating thanksgiving",
                        "an oil painting of a person listening to music and coding",
                        "an oil painting of two sisters skiing in the daytime",
                        "a lithograph of people running a half marathon",
                        "a lithograph of a girl shopping",
                        "a man wearing a suit",
                        "a high quality photo",
                        "a pink water bottle",
                        "a plate of cheese ravioli with no sauce",
                        " '' "
                    ]
                },
                {
                    title: "Inital Prompts",
                    paragraph:
                        "Using a number of inference steps of 20, these prompts and their resulting images were:",
                    paragraph1: "'a photo of a 11 people wearing party hats and celebrating thanksgiving' (Figure 1)",
                    paragraph2: "'an oil painting of two sisters skiing in the daytime' (Figure 2)",
                    paragraph3: "'an oil painting of a person listening to music and coding' (Figure 3)",
                        gallery: [
                            { src: "/images/proj5/p1.png", caption: "Figure 1" },
                            { src: "/images/proj5/p2.png", caption: "Figure 2" },
                            { src: "/images/proj5/p3.png", caption: "Figure 3" },
                        ],
                },
                {
                    title: "Increased Inference Steps to 50",
                    gallery: [
                        { src: "/images/proj5/p11.png", caption: "Figure 1" },
                        { src: "/images/proj5/p22.png", caption: "Figure 2" },
                        { src: "/images/proj5/p33.png", caption: "Figure 3" },
                    ],
                },
                {
                    title: "Quality and Step Comparison (20 vs 50 steps)",
                    paper: true,
                    content: [
                        "For the first prompt, I asked for 11 people, yet I only saw 5 people and they seem to be wearing crowns. They do seem to be celebrating thanksgiving though which is what I prompted. I also wanted it to be a photo, and so the quality does reflect one of a photo.",
                        "For the second image, it is an oil painting of a person that seems to be listening to music. The coding part is more ambiguous however since there doesn’t seem to be much on the screen that reflects that, and instead the only semblance of coding would be the typing on the keyboard. Overall, it does a better job of following the prompt compared to the first image.",
                        "The third image follows the prompt well. There are two girls in the image, who appear to be sisters and are skiing in the daytime, making this overall a good quality image compared to the prompt.",
                        "At lower values, we are faster, but at the cost of reduced quality.",
                        "We then increased the amount of steps from 20 to 50. In our first image, we can observe that between the first and second, there are now 8 people in the image, compared to 5 earlier, which is closer to what my prompt was. They are also wearing party hats now, though some people in the image are missing them.",
                        "In the oil painting of the music and coding, we now have a different angle, where the character is looking happier, however it is still not clear that they are coding versus another task. The listening to music is not as obvious as well, and instead it could seem like a person is simply on a zoom call.",
                        "In the skiing image, we still see two girls that appear to be sisters, skiing, however the sky looks a little darker now compared to a daytime color. This could simply just be the style of the painting as well though."
                    ],
                },
                {
                    title: "Part 1: Sampling Loops",
                    paragraph:
                        "Created my own 'sampling loops' that use the pretrained DeepFloyd denoisers.",
                },
                {
                    title: "1.1 Implementing the Forward Process",
                    paragraph:
                        "take a clean image and add noise to it",
                    code: `def forward(im, t):

  """
  Args:
    im : torch tensor of size (1, 3, 64, 64) representing the clean image
    t : integer timestep
  Returns:
    im_noisy : torch tensor of size (1, 3, 64, 64) representing the noisy image at timestep t
  """
  with torch.no_grad():
    e = torch.randn_like(im)
    im_noisy = torch.sqrt(alphas_cumprod[t]) * im + torch.sqrt(1 - alphas_cumprod[t]) * e
  return im_noisy`,
                    gallery: [
                        { src: "/images/proj5/c250.png", caption: "250 steps" },
                        { src: "/images/proj5/c500.png", caption: "500 steps" },
                        { src: "/images/proj5/c750.png", caption: "750 steps" },
                        { src: "/images/proj5/campanileOG.jpg", caption: "campanile (original)" },
                    ],
                },
                {
                    title: "1.2 Classical Denoising",
                    paragraph:
                        "Gaussian-denoised version: Gaussian blur cannot recover fine details lost to diffusion noise, especially for high timesteps.",
                    paragraph1: "kernel_size=(9, 9), sigma=(1.5, 3)",
                    gallery: [
                        { src: "/images/proj5/c250.png", caption: "Noisy Campanile, 250 steps" },
                        { src: "/images/proj5/c500.png", caption: "Noisy Campanile, 500 steps" },
                        { src: "/images/proj5/c750.png", caption: "Noisy Campanile, 750 steps" },
                        { src: "/images/proj5/g1.png", caption: "Gaussian-Denoised Campanile, 250 steps" },
                        { src: "/images/proj5/g2.png", caption: "Gaussian-Denoised Campanile, 500 steps" },
                        { src: "/images/proj5/g3.png", caption: "Gaussian-Denoised Campanile, 750 steps" },
                    ],
                },
                {
                    title: "1.3 One-Step Denoising",
                    paragraph: "pretrained diffusion model to denoise",
                    gallery: [
                        { src: "/images/proj5/c250.png", caption: "Noisy Campanile,250 steps" },
                        { src: "/images/proj5/c500.png", caption: "Noisy Campanile, 500 steps" },
                        { src: "/images/proj5/c750.png", caption: "Noisy Campanile, 750 steps" },
                        { src: "/images/proj5/test3.png", caption: "One-Step Denoised Campanile, 250 steps" },
                        { src: "/images/proj5/test6.png", caption: "One-Step Denoised Campanile, 500 steps" },
                        { src: "/images/proj5/test9.png", caption: "One-Step Denoised Campanile, 750 steps" },
                    ],
                },
                {
                    title: "1.4 Iterative Denoising",
                    paragraph: "Diffusion models are designed to denoise iteratively. Below is the timestep schedule and the iterative denoising loop.",
                    code: `# Timestep schedule: start at 990 and stride by 30 down to 0
strided_timesteps = torch.arange(990, -1, -30)


def iterative_denoise(im_noisy, i_start, prompt_embeds, timesteps, display=True):
  image = im_noisy

  with torch.no_grad():
    for i in range(i_start, len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]
      alpha_cumprod = alphas_cumprod[t].to(image.device)
      alpha_cumprod_prev = alphas_cumprod[prev_t].to(image.device)
      alpha = alpha_cumprod / alpha_cumprod_prev
      beta = 1 - alpha

      # Get noise estimate
      model_output = stage_1.unet(
          image.half(),
          t,
          encoder_hidden_states=prompt_embeds,
          return_dict=False
      )[0]

      # Split estimate into noise and variance estimate
      noise_est, predicted_variance = torch.split(model_output, image.shape[1], dim=1)

      step1 = (torch.sqrt(alpha_cumprod_prev) * beta) / (1 - alpha_cumprod)
      step2 = (torch.sqrt(alpha) * (1 - alpha_cumprod_prev)) / (1 - alpha_cumprod)
      x0 = (image - torch.sqrt(1 - alpha_cumprod) * noise_est) / torch.sqrt(alpha_cumprod)
      x0 = x0.clamp(-1, 1)
      v0 = add_variance(predicted_variance.float(), t, torch.zeros_like(image).float() )
      pred_prev_image = (step1 * x0) + (step2 * image) + v0

      image = pred_prev_image

      if display and (i % 5 == 0):
        media.show_image(image[0].permute(1,2,0).detach().cpu().float() / 2 + 0.5)

    clean = image.cpu().detach().numpy()

  return clean`,
                    gallery: [
                        { src: "/images/proj5/noisy90.png", caption: "Noisy Campanile, 90" },
                        { src: "/images/proj5/noisy240.png", caption: "Noisy Campanile, 240" },
                        { src: "/images/proj5/noisy390.png", caption: "Noisy Campanile, 390" },
                        { src: "/images/proj5/noisy540.png", caption: "Noisy Campanile, 540" },
                        { src: "/images/proj5/noisy690.png", caption: "Noisy Campanile, 690" },
                        { src: "/images/proj5/campanileOG.jpg", caption: "original campanile" },
                        { src: "/images/proj5/guassian_p4.png", caption: "Gaussian Blurred Campanile" },
                        { src: "/images/proj5/single_p4.png", caption: "One-Step Denoised Campanile" },
                        { src: "/images/proj5/finalIter_p4.png", caption: "Iteratively Denoised Campanile" },
                    ],
                },
                {
                    title: "1.5 Diffusion Model Sampling",
                    paragraph: "generate images from scratch, denoise pure noise",
                    paragraph1: "Using the prompt ['a high quality photo'], these are the five images we can see:",
                    gallery: [
                        { src: "/images/proj5/im_p5.png"},
                        { src: "/images/proj5/im2_p5.png"},
                        { src: "/images/proj5/im3_p5.png"},
                        { src: "/images/proj5/im4_p5.png"},
                        { src: "/images/proj5/im5_p5.png"},
                    ],
                },
                {
                    title: "1.6 Classifier-Free Guidance (CFG)",
                    paragraph: "improve image quality at the expense of image diversity",
                    code: `def iterative_denoise_cfg(im_noisy, i_start, prompt_embeds, uncond_prompt_embeds, timesteps, scale=7, display=True):

  image = im_noisy

  with torch.no_grad():
    for i in range(i_start, len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]
      alpha_cumprod = alphas_cumprod[t].to(image.device)
      alpha_cumprod_prev = alphas_cumprod[prev_t].to(image.device)
      alpha = alpha_cumprod / alpha_cumprod_prev
      beta = 1 - alpha
      # Get cond noise estimate
      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds,
          return_dict=False
      )[0]

      # Get uncond noise estimate
      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      # Split estimate into noise and variance estimate
      noise_est, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est, _ = torch.split(uncond_model_output, image.shape[1], dim=1)

      # Compute the CFG noise estimate based on equation 4
      cfg = uncond_noise_est + scale * (noise_est - uncond_noise_est)

      # Get 'pred_prev_image', the next less noisy image.
      step1 = (torch.sqrt(alpha_cumprod_prev) * beta) / (1 - alpha_cumprod)
      step2 = (torch.sqrt(alpha) * (1 - alpha_cumprod_prev)) / (1 - alpha_cumprod)
      x0 = (image - torch.sqrt(1 - alpha_cumprod) * cfg) / torch.sqrt(alpha_cumprod)
      x0 = x0.clamp(-1, 1)
      v0 = add_variance(predicted_variance, t, torch.zeros_like(image))
      pred_prev_image = (step1 * x0) + (step2 * image) + v0

      image = pred_prev_image

    clean = image.cpu().detach().numpy()

  return clean`,
                    gallery: [
                        { src: "/images/proj5/p16_1.png", caption: "CFG Scale = 7"},
                        { src: "/images/proj5/p16_2.png", caption: "CFG Scale = 7"},
                        { src: "/images/proj5/p16_3.png", caption: "CFG Scale = 7"},
                        { src: "/images/proj5/p16_4.png", caption: "CFG Scale = 7"},
                        { src: "/images/proj5/p16_5.png", caption: "CFG Scale = 7"},
                    ],
                },
                {
                    title: "1.7 Image-to-image Translation",
                    paragraph: "take the original image, noise it a little, and force it back onto the image manifold without any conditioning. We get an image that is similar to the original with a low-enough noise level. This follows the SDEdit algorithm.",
                    paragraph1: "using the given prompt at noise levels [1, 3, 5, 7, 10, 20] with the conditional text prompt 'a high quality photo'",
                    gallery: [
                        { src: "/images/proj5/p17_camp_1.png", caption: "SDEdit with i_start = 1"},
                        { src: "/images/proj5/p17_camp_2.png", caption: "SDEdit with i_start = 3"},
                        { src: "/images/proj5/p17_camp_3.png", caption: "SDEdit with i_start = 5"},
                        { src: "/images/proj5/p17_camp_4.png", caption: "SDEdit with i_start = 7"},
                        { src: "/images/proj5/p17_camp_5.png", caption: "SDEdit with i_start = 10"},
                        { src: "/images/proj5/p17_camp_6.png", caption: "SDEdit with i_start = 20"},
                        { src: "/images/proj5/campanileOG.jpg", caption: "campanile (original)"},
                        { src: "/images/proj5/cactus7_1.png ", caption: "SDEdit with i_start = 1"},
                        { src: "/images/proj5/cactus7_2.png", caption: "SDEdit with i_start = 3"},
                        { src: "/images/proj5/cactus7_3.png", caption: "SDEdit with i_start = 5"},
                        { src: "/images/proj5/cactus7_4.png", caption: "SDEdit with i_start = 7"},
                        { src: "/images/proj5/cactus7_5.png", caption: "SDEdit with i_start = 10"},
                        { src: "/images/proj5/cactus7_6.png", caption: "SDEdit with i_start = 20"},
                        { src: "/images/proj5/cactusOG.png", caption: "Original Cactus"},
                        { src: "/images/proj5/puppy7_1.png", caption: "SDEdit with i_start = 3"},
                        { src: "/images/proj5/puppy7_2.png", caption: "SDEdit with i_start = 5"},
                        { src: "/images/proj5/puppy7_3.png", caption: "SDEdit with i_start = 7"},
                        { src: "/images/proj5/puppy7_4.png", caption: "SDEdit with i_start = 10"},
                        { src: "/images/proj5/puppy7_5.png", caption: "SDEdit with i_start = 20"},
                        { src: "/images/proj5/puppy.png", caption: "Original Puppy"},
                    ],
                },
                {
                    title: "1.7.1 Editing Hand-Drawn and Web Images",
                    paragraph: "get images onto the natural image manifold",
                    gallery: [
                        { src: "/images/proj5/arthur1_171.png", caption: "i_start = 1" },
                        { src: "/images/proj5/arthur2_171.png", caption: "i_start = 3" },
                        { src: "/images/proj5/arthur3_171.png", caption: "i_start = 5" },
                        { src: "/images/proj5/arthur4_171.png", caption: "i_start = 7" },
                        { src: "/images/proj5/arthur5_171.png", caption: "i_start = 10" },
                        { src: "/images/proj5/arthur6_171.png", caption: "i_start = 20" },
                        { src: "/images/proj5/ppl171_1.png", caption: "i_start = 1" },
                        { src: "/images/proj5/ppl171_2.png", caption: "i_start = 3" },
                        { src: "/images/proj5/ppl171_3.png", caption: "i_start = 5" },
                        { src: "/images/proj5/ppl171_4.png", caption: "i_start = 7" },
                        { src: "/images/proj5/ppl171_5.png", caption: "i_start = 10" },
                        { src: "/images/proj5/ppl171_6.png", caption: "i_start = 20" },
                        { src: "/images/proj5/ppl171_0.png", caption: "Original Drawing" },
                        { src: "/images/proj5/pop171_1.png", caption: "i_start = 1" },
                        { src: "/images/proj5/pop171_2.png", caption: "i_start = 3" },
                        { src: "/images/proj5/pop171_3.png", caption: "i_start = 5" },
                        { src: "/images/proj5/pop171_4.png", caption: "i_start = 7" },
                        { src: "/images/proj5/pop171_5.png", caption: "i_start = 10" },
                        { src: "/images/proj5/pop171_6.png", caption: "i_start = 20" },
                        { src: "/images/proj5/pop171_og.png", caption: "Original Drawing" },
                    ],
                },
                {
                    title: "1.7.2 Inpainting",
                    paragraph: "given an image and a binary mask, we can create a new image that has the same content where m = 0 and new content where m = 1",
                    code: `def inpaint(original_image, mask, prompt_embeds, uncond_prompt_embeds, timesteps, scale=7, display=True):

  image = torch.randn_like(original_image).to(device).half()

  with torch.no_grad():
    for i in range(len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]

      alpha_cumprod = alphas_cumprod[t].to(image.device)
      alpha_cumprod_prev = alphas_cumprod[prev_t].to(image.device)
      alpha = alpha_cumprod / alpha_cumprod_prev
      beta = 1 - alpha

      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds,
          return_dict=False
      )[0]

      # Get uncond noise estimate
      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      # Split estimate into noise and variance estimate
      noise_est, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est, _ = torch.split(uncond_model_output, image.shape[1], dim=1)

      # Compute the CFG noise estimate based on equation 4
      cfg = uncond_noise_est + scale * (noise_est - uncond_noise_est)

      # Get 'pred_prev_image', the next less noisy image.
      step1 = (torch.sqrt(alpha_cumprod_prev) * beta) / (1 - alpha_cumprod)
      step2 = (torch.sqrt(alpha) * (1 - alpha_cumprod_prev)) / (1 - alpha_cumprod)
      x0 = (image - torch.sqrt(1 - alpha_cumprod) * cfg) / torch.sqrt(alpha_cumprod)
      x0 = x0.clamp(-1, 1)
      v0 = add_variance(predicted_variance, t, torch.zeros_like(image))
      pred_prev_image = (step1 * x0) + (step2 * image) + v0

      # Force pixels outside mask to original with correct noise for prev_t
      image = mask.to(device).half() * pred_prev_image + (1 - mask.to(device).half()) * forward(original_image.to(device).half(), prev_t)

    clean = image.cpu().detach().numpy()

  return clean`,
                    gallery: [
                        { src: "/images/proj5/p171_mask1.png", caption: "mask" },
                        { src: "/images/proj5/p171_img1.png", caption: "campanile inpainted" },
                        { src: "/images/proj5/puppy.png", caption: "Original Puppy"},
                        { src: "/images/proj5/p172_maskingimg2.png", caption: "puppy inpainted" },
                        { src: "/images/proj5/mask2.png", caption: "mask" },
                        { src: "/images/proj5/ctree.png", caption: "christmas scene" },
                        { src: "/images/proj5/p172_final.png", caption: "christmas scene inpainted" },
                        { src: "/images/proj5/p172_img3.png", caption: "christmas scene inpainted 2" },
                        
                    ],
                },
                {
                    title: "1.7.3 Text-Conditional Image-to-image Translation",
                    paragraph: "this is no longer pure 'projection to the natural image manifold' but instead we are adding control using language",
                    paragraph1: "Prompt 1 is ‘a rocket ship’. Prompt 2 is \"a lithograph of waterfalls\". I did this on top of the christmas image.",
                    paragraph2: "Then I did ‘a photo of a hipster barista’ on top of the puppy image.",
                    gallery: [
                        { src: "/images/proj5/rocket1.png", caption: "noise level = 1" },
                        { src: "/images/proj5/rocket2.png", caption: "noise level = 3" },
                        { src: "/images/proj5/rocket3.png", caption: "noise level = 5" },
                        { src: "/images/proj5/rocket4.png", caption: "noise level = 7" },
                        { src: "/images/proj5/rocket5.png", caption: "noise level = 10" },
                        { src: "/images/proj5/rocket6.png", caption: "noise level = 20" },
                        { src: "/images/proj5/campanileOG.jpg", caption: "campanile (original)"},
                        { src: "/images/proj5/c1.png", caption: "noise level = 1" },
                        { src: "/images/proj5/c2.png", caption: "noise level = 3" },
                        { src: "/images/proj5/c3.png", caption: "noise level = 5" },
                        { src: "/images/proj5/c4.png", caption: "noise level = 7" },
                        { src: "/images/proj5/c5.png", caption: "noise level = 10" },
                        { src: "/images/proj5/c6.png", caption: "noise level = 20" },
                        { src: "/images/proj5/ctree.png", caption: "christmas scene (original)"},
                        { src: "/images/proj5/bar1.png", caption: "noise level = 1" },
                        { src: "/images/proj5/bar2.png", caption: "noise level = 3" },
                        { src: "/images/proj5/bar3.png", caption: "noise level = 5" },
                        { src: "/images/proj5/bar4.png", caption: "noise level = 7" },
                        { src: "/images/proj5/bar5.png", caption: "noise level = 10" },
                        { src: "/images/proj5/bar6.png", caption: "noise level = 20" },
                        { src: "/images/proj5/puppy.png", caption: "puppy (original)"},

                    ],
                },
                {
                    title: "1.8 Visual Anagrams",
                    paragraph: "create optical illusions with diffusion models. the two different prompts that i used to create the images are listed below.",
                    code: `def visual_anagrams(image, prompt_embeds1, prompt_embeds2, uncond_prompt_embeds, timesteps, scale = 7):
  image = image.half().to('cuda')
  with torch.no_grad():
    for i in range(len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]

      alpha_cumprod = alphas_cumprod[t].to(image.device)
      alpha_cumprod_prev = alphas_cumprod[prev_t].to(image.device)
      alpha = alpha_cumprod / alpha_cumprod_prev
      beta = 1 - alpha

      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds1,
          return_dict=False
      )[0]

      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      noise_est1, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est1, _ = torch.split(uncond_model_output, image.shape[1], dim=1)
      ep1 = uncond_noise_est1 + scale * (noise_est1 - uncond_noise_est1)

      # flipping process now 
      flip = torch.flip(image, dims=[2])
      model_output = stage_1.unet(
          flip,
          t,
          encoder_hidden_states=prompt_embeds2,
          return_dict=False
      )[0]

      uncond_model_output = stage_1.unet(
          flip,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      noise_est2, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est2, _ = torch.split(uncond_model_output, image.shape[1], dim=1)
      ep2 = uncond_noise_est2 + scale * (noise_est2 - uncond_noise_est2)
      ep2 = torch.flip(ep2, dims=[2])

      # calc ep 
      ep = (ep1 + ep2) / 2

      step1 = (torch.sqrt(alpha_cumprod_prev) * beta) / (1 - alpha_cumprod)
      step2 = (torch.sqrt(alpha) * (1 - alpha_cumprod_prev)) / (1 - alpha_cumprod)
      x0 = (image - torch.sqrt(1 - alpha_cumprod) * ep) / torch.sqrt(alpha_cumprod)
      x0 = x0.clamp(-1, 1)
      v0 = add_variance(predicted_variance, t, torch.zeros_like(image))
      pred_prev_image = (step1 * x0) + (step2 * image) + v0

      image = pred_prev_image

    clean = image.cpu().detach().numpy()
  return clean`,
                    gallery: [
                        { src: "/images/proj5/campMan1.png", caption: "an oil painting of an old man" },
                        { src: "/images/proj5/campMan2.png", caption: "an oil painting of people around a campfire" },
                        { src: "/images/proj5/gg1.png", caption: "an oil painting of a sunset from on top of the mountain" },
                        { src: "/images/proj5/gg2.png", caption: "a photo of a boat under the Golden Gate Bridge" },
                        { src: "/images/proj5/man1.png", caption: "a pink water bottle" },
                        { src: "/images/proj5/man2.png", caption: "a man wearing a suit" },
                    ],
                },
                {
                    title: "1.9 Hybrid Images",
                    paragraph: "we create a composite noise estimate, by estimating the noise with two different text prompts, and then combining low frequencies from one noise estimate with high frequencies of the other",
                    code: `def make_hybrids(image, prompt_embeds1, prompt_embeds2, uncond_prompt_embeds, timesteps, scale = 7):

  image = image.half().to('cuda')
  with torch.no_grad():
    for i in range(len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]

      alpha_cumprod = alphas_cumprod[t].to(image.device)
      alpha_cumprod_prev = alphas_cumprod[prev_t].to(image.device)
      alpha = alpha_cumprod / alpha_cumprod_prev
      beta = 1 - alpha

      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds1,
          return_dict=False
      )[0]

      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      noise_est1, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est1, _ = torch.split(uncond_model_output, image.shape[1], dim=1)
      ep1 = uncond_noise_est1 + scale * (noise_est1 - uncond_noise_est1)

      # second one now 
      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds2,
          return_dict=False
      )[0]

      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      noise_est1, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est1, _ = torch.split(uncond_model_output, image.shape[1], dim=1)
      ep2 = uncond_noise_est1 + scale * (noise_est1 - uncond_noise_est1)

      highpass = ep2 - TF.gaussian_blur(ep2, kernel_size=33, sigma=2)
      ep = TF.gaussian_blur(ep1, kernel_size=33, sigma=2) + highpass

      step1 = (torch.sqrt(alpha_cumprod_prev) * beta) / (1 - alpha_cumprod)
      step2 = (torch.sqrt(alpha) * (1 - alpha_cumprod_prev)) / (1 - alpha_cumprod)
      x0 = (image - torch.sqrt(1 - alpha_cumprod) * ep) / torch.sqrt(alpha_cumprod)
      x0 = x0.clamp(-1, 1)
      v0 = add_variance(predicted_variance, t, torch.zeros_like(image))
      pred_prev_image = (step1 * x0) + (step2 * image) + v0

      image = pred_prev_image

    clean = image.cpu().detach().numpy()
  return clean`,
                    gallery: [
                        { src: "/images/proj5/p91.png", caption: "a photo of a boat under the Golden Gate Bridge x an oil painting of a sunset from on top of the mountain" },
                        { src: "/images/proj5/p92.png", caption: "a photo of a dog licking ice cream x a pink water bottle" },
                    ],
                }
            ],
        },
        
        // {
        //     title: "Part B: Applications and Editing",
        //     text: [
        //         {
        //             title: "B.1: Inpainting with Masks",
        //             paragraph:
        //                 "By keeping unmasked regions fixed and sampling the masked area, diffusion enables seamless inpainting that respects context.",
        //             gallery: [
        //                 { src: "/images/proj5/p171_img1.png", caption: "Input image" },
        //                 { src: "/images/proj5/p171_mask1.png", caption: "Mask" },
        //                 { src: "/images/proj5/p172_img3.png", caption: "Another input" },
        //                 { src: "/images/proj5/p172_final.png", caption: "Inpainted result", standalone: true },
        //             ],
        //         },
        //         {
        //             title: "B.2: Style/Attribute Variations",
        //             paragraph:
        //                 "Small prompt or conditioning changes yield distinct but coherent variations of the same subject.",
        //             gallery: [
        //                 { src: "/images/proj5/arthur1_171.png" },
        //                 { src: "/images/proj5/arthur2_171.png" },
        //                 { src: "/images/proj5/arthur3_171.png" },
        //                 { src: "/images/proj5/arthur4_171.png" },
        //                 { src: "/images/proj5/arthur5_171.png" },
        //                 { src: "/images/proj5/arthur6_171.png" },
        //             ],
        //         },
        //         {
        //             title: "B.2: Style/Attribute Variations",
        //             paragraph:
        //                 "Small prompt or conditioning changes yield distinct but coherent variations of the same subject.",
        //             gallery: [
        //                 { src: "/images/proj5/arthur1_171.png" },
        //                 { src: "/images/proj5/arthur2_171.png" },
        //                 { src: "/images/proj5/arthur3_171.png" },
        //                 { src: "/images/proj5/arthur4_171.png" },
        //                 { src: "/images/proj5/arthur5_171.png" },
        //                 { src: "/images/proj5/arthur6_171.png" },
        //             ],
        //         },
        //         {
        //             title: "B.3: Class Grids",
        //             paragraph:
        //                 "Sampling multiple seeds for a class illustrates the diversity the model can produce.",
        //             gallery: [
        //                 { src: "/images/proj5/bird171_1.png" },
        //                 { src: "/images/proj5/bird171_2.png" },
        //                 { src: "/images/proj5/bird171_3.png" },
        //                 { src: "/images/proj5/bird171_4.png" },
        //                 { src: "/images/proj5/bird171_5.png" },
        //                 { src: "/images/proj5/bird171_6.png" },
        //             ],
        //         },
        //     ],
        // },
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
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.06) 0%, transparent 35%), radial-gradient(circle at 90% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 35%)",
                    pointerEvents: "none",
                }}
            />

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
                            </div>
                        )}

                        {section.text.map((txt, tIdx) => {
                            if (txt.paper) {
                                return (
                                    <div key={tIdx} style={{ marginBottom: "2.5rem" }}>
                                        <PaperNote title={txt.title}>
                                            {(
                                                Array.isArray(txt.content)
                                                    ? txt.content
                                                    : [txt.paragraph, txt.paragraph1, txt.paragraph2, txt.paragraph3]
                                            )
                                                .filter(Boolean)
                                                .map((p, i) => (
                                                    <p key={i} style={{ margin: "0 0 1rem 0" }}>
                                                        {p}
                                                    </p>
                                                ))}
                                        </PaperNote>
                                    </div>
                                );
                            }

                            return (
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

                                    {[txt.paragraph, txt.paragraph1, txt.paragraph2, txt.paragraph3]
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
                                    {txt.code && <ProtectedCode code={txt.code} />}

                                    {Array.isArray(txt.prompts) && txt.prompts.length > 0 && (
                                        <div
                                            style={{
                                                marginTop: "1rem",
                                                padding: "1rem",
                                                background: "rgba(15,23,42,0.03)",
                                                border: "1px solid rgba(15,23,42,0.08)",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: "0.5rem",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {txt.prompts.map((prompt, idx) => (
                                                    <span
                                                        key={idx}
                                                        style={{
                                                            padding: "0.4rem 0.75rem",
                                                            background: "#f1f5f9",
                                                            borderRadius: "999px",
                                                            fontSize: "0.95rem",
                                                            color: "#0f172a",
                                                            border: "1px solid rgba(15,23,42,0.08)",
                                                        }}
                                                    >
                                                        {prompt && prompt.length > 0 ? prompt : "(empty prompt)"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {txt.gallery && (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "1.5rem",
                                                justifyContent: "center",
                                                marginTop: "2rem",
                                            }}
                                        >
                                            {txt.gallery.map((imgObj, i) => {
                                                const key = `${sIdx}-${tIdx}-${i}`;
                                                const isVideo =
                                                    !!(imgObj && imgObj.src) &&
                                                    /\.(mp4|webm|ogg)$/i.test(imgObj.src);
                                                const uniformWidth = 150;

                                                return (
                                                    <div
                                                        key={key}
                                                        onMouseEnter={() => setHoveredKey(key)}
                                                        onMouseLeave={() => setHoveredKey(null)}
                                                        style={{
                                                            display: "inline-block",
                                                            padding: "3px",
                                                            borderRadius: "12px",
                                                            background: "#fff",
                                                            border: "1px solid rgba(15,23,42,0.12)",
                                                        }}
                                                    >
                                                        {isVideo ? (
                                                            <video
                                                                src={imgObj.src}
                                                                style={{
                                                                    width: `${uniformWidth}px`,
                                                                    height: "auto",
                                                                    display: "block",
                                                                    filter:
                                                                        hoveredKey === key
                                                                            ? "brightness(1.06)"
                                                                            : "brightness(1)",
                                                                    transition: "filter 280ms ease",
                                                                }}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                            />
                                                        ) : (
                                                            <img
                                                                src={imgObj.src}
                                                                alt={imgObj.caption || "image"}
                                                                style={{
                                                                    width: `${uniformWidth}px`,
                                                                    height: "auto",
                                                                    display: "block",
                                                                    filter:
                                                                        hoveredKey === key
                                                                            ? "brightness(1.06)"
                                                                            : "brightness(1)",
                                                                    transition: "filter 280ms ease",
                                                                }}
                                                            />
                                                        )}
                                                        {(imgObj.caption || imgObj.caption === "") && (
                                                            <div style={{ padding: "0.5rem 0 0", textAlign: "center" }}>
                                                                <p
                                                                    style={{
                                                                        margin: 0,
                                                                        fontSize: "0.95rem",
                                                                        color: "#334155",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {imgObj.caption || ""}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
