// Import GSAP and SplitText plugin (currently commented out)
// import gsap from "gsap";
// import SplitText from "gsap/SplitText";

// Register the SplitText plugin with GSAP
// gsap.registerPlugin(SplitText);

// Wait for the DOM to be fully loaded before running our code
document.addEventListener("DOMContentLoaded", () => {
  // Get references to our DOM elements
  const profileImagesContainer = document.querySelector(".profile-images");
  const profileImages = document.querySelectorAll(".profile-images .img");
  const nameElements = document.querySelectorAll(".profile-names .name");
  const nameHeadings = document.querySelectorAll(".profile-names .name h2");

  // Split each heading into individual characters using GSAP's SplitText
  nameHeadings.forEach((heading) => {
    const split = new SplitText(heading, { type: "chars" });
    // Add a 'letter' class to each character for styling and animation
    split.chars.forEach((char) => {
      char.classList.add("letter");
    });
  });

  // Get all letters from the first name element (default state)
  const defaultLetters = nameElements[0].querySelectorAll(".letter");
  // Initially hide these letters by moving them 100% down
  gsap.set(defaultLetters, { y: "100%" });

  // Only run these animations on screens wider than 900px
  if (window.innerWidth >= 900) {
    // Set up hover effects for each profile image
    profileImages.forEach((img, index) => {
      // Get the corresponding name element for this image
      const correspondingName = nameElements[index + 1];
      const letters = correspondingName.querySelectorAll(".letter");

      // When mouse enters the image
      img.addEventListener("mouseenter", () => {
        // Animate the image to grow larger
        gsap.to(img, {
          width: 140,
          height: 140,
          duration: 0.5,
          ease: "power4.out",
        });

        // Animate the letters to slide up from bottom
        gsap.to(letters, {
          y: "-100%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025, // Delay between each letter's animation
            from: "center", // Start animation from the center
          },
        });
      });

      // When mouse leaves the image
      img.addEventListener("mouseleave", () => {
        // Animate the image back to its original size
        gsap.to(img, {
          width: 70,
          height: 70,
          duration: 0.5,
          ease: "power4.out",
        });

        // Animate the letters back to their original position
        gsap.to(letters, {
          y: "0%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });
    });

    // When mouse enters the entire profile images container
    profileImagesContainer.addEventListener("mouseenter", () => {
      // Show the default letters by animating them up
      gsap.to(defaultLetters, {
        y: "0%",
        ease: "power4.out",
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: "center",
        },
      });
    });

    // When mouse leaves the entire profile images container
    profileImagesContainer.addEventListener("mouseleave", () => {
      // Hide the default letters by animating them down
      gsap.to(defaultLetters, {
        y: "100%",
        ease: "power4.out",
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: "center",
        },
      });
    });
  }
});
