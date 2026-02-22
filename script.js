const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");

// Collect images AFTER page loads
const images = [...document.querySelectorAll(".gallery img")];

let currentIndex = -1;

// Open modal
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.style.display = "flex";
  });
});

function showImage() {
  modalImg.src = images[currentIndex].src;
}

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  if (e.key === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

// Click zones (left / right half of screen)
modal.addEventListener("click", (e) => {
  if (e.target !== modalImg) return;

  const midpoint = window.innerWidth / 2;

  if (e.clientX > midpoint) {
    currentIndex = (currentIndex + 1) % images.length;
  } else {
    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
  }

  showImage();
});
