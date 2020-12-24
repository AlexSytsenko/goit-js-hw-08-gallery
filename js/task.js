import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const imageModalRef = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const backdropRef = document.querySelector(".lightbox__overlay");

const marcup = gallery.map(({ preview, original, description }) => creatGalleryItem(preview, original, description));

function creatGalleryItem(preview, original, description) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.setAttribute("href", original);

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.setAttribute("src", preview);
  galleryImage.setAttribute("data-source", original);
  galleryImage.setAttribute("alt", description);

  galleryItem.appendChild(galleryLink);
  galleryLink.appendChild(galleryImage);

  return galleryItem;
}

galleryRef.append(...marcup);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  onOpenModal();

  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  const altImage = imageRef.dataset.alt;

  setLargeImageURL(largeImageURL);
  setLargeImageDescription(altImage);

  console.log(largeImageURL);
}

function onOpenModal() {
  window.addEventListener("keydown", onPressEscape);
  modalRef.classList.add("is-open");
}

function setLargeImageURL(url) {
  imageModalRef.src = url;
}

function setLargeImageDescription(description) {
  imageModalRef.alt = description;
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressEscape);
  modalRef.classList.remove("is-open");
  clearLargeImageURL();
  clearLargeImageDescription();
}

function clearLargeImageURL() {
  imageModalRef.src = "";
}

function clearLargeImageDescription() {
  imageModalRef.alt = "";
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

//========== Слушатели!
galleryRef.addEventListener("click", onGalleryClick);
closeModalBtn.addEventListener("click", onCloseModal);
backdropRef.addEventListener("click", onBackdropClick);

