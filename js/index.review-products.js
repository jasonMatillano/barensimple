const reviewProductsContainer1 = document.getElementById("review-products1");
const reviewProductsContainer2 = document.getElementById("review-products2");

async function fetchProductData() {
  try {
    // Fetch product data from the specified URL
    const response = await fetch("http://localhost:3030/products");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    // Filter products with "review" property set to "yes"
    const reviewProducts1 = data.filter((product) => product.latest === "yes");

    // Filter products with "review" property set to "yes"
    const reviewProducts2 = data.filter((product) => product.latest === "no");

    // Loop through the filtered product data and create HTML elements
    reviewProducts1.forEach((product) => {
      const productElement = document.createElement("a");
      productElement.className = "latest-product__item";
      productElement.href = "./shop-details.html";

      productElement.innerHTML = `
        <div class="latest-product__item__pic">
          <img src="img/product/${product.image}" alt="" />
        </div>
        <div class="latest-product__item__text">
          <h6>${product.name}</h6>
          <span>₱${product.price}</span>
        </div>
      `;

      reviewProductsContainer1.appendChild(productElement);
      // latestProductsContainer2.appendChild(productElement);
    });

    // Loop through the filtered product data and create HTML elements
    reviewProducts2.forEach((product) => {
      const productElement = document.createElement("a");
      productElement.className = "latest-product__item";
      productElement.href = "#";

      productElement.innerHTML = `
        <div class="latest-product__item__pic">
          <img src="img/product/${product.image}" alt="" />
        </div>
        <div class="latest-product__item__text">
          <h6>${product.name}</h6>
          <span>₱${product.price}</span>
        </div>
      `;

      reviewProductsContainer2.appendChild(productElement);
      // latestProductsContainer2.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Call the function to fetch and fill the product containers
fetchProductData();
