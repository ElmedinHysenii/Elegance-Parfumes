let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Add product to cart (or increase quantity if it already exists)
function addToCart(product) {
  const existingIndex = cartItems.findIndex((item) => item.id === product.id);
  if (existingIndex !== -1) {
    cartItems[existingIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  saveCart();
  alert(`${product.name} added to cart!`);
}

// Remove item from cart by index
function removeFromCart(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateCart(); // Update the cart UI if on cart page
}

// Update quantity of item at index
function updateQuantity(index, quantity) {
  if (quantity >= 1) {
    cartItems[index].quantity = quantity;
    saveCart();
    updateCart();
  }
}

// Clear entire cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cartItems = [];
    saveCart();
    updateCart();
  }
}

//add check out option later on

// Update the cart UI (only works if cart page has these elements)
function updateCart() {
  const tbody = document.getElementById("cart-body");
  if (!tbody) return; // Exit if no cart table on page

  tbody.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="cart-item"><img src="${item.image}" alt="${
      item.name
    }" style="height:80px;width:80px;object-fit:cover;border-radius:8px;"></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input
          type="number"
          min="1"
          value="${item.quantity}"
          class="form-control form-control-sm quantity-input"
          data-index="${index}"
        >
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  const totalElement = document.getElementById("total");
  if (totalElement) totalElement.textContent = total.toFixed(2);

  // Attach event listeners for quantity inputs
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const i = e.target.getAttribute("data-index");
      const newQty = parseInt(e.target.value);
      if (newQty >= 1) {
        updateQuantity(i, newQty);
      } else {
        e.target.value = cartItems[i].quantity; // reset invalid input
      }
    });
  });

  // Attach event listeners for remove buttons
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const i = button.getAttribute("data-index");
      removeFromCart(i);
    });
  });
}

// Initialize cart UI on cart page load
window.addEventListener("load", () => {
  updateCart();
});
