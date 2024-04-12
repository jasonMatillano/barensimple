const shopGrid = document.getElementById("shop-grid");

async function fetchProductData() {
  try {
    // Fetch product data from the specified URL
    const response = await fetch("http://localhost:3030/products");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    // Loop through the product data and create HTML elements
    data.slice(0, 15).forEach((product) => {
      // Limit to 16 products
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 col-sm-6"; // Adjust grid columns based on your layout
      col.innerHTML = `
        <div class="product__item">
          <div class="product__item__pic">
            <img src="img/product/${product.image}" alt="Product Image" />
            <ul class="product__item__pic__hover">
              <li>
                <a href="#" id="myfavorite"><i class="fa fa-heart"></i></a>
              </li>
              <li>
                <a href="./shop-details.html" id="myretweet"><i class="fa fa-search"></i></a>
              </li>
              <li>
                <a href="#" id="mycart"><i class="fa fa-shopping-cart"></i></a>
              </li>
            </ul>
          </div>
          <div class="product__item__text">
            <h6><a href="./shop-details.html">${product.name}</a></h6>
            <h5>₱${product.price.toFixed(2)}</h5>
          </div>
        </div>
      `;

      // Add click event listeners to the list items
      const favoriteIcon = col.querySelector("#myfavorite");
      const retweetIcon = col.querySelector("#myretweet");
      const cartIcon = col.querySelector("#mycart");

      favoriteIcon.addEventListener("click", () => {
        alert(
          `You clicked the favorite icon for product ID: ${product.id}, Name: ${product.name}`
        );
      });

      retweetIcon.addEventListener("click", () => {
        alert(
          `You clicked the retweet icon for product ID: ${product.id}, Name: ${product.name}`
        );
      });

      cartIcon.addEventListener("click", () => {
        alert(
          `You clicked the cart icon for product ID: ${product.id}, Name: ${product.name}`
        );
      });

      shopGrid.appendChild(col);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Call the function to fetch and fill the product containers
fetchProductData();
