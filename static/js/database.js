document.addEventListener("DOMContentLoaded", function () {
  // Handle filter panel toggle on mobile
  const filterToggle = document.getElementById("mobile-filter-toggle");
  const filterContent = document.getElementById("filter-content");

  if (filterToggle && filterContent) {
    // On mobile, hide the filter content by default
    if (window.innerWidth < 1024) {
      filterContent.classList.add("hidden");
    }

    filterToggle.addEventListener("click", function () {
      filterContent.classList.toggle("hidden");
      // Rotate the toggle icon
      const icon = filterToggle.querySelector("svg");
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    });

    // Update visibility when window is resized
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) {
        filterContent.classList.remove("hidden");
      } else if (
        !filterContent.classList.contains("hidden") &&
        !filterToggle.classList.contains("active")
      ) {
        filterContent.classList.add("hidden");
      }
    });
  }

  // Textile type dropdowns
  const primarySelect = document.querySelector("[data-primary-id]");
  const secondarySelect = document.querySelector("[data-secondary-id]");

  if (primarySelect && secondarySelect) {
    primarySelect.addEventListener("change", function () {
      const primaryValue = primarySelect.value;

      if (primaryValue) {
        fetch(`/get-secondary-textile-types/${primaryValue}/`)
          .then((response) => response.json())
          .then((data) => {
            // Clear existing options
            secondarySelect.innerHTML =
              '<option value="">Select secondary textile type</option>';

            // Populate new options
            data.forEach((item) => {
              const option = document.createElement("option");
              option.value = item.value;
              option.textContent = item.name;
              secondarySelect.appendChild(option);
            });

            // Enable the secondary select
            secondarySelect.disabled = false;
            secondarySelect.classList.remove(
              "cursor-not-allowed",
              "opacity-50",
              "bg-gray-100",
            );
            secondarySelect.classList.add("bg-white");
          })
          .catch((error) => {
            console.error("Error fetching secondary textile types:", error);
          });
      } else {
        // Disable the secondary select if no primary type is selected
        secondarySelect.innerHTML =
          '<option value="">Select secondary textile type</option>';
        secondarySelect.disabled = true;
        secondarySelect.classList.add(
          "cursor-not-allowed",
          "opacity-50",
          "bg-gray-100",
        );
        secondarySelect.classList.remove("bg-white");
      }
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        primarySelect.value = "";
        secondarySelect.innerHTML =
          '<option value="">Select secondary textile type</option>';
        secondarySelect.disabled = true;
        secondarySelect.classList.add(
          "cursor-not-allowed",
          "opacity-50",
          "bg-gray-100",
        );
        secondarySelect.classList.remove("bg-white");
      });
    }
  } else {
    console.error("Primary or secondary select element not found");
  }
});

function fuzzySearch(event) {
  const query = event.target.value;
  if (query.length < 2) {
    event.target.nextElementSibling.innerHTML = "";
    return;
  }
  fetch(`/api/keywords/?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      event.target.nextElementSibling.innerHTML = "";
      data.forEach((item) => {
        const option = document.createElement("div");
        option.className = "dropdown-item p-2 hover:bg-gray-200 cursor-pointer";
        option.textContent = item.name;
        option.onclick = () => {
          event.target.value = item.name;
          event.target.nextElementSibling.innerHTML = "";
        };
        event.target.nextElementSibling.appendChild(option);
      });
    });
}

function selectKeyword(name) {
  document.getElementById("id_keywords").value = name;
  document.getElementById("keywords-dropdown").innerHTML = "";
}

function resetForm() {
  const form = document.querySelector("form");

  // Reset the form
  form.reset();

  // Also reset the range input values which might not be covered by form.reset()
  if (typeof Alpine !== "undefined") {
    // Get any elements with x-data that contain slider state
    document.querySelectorAll("[x-data]").forEach((el) => {
      const data = el.getAttribute("x-data");
      if (data && (data.includes("minVal") || data.includes("maxVal"))) {
        // Try to get Alpine component data
        const alpineData = Alpine.$data(el);
        if (alpineData) {
          // Reset the slider values to min/max
          if (alpineData.minVal !== undefined)
            alpineData.minVal = alpineData.min;
          if (alpineData.maxVal !== undefined)
            alpineData.maxVal = alpineData.max;
        }
      }
    });
  }

  // Submit the form
  form.submit();
}

let scrollPosition = 0;

function openModal(recordId, recordUrl) {
  // Save the current scroll position
  scrollPosition = window.scrollY;

  // Lock the scroll position
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";

  // Show the modal with loading animation
  document.getElementById("detailsModal").classList.remove("hidden");

  // Make an AJAX request to fetch the record details
  fetch(`/record-details/${recordId}/`)
    .then((response) => response.json())
    .then((data) => {
      const safeData = (value) => (value !== null ? value : "—");

      // Populate the modal content with the fetched data
      const modalContent = document.getElementById("modal-content");
      modalContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-3">
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Record ID</h4>
              <p class="text-sm text-gray-800">${recordId}</p>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Originating Area</h4>
              <p class="text-sm text-gray-800">${safeData(data.from_area)}</p>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Originating Place</h4>
              <p class="text-sm text-gray-800">${safeData(data.from_place)}</p>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Destination Area</h4>
              <p class="text-sm text-gray-800">${safeData(data.to_area)}</p>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Destination Place</h4>
              <p class="text-sm text-gray-800">${safeData(data.to_place)}</p>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase">Record Creator</h4>
              <p class="text-sm text-gray-800">${safeData(
                data.record_creator,
              )}</p>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h4 class="text-xs font-semibold text-gray-500 uppercase">Summary of Record</h4>
          <p class="text-sm text-gray-800 mt-1">${safeData(
            data.summary_of_record,
          )}</p>
        </div>
        
        <div class="mt-6 flex justify-center">
          <a href="${recordUrl}" class="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Complete Record
          </a>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error fetching record details:", error);
      const modalContent = document.getElementById("modal-content");
      modalContent.innerHTML = `
        <div class="text-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-800">Error loading record details.</p>
          <p class="text-sm text-gray-500 mt-1">Please try again later.</p>
        </div>
      `;
    });
}

function closeModal() {
  // Hide the modal
  document.getElementById("detailsModal").classList.add("hidden");

  // Restore the scroll position
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);
}
