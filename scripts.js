document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission logic
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("alertBox");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alertBox.classList.remove("d-none");
      form.reset();
      setTimeout(() => alertBox.classList.add("d-none"), 5000);
    });
  }

  // Add to Cart functionality
  const buttons = document.querySelectorAll(".add-to-cart");

  function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert(`${product.name} has been added to your cart.`);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
      };

      addToCart(product);
    });
  });
});
