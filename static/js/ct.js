// JavaScript to handle carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");

  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const slideWidth = carouselItems[0].clientWidth;

  // Adjusted function to move to next slide
  const moveToNextSlide = () => {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to the first slide
    }
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  // Set an interval to auto-advance the slides every 8 seconds
  setInterval(moveToNextSlide, 6000);
});

// Handle the carousel indicators.
document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".carousel-indicator");
  let currentIndex = 0;

  const updateIndicators = () => {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.replace("bg-gray-300", "bg-blue-500"); // "Light up" the active indicator
      } else {
        indicator.classList.replace("bg-blue-500", "bg-gray-300"); // Dim other indicators
      }
    });
  };

  // Assuming you have a function to change the slide
  const changeSlide = (newIndex) => {
    currentIndex = newIndex;
    // Update the carousel view here
    updateIndicators();
  };

  // Initialize
  updateIndicators();
  // Add event listeners or other logic to change slides
});

// Handle keyword auto-suggestion
// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelector('[name="keywords"]').id = 'keywords-input';
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const input = document.getElementById('keywords-input');
//     const suggestionsContainer = document.getElementById('keywords-suggestions');

//     input.addEventListener('input', function() {
//         const query = this.value;
//         if (query.length > 2) { // Fetch suggestions after 2 characters
//             fetch(`/keyword-suggestions/?term=${encodeURIComponent(query)}`)
//                 .then(response => response.json())
//                 .then(suggestions => {
//                     suggestionsContainer.innerHTML = ''; // Clear previous suggestions
//                     suggestions.forEach(suggestion => {
//                         const div = document.createElement('div');
//                         div.textContent = suggestion;
//                         div.classList.add('suggestion-item');
//                         div.addEventListener('click', function() {
//                             input.value = suggestion; // Fill input with clicked suggestion
//                             suggestionsContainer.innerHTML = ''; // Clear suggestions
//                         });
//                         suggestionsContainer.appendChild(div);
//                     });
//                 });
//         } else {
//             suggestionsContainer.innerHTML = ''; // Clear suggestions if query is too short
//         }
//     });
// });
