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
      filterToggle.setAttribute(
        "aria-expanded",
        filterContent.classList.contains("hidden") ? "false" : "true",
      );
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
          })
          .catch((error) => {
            console.error("Error fetching secondary textile types:", error);
          });
      } else {
        // Disable the secondary select if no primary type is selected
        secondarySelect.innerHTML =
          '<option value="">Select secondary textile type</option>';
        secondarySelect.disabled = true;
      }
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        primarySelect.value = "";
        secondarySelect.innerHTML =
          '<option value="">Select secondary textile type</option>';
        secondarySelect.disabled = true;
      });
    }
  } else {
    console.error("Primary or secondary select element not found");
  }
});

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
