// User account data
const userAccount = {
    "id": 1,
    "firstName": "Mark",
    "lastName": "Smith",
    "password": "password123",
    "email": "alice.smith@example.com",
    "phoneNumber": "1234567890",
    "birthday": "05/12/1990",
    "gender": "female"
}

// Get references to the "header__top__right__auth" elements
const logged_user_burger = document.querySelectorAll(".header__top__right__auth"); // Use querySelectorAll for multiple elements

// Create a new <a> element for the "nav" section
const a_nav = createAuthLink(userAccount);

// Iterate over each "header__top__right__auth" element to update them
logged_user_burger.forEach(element => {
    // Find and remove the existing <a> tag if it exists in each "header__top__right__auth" section
    const existingLinkBurger = element.querySelector("a");
    if (existingLinkBurger) {
        element.replaceChild(a_nav.cloneNode(true), existingLinkBurger); // Clone the new <a> element to avoid conflicts
    } else {
        element.appendChild(a_nav.cloneNode(true)); // Clone the new <a> element to avoid conflicts
    }
});

// Function to create a new <a> element for user authentication
function createAuthLink(user) {
    const a = document.createElement("a");
    a.href = "#";
    a.setAttribute("data-toggle", "modal");
    a.setAttribute("data-target", "#loginModal");
    a.innerHTML = `<i class="fa fa-user"></i> Hi ${user.firstName}`;
    return a;
}
