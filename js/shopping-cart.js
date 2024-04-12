// Function to add a product row to the table
function addProductToCart(product) {
  // Create a new table row element
  const tr = document.createElement("tr");

  // Set the inner HTML of the row with product information
  tr.innerHTML = `
    <td class="shoping__cart__item">
      <img
          src="img/product/${product.image}"
          alt="${product.name}"
          style="width: 200px; height: 150px;"
      />
  
      <h5>${product.name}</h5>
    </td>
    <td id="product_price${product.id}" class="shoping__cart__total">${product.price}</td>
    <td class="shoping__cart__quantity">
      <div class="quantity">
        <div class="pro-qty">
          <span class="dec qtybtn" data-id="${product.id}">-</span>
          <input id="${product.id}" type="text" value="${product.quantity}" />
          <span class="inc qtybtn" data-id="${product.id}">+</span>
        </div>
      </div>
    </td>
    <td id="product_total_price${product.id}" class="shoping__cart__total">${product.quantity * product.price}</td>
    <td class="shoping__cart__item__close">
      <span class="icon_close"></span>
    </td>
  `;

  // Append the created row to the table
  table.appendChild(tr);

  // Add event listeners to the "+" and "-" buttons
  const decBtn = tr.querySelector('.dec.qtybtn');
  const incBtn = tr.querySelector('.inc.qtybtn');
  const quantityInput = tr.querySelector('input');
  const totalPriceTd = tr.querySelector(`#product_total_price${product.id}`);
  const priceTd = tr.querySelector(`#product_price${product.id}`);

  // Format the initial price and total price as Phil Peso currency
  const initialPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.price);
  const initialTotalPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.quantity * product.price);

  priceTd.textContent = initialPrice;
  totalPriceTd.textContent = initialTotalPrice;


  // Attach a click event listener to the "decBtn" element
  decBtn.addEventListener('click', async () => {
    // Get the ID attribute from the "decBtn" element
    const id = decBtn.getAttribute('data-id');

    // Parse the current quantity value as an integer
    const currentQuantity = parseInt(quantityInput.value, 10);

    // Check if the current quantity is greater than 0
    if (currentQuantity > 0) {
      // Calculate the new quantity by subtracting 1
      const newQuantity = currentQuantity - 1;

      // Update the quantity input field with the new value
      quantityInput.value = newQuantity;

      // Calculate the new total price
      const newTotalPrice = newQuantity * product.price;

      // Format the new total price as currency (PHP)
      const newTotalPriceFormatted = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
      }).format(newTotalPrice);

      // Update the content of the "totalPriceTd" element with the new total price
      totalPriceTd.textContent = newTotalPriceFormatted;

      try {
        // Construct the URL for the PUT request
        const putUrl = `http://localhost:3030/shoppingcart/${id}`;

        // Create the data to be sent in the PUT request
        const putData = {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          latest: product.latest,
          quantity: newQuantity
        };

        // Send a PUT request to update the shoppingcart.json file
        const response = await fetch(putUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(putData)
        });

        // Check if the response is not OK (i.e., not in the 2xx range)
        if (!response.ok) {
          throw new Error('Failed to update quantity in the shoppingcart.json file');
        }

        // Parse the response as JSON
        const data = await response.json();

        // Handle the response data if needed
        console.log('Quantity updated in the shoppingcart.json file', data);

        // Clear and re-populate the content of the table
        table.innerHTML = '';
        fetchProductData()

      } catch (error) {
        // Handle any errors that occur during the PUT request
        console.error('Error updating quantity:', error);
      }

    }
  });

  // Attach a click event listener to the "incBtn" element
  incBtn.addEventListener('click', async () => {
    // Get the ID attribute from the "incBtn" element
    const id = incBtn.getAttribute('data-id');

    // Parse the current quantity value as an integer
    const currentQuantity = parseInt(quantityInput.value, 10);

    // Increase the quantity by 1
    quantityInput.value = currentQuantity + 1;

    // Calculate the new total price
    const newTotalPrice = (currentQuantity + 1) * product.price;

    // Format the new total price as currency (PHP)
    const newTotalPriceFormatted = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(newTotalPrice);

    // Update the content of the "totalPriceTd" element with the new total price
    totalPriceTd.textContent = newTotalPriceFormatted;

    try {
      // Construct the URL for the PUT request
      const putUrl = `http://localhost:3030/shoppingcart/${id}`;

      // Create the data to be sent in the PUT request
      const putData = {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        latest: product.latest,
        quantity: currentQuantity + 1 // Updated quantity
      };

      // Send a PUT request to update the shoppingcart.json file
      const response = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
      });

      // Check if the response is not OK (i.e., not in the 2xx range)
      if (!response.ok) {
        throw new Error('Failed to update quantity in the shoppingcart.json file');
      }

      // Parse the response as JSON
      const data = await response.json();

      // Handle the response data if needed
      console.log('Quantity updated in the shoppingcart.json file', data);
      
      // Clear and re-populate the content of the table
      table.innerHTML = '';
      fetchProductData()


    } catch (error) {
      // Handle any errors that occur during the PUT request
      console.error('Error updating quantity:', error);
    }
  });

  // Add an event listener to the close icon
  const closeIcon = tr.querySelector('.icon_close');
  closeIcon.addEventListener('click', async () => {
    // Get the product ID for the item to be removed
    const id = product.id;

    // Create a custom confirmation dialog
    const userConfirmed = window.confirm(`Are you sure you want to remove ${product.name} from your shopping cart?`);

    // Check if the user confirmed the removal
    if (userConfirmed) {
      try {
        // Construct the URL for the DELETE request
        const deleteUrl = `http://localhost:3030/shoppingcart/${id}`;

        // Send a DELETE request to remove the product with the specified ID
        const response = await fetch(deleteUrl, {
          method: 'DELETE'
        });

        // Check if the DELETE request was successful
        if (response.ok) {
          // Remove the row from the table
          tr.remove();

          // Wait for a short period (simulating some asynchronous action)
          await new Promise(resolve => setTimeout(resolve, 10));

          // Display an alert with the success message
          alert(`${product.name} has been removed from the shopping cart.`);

          // Reload the page
          window.location.reload();
        } else {
          // Handle the case where the DELETE request was not successful
          console.error('Failed to delete the product.');
        }
      } catch (error) {
        // Handle any errors that occur during the DELETE request
        console.error('Error deleting the product:', error);
      }
    }
  });

}

