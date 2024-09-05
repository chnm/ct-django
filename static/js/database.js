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
  form.reset();
  form.submit();
}

function openModal(recordId, recordUrl) {
  // Make an AJAX request to fetch the record details
  fetch(`/record-details/${recordId}/`)
    .then((response) => response.json())
    .then((data) => {
      const safeData = (value) =>
        value !== null ? value : "No data provided.";
      // Populate the modal content with the fetched data
      const modalContent = document.getElementById("modal-content");
      modalContent.innerHTML = `
        <p><strong>To Area:</strong> ${safeData(data.to_area)}</p>
        <p><strong>From Area:</strong> ${safeData(data.from_area)}</p>
        <p><strong>To Place:</strong> ${safeData(data.to_place)}</p>
        <p><strong>From Place:</strong> ${safeData(data.from_place)}</p>
        <p><strong>Transcription:</strong></p> 
        <blockquote class="pl-4 ml-4 border-l-2 border-yellow-500">${safeData(
          data.transcription,
        )}</blockquote>
        <p class="text-sm text-right pb-2 mb-2">${safeData(
          data.source_reference,
        )}</p>
        <p><strong>Summary of Record:</strong> ${safeData(
          data.summary_of_record,
        )}</p>
        <p><strong>Source Type:</strong> ${safeData(data.source_type)}</p>
        <div class="flex justify-center mt-4">
            <a href="${recordUrl}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">View Full Record Details</a>
        </div>
        `;

      // Show the modal
      document.getElementById("detailsModal").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error fetching record details:", error);
    });
}

function closeModal() {
  document.getElementById("detailsModal").classList.add("hidden");
}
