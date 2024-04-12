const mixitContainer = document.getElementById("mixit-container");

async function fetchProductData() {
  try {
    // Fetch product data from the specified URL
    const response = await fetch("http://localhost:3030/products");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    // Loop through the product data and create HTML elements
    data.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-lg-3 col-md-4 col-sm-6 mix " + product.category;
      col.innerHTML = `
        <div class="featured__item">
          <div class="featured__item__pic">
            <img src="img/product/${product.image}" alt="Product Image" />
            <ul class="featured__item__pic__hover">
              <li id="myfavorite">
                <a href="#"><i class="fa fa-heart"></i></a>
              </li>
              <li id="myretweet">
                <a href="./shop-details.html"><i class="fa fa-search"></i></a>
              </li>
              <li id="mycart${product.id}">
                <a href="#"><i class="fa fa-shopping-cart"></i></a>
              </li>
            </ul>
          </div>
          <div class="featured__item__text">
            <h6><a href="./shop-details.html">${product.name}</a></h6>
            <h5>₱${product.price}</h5>
          </div>
        </div>
      `;

      // Add click event listeners to the list items
      const favoriteIcon = col.querySelector("#myfavorite");
      const retweetIcon = col.querySelector("#myretweet");
      const cartIcon = col.querySelector(`#mycart${product.id}`);

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
        const productId = product.id;
        const productUrl = `http://localhost:3030/products/${productId}`;
        const shoppingCartUrl = `http://localhost:3030/shoppingcart/`;
    
        // Define an object to store the data
        const productData = {};
    
        // First, fetch the product data
        fetch(productUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch product data');
                }
            })
            .then(data => {
                // Save the received data to the productData object
                Object.assign(productData, data);
    
                // Now you can use the productData object to work with the data
                console.log('Product Data:', productData);
    
                // Check if the item is already in the shopping cart
                fetch(shoppingCartUrl + productId)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            // If the item is not in the shopping cart, create a new entry
                            return { quantity: 0 };
                        }
                    })
                    .then(cartItemData => {
                        // Increment the quantity or set it to 1
                        cartItemData.quantity = (cartItemData.quantity || 0) + 1;
                        productData.quantity = cartItemData.quantity;
    
                        // If the item was not in the cart, create a new entry (POST request)
                        if (cartItemData.quantity === 1) {
                            fetch(shoppingCartUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(productData)
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Product added to the shopping cart.');
                                } else {
                                    throw new Error('Failed to add product to the shopping cart');
                                }
                            })
                            .catch(error => {
                                console.error('Error adding product to the shopping cart:', error);
                            });
                        } else {
                            // If the item was already in the cart, update the entry (PUT request)
                            fetch(shoppingCartUrl + productId, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(productData)
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Product quantity updated in the shopping cart.');
                                } else {
                                    throw new Error('Failed to update product quantity in the shopping cart');
                                }
                            })
                            .catch(error => {
                                console.error('Error updating product quantity in the shopping cart:', error);
                            });
                        }
                    })
                    .then(() => {
                        // Get new data from the shopping cart
                        fetch(shoppingCartUrl)
                            .then(response => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error('Failed to fetch shopping cart data');
                                }
                            })
                            .then(newCartData => {
                                addProductToBag(newCartData)
                                
                                // Refresh the page
                                window.location.reload();

                                console.log('New Shopping Cart Data:', newCartData);
                                // Do something with the updated shopping cart data
                            })
                            .catch(error => {
                                console.error('Error fetching shopping cart data:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error checking shopping cart:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    
        alert(`${product.name} has been added to your shopping cart.`);
      });
    

      mixitContainer.appendChild(col);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Call the function to fetch and fill the product containers
fetchProductData();
