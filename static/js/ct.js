// More to come

// JavaScript to handle carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const slideWidth = carouselItems[0].clientWidth;

  // Function to move to next slide
  const moveToNextSlide = () => {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  };

  // Function to move to previous slide
  const moveToPrevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
      carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  };

  // Event listeners for navigation buttons
  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPrevSlide);
});
