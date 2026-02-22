const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");

// Get all gallery images
const images = Array.from(document.querySelectorAll(".gallery img"));

let currentIndex = 0;

// Open modal when clicking an image
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openModal();
  });
});

function openModal() {
  modal.style.display = "flex";
  modalImg.src = images[currentIndex].src;
}

function closeModal() {
  modal.style.display = "none";
}

// Close button
closeBtn.addEventListener("click", closeModal);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    prevImage();
  }

  if (e.key === "Escape") {
    closeModal();
  }
});

// Click left/right side of image
modalImg.addEventListener("click", (e) => {
  const clickX = e.clientX;
  const screenWidth = window.innerWidth;

  if (clickX > screenWidth / 2) {
    nextImage();
  } else {
    prevImage();
  }
});

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex].src;
}
