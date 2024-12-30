document.querySelectorAll(".dropbtn").forEach((button) => {
  button.addEventListener("click", () => {
    const dropdownContent = button.nextElementSibling;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

// Conversion maps
const conversionMap = {
  PDF: ["DOC", "DOCX", "PNG", "JPG"],
  DOC: ["PDF", "TXT"],
  MP3: ["WAV", "OGG"],
};

const conversionEndpoints = {
  PDF: "http://localhost:3000/convertDocument",
  DOC: "http://localhost:3000/convertDocument",
  DOCX: "http://localhost:3000/convertDocument",
  PNG: "http://localhost:3000/convertImage",
  JPG: "http://localhost:3000/convertImage",
};

document.getElementById("file-input").addEventListener("change", function () {
  const file = this.files[0];
  const conversionOptions = document.getElementById("conversion-options");
  const submitButton = document.querySelector('button[type="submit"]');

  // Reset conversion options
  conversionOptions.innerHTML =
    '<option value="">Select conversion type</option>';
  conversionOptions.disabled = true;
  submitButton.disabled = true;

  if (file) {
    const fileName = file.name;
    const fileType = fileName.split(".").pop().toUpperCase(); // Extract file extension

    console.log(`File selected: ${fileName}`);
    console.log(`Extracted file type: ${fileType}`);
    console.log(`Conversion map keys: ${Object.keys(conversionMap)}`);

    const availableConversions = conversionMap[fileType];
    if (!availableConversions) {
      alert("Unsupported file type for conversion.");
      return;
    }

    // Populate the select element with conversion options
    availableConversions.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      conversionOptions.appendChild(opt);
    });

    conversionOptions.disabled = false;
    submitButton.disabled = false;
  }
});
document.getElementById('file-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const conversionOptions = document.getElementById('conversion-options');

    if (fileInput.files.length === 0 || conversionOptions.value === "") {
        alert("Please upload a file and select a conversion type.");
        return;
    }

    const file = fileInput.files[0];
    const format = conversionOptions.value;
    const fileType = file.name.split('.').pop().toUpperCase();
    const endpoint = conversionEndpoints[fileType];

    if (!endpoint) {
        alert("Unsupported file type for conversion.");
        return;
    }

    // Prepare the request
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format.toLowerCase());

    // Send the request to the corresponding endpoint
    fetch(endpoint, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.blob(); // Get the binary data
        })
        .then(blob => {
            // Create a download link dynamically
            const downloadLink = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `converted.${format.toLowerCase()}`; // Suggested filename

            // Create a button for downloading
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download Converted File';
            downloadButton.style.display = 'block';
            downloadButton.style.marginTop = '100px';
            document.body.appendChild(downloadButton);

            // Add click event for download
            downloadButton.addEventListener('click', () => {
                downloadLink.click(); // Trigger file download
                window.URL.revokeObjectURL(url); // Cleanup URL after download
                downloadButton.remove(); // Remove the button after download
            });
        })
        .catch(error => {
            console.error('Error during conversion:', error);
            alert(`An error occurred: ${error.message}`);
        });
});


const downloadContainer = document.getElementById("download-container");

// Create a download link dynamically
const downloadLink = document.createElement("a");
downloadLink.href = `http://localhost:3000${data.filePath}`;
downloadLink.textContent = "Download Converted File";
downloadLink.download = ""; // Trigger download when clicked
downloadContainer.innerHTML = ""; // Clear previous links
downloadContainer.appendChild(downloadLink);
