// Function to add a product to the "cart-items" element
function addProductToBag(data) {

  // Calculate the total quantity and total price
  const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Get references to the "header__cart" elements
  const headerCartElements = document.querySelectorAll(".header__cart");

  // Get references to the "humberger__menu__cart" elements
  const humbergerCartElements = document.querySelectorAll(".humberger__menu__cart");

  // Function to create a new cart element
  function createCartElement(totalPrice, totalQuantity) {
      const divCart = document.createElement("div");

      // Format the total price as currency
      const formattedPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(totalPrice);

      // Define the content of divCart
      divCart.innerHTML = `
      <ul>
        <li>
          <a href="#"><i class="fa fa-heart"></i> <span>8</span></a>
        </li>
        <li>
          <a href="./shoping-cart.html"><i class="fa fa-shopping-bag"></i> <span>${totalQuantity}</span></a>
        </li>
      </ul>
      <div class="header__cart__price">item: <span>${formattedPrice}</span></div>
      `;

      return divCart;
  }

  // Loop through the cart elements and update them with the new cart content
  headerCartElements.forEach(element => {
      element.innerHTML = ''; // Clear the existing content
      element.appendChild(createCartElement(totalPrice, totalQuantity)); // Append the new cart content
  });

  humbergerCartElements.forEach(element => {
      element.innerHTML = ''; // Clear the existing content
      element.appendChild(createCartElement(totalPrice, totalQuantity)); // Append the new cart content
  });

}

// Main Code =======================================================================================================

async function fetchProductData() {
  try {
    // Fetch product data from the specified URL
    const response = await fetch("http://localhost:3030/shoppingcart");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    // Re-populate the content of the navbar shopping-cart
    addProductToBag(data)

  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

fetchProductData()

