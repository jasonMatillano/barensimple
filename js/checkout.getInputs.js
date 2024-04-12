// Function to open the modal and populate the FIRST modal with input values
function showModalGetInputValues() {
  // Get the modal content element
  const modalContent = document.getElementById("orderDetailsContent");

  // Get the validation modal element
  const validationModal = document.getElementById("thirdModal");

  // Define an array to store validation errors
  const validationErrors = [];

  // Define validation functions for required fields
  function validateRequiredField(field, fieldName) {
    const value = field.value.trim();
    if (value === "") {
      // Add validation error to the array
      validationErrors.push(`*${fieldName} is required`);
    }
  }

  // Define validation function for email
  function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      // Add validation error to the array
      validationErrors.push("*Email is not valid");
    }
  }

  // Define validation function for phone number
  function validatePhoneNumber(phoneField) {
    const phone = phoneField.value.trim();
  
    // Check if the phone number starts with "09" or "+639" followed by exactly 9 digits
    if (!/^(09\d{9}|\+639\d{9})$/.test(phone)) {
      // Add validation error to the array
      validationErrors.push("*Phone number must start with '09' or '+639' and be followed by exactly 9 digits");
    }
  }

  // Define validation function for Zip/Postal Code (numeric only)
  function validatePostalCode(postalCodeField) {
    const postalCode = postalCodeField.value.trim();
  
    if (!/^\d{4}$/.test(postalCode)) {
      // Add validation error to the array
      validationErrors.push("*Zip/Postal Code must contain exactly 4 numeric characters");
    }
  }

  // Validate input fields
  const firstNameField = document.getElementById("first_name");
  validateRequiredField(firstNameField, "First Name");

  const lastNameField = document.getElementById("last_name");
  validateRequiredField(lastNameField, "Last Name");

  const streetAddressField = document.getElementById("street_address");
  validateRequiredField(streetAddressField, "Street Address");

  const provinceField = document.getElementById("province");
  validateRequiredField(provinceField, "Province");

  const cityField = document.getElementById("city");
  validateRequiredField(cityField, "City");

  const postalCodeField = document.getElementById("postal_code");
  validateRequiredField(postalCodeField, "Postal Code");
  validatePostalCode(postalCodeField);

  const phoneField = document.getElementById("phone");
  validateRequiredField(phoneField, "Phone");
  validatePhoneNumber(phoneField);

  const emailField = document.getElementById("email");
  validateRequiredField(emailField, "Email");
  validateEmail(emailField);

  // If there are validation errors, show them in a single alert modal
  if (validationErrors.length > 0) {
    // Show validation modal with error messages
    document.getElementById("validationModalLabel").textContent = "Validation Errors";
    document.getElementById("validationErrorMessage").innerHTML = validationErrors.join("<br>");
    $('#thirdModal').modal('show');
    return;
  }

  // Populate the modal content with the information from the form
  modalContent.innerHTML = `
    <!-- Populate modal content here -->
    <p><strong>Subtotal:</strong> ${document.getElementById("subtotal").textContent}</p>
    <p><strong>Shipping Fee:</strong> ${document.getElementById("shippingfee").textContent}</p>
    <hr>
    <p><strong>Total:</strong> ${document.getElementById("total").textContent}</p>
    <p><strong>Ordered by:</strong> Mark</p>
    <hr>
    <h3>Receiver's Information:</h3>
    <p><strong>First Name:</strong> ${document.getElementById("first_name").value}</p>
    <p><strong>Last Name:</strong> ${document.getElementById("last_name").value}</p>
    <p><strong>Address:</strong> ${document.getElementById("street_address").value}, ${document.getElementById("city").value}</p>
    <p><strong>Province:</strong> ${document.getElementById("province").value}</p>
    <p><strong>City:</strong> ${document.getElementById("city").value}</p>
    <p><strong>Postal Code / ZIP:</strong> ${document.getElementById("postal_code").value}</p>
    <p><strong>Phone:</strong> ${document.getElementById("phone").value}</p>
    <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
  `;

  // Show the first modal using Bootstrap modal function
  $('#firstModal').modal('show');
}

// Add a click event listener to the Place Holder Btn To show 
const btn = document.getElementById("showModalsButton1");
btn.addEventListener("click", showModalGetInputValues);

// Add a click event listener to close the first modal and show the THIRD modal
const confirmOrderButton = document.getElementById("showModalsButton2");
confirmOrderButton.addEventListener("click", function () {
  $("#firstModal").modal("hide");
  $("#secondModal").modal("show");

  // Delete all content of shoppingCart.json thru http://localhost:3030

  // Define the URL for the shopping cart content
  const shoppingCartUrl = 'http://localhost:3030/shoppingcart';
  
  // Send a DELETE request to the shoppingCartUrl to delete the content
  fetch(shoppingCartUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Log a success message if the content is deleted successfully
      console.log('Shopping cart content deleted successfully.');
    } else {
      // Handle an error if the deletion fails
      throw new Error('Failed to delete shopping cart content.');
    }
  })
  .catch(error => {
    // Log an error message if there is an issue with the deletion
    console.error('Error deleting shopping cart content:', error);
  });

  
});
