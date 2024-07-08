const container = document.querySelector(".container");
const slider = document.querySelector(".slider");

setAspectRatio = () => {
  const imageElement = document.querySelector(`.image-${imageNumber}`);
  const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
  const aspectRatioString = aspectRatio.toString();
  document
    .querySelector(".image-container")
    .style.setProperty("--aspect-ratio", aspectRatioString);
};

slider.addEventListener("input", function (e) {
  container.style.setProperty("--position", e.target.value + "%");
});
