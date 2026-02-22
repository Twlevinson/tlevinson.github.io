const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");

document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery")) {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
