import {
  cart,
  syncCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cart.js";

import { menuItems } from "./menuitems.js";

// RENDER CART

function renderCart() {
  let shoppingCart = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = menuItems.find(
      (product) => product.id === productId,
    );

    shoppingCart += `
  <div class="item">

    <div class="image-checkout">
      <img src="${matchingProduct.image}" alt="${matchingProduct.name}" />
    </div>

    <div class="name-checkout">
      <h2>${matchingProduct.name}</h2>
    </div>

    <div class="totPrice">
      ₦${matchingProduct.price}
    </div>

    <div class="quantity">
      <button
        class="add-quantity"
        data-product-id="${matchingProduct.id}">
        +
      </button>

      <p class="quantity-${matchingProduct.id}">
        ${cartItem.quantity}
      </p>

      <button
        class="subtract-quantity"
        data-product-id="${matchingProduct.id}">
        -
      </button>
    </div>

    <div class="delete-checkout">
      <button
        data-product-id="${matchingProduct.id}"
        class="delete-item">
        x
      </button>
    </div>

  </div>
`;
  });

  document.querySelector(".shopping-cart").innerHTML = shoppingCart;

  updateSubtotal();

  // WHATSAPP INTEGRATION

  const orderForm = document.getElementById("orderForm");

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const orderNote = document.getElementById("orderNote").value;

    let message = `Hello, I'd like to place an order from SunFlame Bistro.\n\n`;

    message += `CUSTOMER DETAILS\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${customerPhone}\n`;
    message += `Address: ${customerAddress}\n`;

    if (orderNote) {
      message += `Note: ${orderNote}\n`;
    }

    message += `\nORDER DETAILS\n`;

    let total = 0;

    cart.forEach((cartItem) => {
      const matchingProduct = menuItems.find(
        (product) => product.id === cartItem.productId,
      );

      const itemTotal = matchingProduct.price * cartItem.quantity;

      total += itemTotal;

      message += `${cartItem.quantity} × ${matchingProduct.name} — ₦${itemTotal.toLocaleString()}\n`;
    });

    message += `\nTotal: ₦${total.toLocaleString()}`;

    const phoneNumber = "2348162952666";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  });

  // PLUS BUTTON

  document.querySelectorAll(".add-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      increaseQuantity(productId);

      const item = cart.find((cartItem) => cartItem.productId === productId);

      const quantityElement = document.querySelector(`.quantity-${productId}`);

      quantityElement.textContent = item.quantity;

      updateSubtotal();
    });
  });

  // MINUS BUTTON

  document.querySelectorAll(".subtract-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      decreaseQuantity(productId);

      const item = cart.find((cartItem) => cartItem.productId === productId);

      const quantityElement = document.querySelector(`.quantity-${productId}`);

      quantityElement.textContent = item.quantity;

      updateSubtotal();
    });
  });

  // DELETE BUTTON

  document.querySelectorAll(".delete-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      removeFromCart(productId);

      renderCart();
    });
  });
}

// SUBTOTAL

export function updateSubtotal() {
  let subTotal = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = menuItems.find(
      (product) => product.id === cartItem.productId,
    );

    subTotal += cartItem.quantity * matchingProduct.price;
  });

  document.querySelector(".subtotal-number").textContent = `₦${subTotal}`;
}

// INITIAL RENDER

renderCart();

// HANDLE BACK / FORWARD

window.addEventListener("pageshow", () => {
  renderCart();
});
