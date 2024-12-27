document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', () => {
        const dropdownContent = button.nextElementSibling;
        dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
});


// Object mapping 'from' formats to 'to' formats
const formatMapping = {
    document: ["PDF", "DOCX", "TXT", "ODT" ],
    image: ["JPG", "PNG", "GIF", "TIFF"],
    
};

// // Dropdown elements
// const fromDropdown = document.getElementById("format-from");
// const toDropdown = document.getElementById("format-to");

// // Listen for changes in the 'from' dropdown
// fromDropdown.addEventListener("change", () => {
//     const selectedFormat = fromDropdown.value;

//     // Clear the 'to' dropdown
//     toDropdown.innerHTML = '<option value="">Select Format</option>';

//     // Populate the 'to' dropdown based on selection
//     if (formatMapping[selectedFormat]) {
//         formatMapping[selectedFormat].forEach(format => {
//             const option = document.createElement("option");
//             option.value = format.toLowerCase();
//             option.textContent = format;
//             toDropdown.appendChild(option);
//         });
//     }
// });
const formatToOptions = {
    document: [
        { value: "pdf", text: "PDF" },
        { value: "docx", text: "DOCX" },
        { value: "txt", text: "TXT" }
    ],
    image: [
        { value: "jpeg", text: "JPEG" },
        { value: "png", text: "PNG" },
        { value: "gif", text: "GIF" }
    ]
   
};

document.getElementById("format-from").addEventListener("change", function () {
    const formatToDropdown = document.getElementById("format-to");
    const selectedFormat = this.value;

    // Clear previous options
    formatToDropdown.innerHTML = '<option value="">Select Format</option>';

    if (formatToOptions[selectedFormat]) {
        formatToOptions[selectedFormat].forEach(option => {
            const newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.textContent = option.text;
            formatToDropdown.appendChild(newOption);
        });
    }
});

