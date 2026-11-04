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
