/* =======================
   MODAL ELEMENTS
======================= */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");

/* =======================
   GALLERY IMAGES
======================= */
const images = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

/* =======================
   OPEN MODAL
======================= */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    modal.style.display = "flex";
    document.body.classList.add("modal-open"); // lock background scroll
    showImage();
  });
});

/* =======================
   SHOW IMAGE (FADE SAFE)
======================= */
function showImage() {
  modalImg.style.opacity = 0;

  const src = images[currentIndex].src;
  modalImg.src = src;

  if (modalImg.complete) {
    modalImg.style.opacity = 1;
  } else {
    modalImg.onload = () => {
      modalImg.style.opacity = 1;
    };
  }
}

/* =======================
   CLOSE MODAL
======================= */
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open"); // unlock scroll
}

/* =======================
   KEYBOARD NAVIGATION
======================= */
document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
});

/* =======================
   CLICK LEFT / RIGHT
======================= */
modalImg.addEventListener("click", (e) => {
  const midpoint = window.innerWidth / 2;
  e.clientX > midpoint ? nextImage() : prevImage();
});

/* =======================
   TOUCH / SWIPE (MOBILE)
======================= */
let touchStartX = 0;
let touchEndX = 0;

modalImg.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modalImg.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;

  if (touchEndX < touchStartX - threshold) nextImage();
  if (touchEndX > touchStartX + threshold) prevImage();
}

/* =======================
   HELPERS
======================= */
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}
