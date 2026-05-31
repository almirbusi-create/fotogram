"use strict";

const galleryElement = document.getElementById("gallery");
const dialogElement = document.getElementById("photo-dialog");
const dialogTitleElement = document.getElementById("dialog-title");
const dialogImageElement = document.getElementById("dialog-image");
const dialogCounterElement = document.getElementById("dialog-counter");
const closeDialogButton = document.getElementById("close-dialog");
const previousPhotoButton = document.getElementById("previous-photo");
const nextPhotoButton = document.getElementById("next-photo");

let currentPhotoIndex = 0;

const photos = [
  {
    title: "Alaska-810433_1280",
    src: "./assets/img/glacier.png",
    fullSrc: "./assets/img/full/glacier.webp",
    alt: "Gletschersee mit Bergen und Eis",
  },
  {
    title: "Anime-8788959_1280",
    src: "./assets/img/city.png",
    fullSrc: "./assets/img/full/city.jpg",
    alt: "Beleuchtete Stadtstrasse bei Nacht",
  },
  {
    title: "Atmosphere-8752835_1280",
    src: "./assets/img/storm-clouds.png",
    fullSrc: "./assets/img/full/storm-clouds.png",
    alt: "Dunkle Sturmwolken am Himmel",
  },
  {
    title: "Blue-tit-8521052_1280",
    src: "./assets/img/bird-branch.png",
    fullSrc: "./assets/img/full/bird-branch.jpg",
    alt: "Kleiner Vogel auf einem Ast",
  },
  {
    title: "Hurricane-92968_1280",
    src: "./assets/img/hurricane.png",
    fullSrc: "./assets/img/full/hurricane.jpg",
    alt: "Wirbelsturm aus der Satellitenperspektive",
  },
  {
    title: "Lake-2896379_1280",
    src: "./assets/img/mountain-lake.png",
    fullSrc: "./assets/img/full/mountain-lake.jpg",
    alt: "Ruhiger Bergsee mit verschneiten Bergen",
  },
  {
    title: "Moorente-8783210_1280",
    src: "./assets/img/duck.png",
    fullSrc: "./assets/img/full/duck.jpg",
    alt: "Ente auf blauem Wasser",
  },
  {
    title: "Sea-2563389_1280",
    src: "./assets/img/night-sea.png",
    fullSrc: "./assets/img/full/night-sea.webp",
    alt: "Person auf einem Felsen am dunklen Meer",
  },
  {
    title: "Snow-bunting-6781122_1280",
    src: "./assets/img/snow-bird-correct.png",
    fullSrc: "./assets/img/full/snow-bird.jpg",
    alt: "Heller Vogel auf dunklen Steinen",
  },
  {
    title: "Snow-leopard-cubs-8039138_1280",
    src: "./assets/img/snow-leopard.png",
    fullSrc: "./assets/img/full/snow-leopard.jpg",
    alt: "Schneeleopard auf einem Felsen",
  },
  {
    title: "Travel-8785493_1280",
    src: "./assets/img/mountains.png",
    fullSrc: "./assets/img/full/mountains.jpg",
    alt: "Berglandschaft unter blauem Himmel",
  },
  {
    title: "Winter-1675197_1280",
    src: "./assets/img/winter-tree.png",
    fullSrc: "./assets/img/full/winter-tree.jpg",
    alt: "Verschneiter Baum in Winterlandschaft",
  },
];

function init() {
  renderGallery();
  closeDialogButton.addEventListener("click", closeDialog);
  previousPhotoButton.addEventListener("click", showPreviousPhoto);
  nextPhotoButton.addEventListener("click", showNextPhoto);
  dialogElement.addEventListener("click", closeDialogOnBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}

function renderGallery() {
  galleryElement.innerHTML = "";

  for (let index = 0; index < photos.length; index++) {
    galleryElement.innerHTML += renderPhoto(photos[index], index);
  }

  const photoButtons = galleryElement.querySelectorAll(".photo-button");

  for (const photoButton of photoButtons) {
    photoButton.addEventListener("click", handlePhotoButtonClick);
  }
}

function renderPhoto(photo, index) {
  return `
    <button class="photo-button" type="button" data-photo-index="${index}" aria-label="Foto ${index + 1} gross ansehen">
      <img class="photo-thumbnail" src="${photo.src}" alt="${photo.alt}">
    </button>
  `;
}

function handlePhotoButtonClick(event) {
  openDialog(Number(event.currentTarget.dataset.photoIndex));
}

function openDialog(index) {
  currentPhotoIndex = index;
  updateDialogPhoto();
  dialogElement.hidden = false;
  document.body.classList.add("dialog-open");
  closeDialogButton.focus();
}

function closeDialog() {
  dialogElement.hidden = true;
  document.body.classList.remove("dialog-open");
}

function showPreviousPhoto() {
  currentPhotoIndex--;

  if (currentPhotoIndex < 0) {
    currentPhotoIndex = photos.length - 1;
  }

  updateDialogPhoto();
}

function showNextPhoto() {
  currentPhotoIndex++;

  if (currentPhotoIndex >= photos.length) {
    currentPhotoIndex = 0;
  }

  updateDialogPhoto();
}

function updateDialogPhoto() {
  const currentPhoto = photos[currentPhotoIndex];

  dialogTitleElement.textContent = currentPhoto.title;
  dialogImageElement.src = currentPhoto.fullSrc;
  dialogImageElement.alt = currentPhoto.alt;
  dialogCounterElement.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
}

function closeDialogOnBackdropClick(event) {
  if (event.target === dialogElement) {
    closeDialog();
  }
}

function handleKeydown(event) {
  if (dialogElement.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeDialog();
  }

  if (event.key === "ArrowLeft") {
    showPreviousPhoto();
  }

  if (event.key === "ArrowRight") {
    showNextPhoto();
  }
}

init();
