// Smooth button interaction

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.boxShadow =
      "0 0 20px rgba(0,245,255,0.6)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.boxShadow = "none";
  });
});

// Fade-in animation on scroll

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll(".section, .card")
  .forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
  });

// Hero button action

const heroButton = document.querySelector(".hero .btn");

if (heroButton) {
  heroButton.addEventListener("click", () => {
    document
      .querySelector(".section")
      .scrollIntoView({
        behavior: "smooth",
      });
  });
}