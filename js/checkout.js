// Function to add content for Checkout list
function addProductToCheckoutList(product) {
    // Create a new list item with product information
    const listItem = document.createElement("li");
    
    // Format the product total price as currency (PHP)
    const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    });
    
    listItem.innerHTML = `
        ${product.name} <span>${formatter.format(product.total)}</span>
    `;

    // Append the list item to the checkout list
    checkoutListElement.appendChild(listItem);
}

// Function to update the total sum in the Checkout section
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

// Get a reference to the checkout list element
const checkoutListElement = document.getElementById("checkout_list");


// Main Code =====================================================================
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

        // Clear the checkout list
        checkoutListElement.innerHTML = '';

        // Loop through the products and add them to the checkout list
        data.forEach((product) => {
            addProductToCheckoutList(product);
        });

        // Call a function to update the total sum in the Checkout section
        updateCartTotalSum(data);

    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Assuming you have already populated the cart with products,
// call this function to update the total sum and Checkout list
fetchProductData();
