import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const imageModalRef = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const backdropRef = document.querySelector(".lightbox__overlay");

const marcup = gallery.map(({ preview, original, description }, index) => creatGalleryItem(preview, original, description, index));

function creatGalleryItem(preview, original, description, index) {
  const galleryItem = document.createElement("li");
  const galleryLink = document.createElement("a");
  const galleryImage = document.createElement("img");

  galleryItem.classList.add("gallery__item");

  galleryLink.classList.add("gallery__link");
  galleryLink.setAttribute("href", original);

  galleryImage.classList.add("gallery__image");
  galleryImage.setAttribute("src", preview);
  galleryImage.setAttribute("data-source", original);
  galleryImage.setAttribute("alt", description);
  galleryImage.setAttribute("data-index", index);

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
  const largeImageAlt = imageRef.alt;
  const largeImageIndex = imageRef.dataset.index;

  setLargeImageURL(largeImageURL);
  setLargeImageDescription(largeImageAlt);
  setLargeImageIndex(largeImageIndex);
}

function onOpenModal() {
  window.addEventListener("keydown", onPressBtn);
  modalRef.classList.add("is-open");
}

function setLargeImageURL(url) {
  imageModalRef.src = url;
}

function setLargeImageDescription(description) {
  imageModalRef.alt = description;
}

function setLargeImageIndex(index) {
  imageModalRef.setAttribute("data-index", index);
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressBtn);
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

function onPressBtn(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
  onTurnOutGallery();
}

function onTurnOutGallery() {
  const index = Number(imageModalRef.dataset.index);
  let nextIndex;

  if (event.code === "ArrowLeft" && index !== 0) {
    nextIndex = index - 1;
  }
  if (event.code === "ArrowRight" && index !== gallery.length - 1) {
    nextIndex = index + 1;
  }
  if (nextIndex || nextIndex === 0) {
    const newItemURL = gallery[nextIndex].original;
    const newItemAlt = gallery[nextIndex].description;

    console.log(nextIndex);

    setLargeImageURL(newItemURL);
    setLargeImageDescription(newItemAlt);
    setLargeImageIndex(nextIndex);
  }
}

// function onTurnOutGallery() {  // Другой вариант. до рекомендации ментора...
//   const index = Number(imageModalRef.dataset.index);

//   if (event.code === "ArrowLeft" && index !== 0) {

//     const nextIndex = index - 1;
//     const newItemURL = gallery[nextIndex].original;
//     const newItemAlt = gallery[nextIndex].description;

//     setLargeImageURL(newItemURL);
//     setLargeImageDescription(newItemAlt);
//     setLargeImageIndex(nextIndex);
//   }
//   if (event.code === "ArrowRight" && index !== gallery.length - 1) {
//     const nextIndex = index + 1;
//     const newItemURL = gallery[nextIndex].original;
//     const newItemAlt = gallery[nextIndex].description;

//     setLargeImageURL(newItemURL);
//     setLargeImageDescription(newItemAlt);
//     setLargeImageIndex(nextIndex);
//   }
// }
//========== Слушатели!
galleryRef.addEventListener("click", onGalleryClick);
closeModalBtn.addEventListener("click", onCloseModal);
backdropRef.addEventListener("click", onBackdropClick);