function updateCartTotalSum(products) {
  const totalSum = products.reduce((sum, product) => sum + product.total, 0);
  const shippingFeeAmount = 100.00;

  // Format the total sum and shipping fee as currency (PHP)
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  });

  // Reference the content of the defined elements for the new total sum, shipping fee, and subtotal
  const subTotalElement = document.getElementById('subtotal');
  const shippingFeeElement = document.getElementById('shippingfee');
  const totalSumElement = document.getElementById('total');

  // Update the content of the <span> elements with the formatted values
  subTotalElement.textContent = formatter.format(totalSum);
  shippingFeeElement.textContent = formatter.format(shippingFeeAmount);
  totalSumElement.textContent = formatter.format(totalSum + shippingFeeAmount);
}


// Main Code ================================================================================================================
// Get a reference to the table element with the "cart-items" id
const table = document.getElementById("cart-items");

// Function to add a product to the "cart-items" element
async function fetchProductData() {
  try {
    // Fetch product data from the specified URL
    const response = await fetch("http://localhost:3030/shoppingcart");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    // Calculate the total price for each item and add it to each object
    data.forEach(item => {
      item.total = item.price * item.quantity;
    });

    // Loop through the products and add them to the cart
    data.forEach((product) => {
      addProductToCart(product);
    });

    // Call a function to update the total sum
    updateCartTotalSum(data);

    // Re-populate the content of the navbar shopping-cart using cart.items.js imported in shopping-cart.html
    addProductToBag(data)

  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}


// Assuming you have already populated the cart with products, call this function to update the total sum
fetchProductData();



