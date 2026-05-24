import {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cart.js";
import { menuItems } from "./menuitems.js";
let shoppingCart = "";

cart.forEach((cartItem) => {
  console.log(cartItem.productId);
  console.log(menuItems);
  const productId = cartItem.productId;
  let matchingProduct;
  menuItems.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  console.log("cart product id:", productId);
  console.log("matching product:", matchingProduct);
  shoppingCart += `
  <div class="item item-container-${matchingProduct.id}">
    <div class="image-checkout">
      <img src="${matchingProduct.image}">
    </div>

    <div class="name-checkout">
      <h2>${matchingProduct.name}</h2>
    </div>

    <div class="totPrice">
      ₦${matchingProduct.price}
    </div>

    <div class="quantity">
      <button class="add-quantity"
        data-product-id="${matchingProduct.id}">
        +
      </button>

      <p class="quantity-${matchingProduct.id}">
        ${cartItem.quantity}
      </p>

      <button class="subtract-quantity"
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
console.log(shoppingCart);
document.querySelectorAll(".delete-item").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    removeFromCart(productId);
    console.log(cart);
    const container = document.querySelector(`.item-container-${productId}`);
    container.remove();
  });
});
document.querySelectorAll(".add-quantity").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    increaseQuantity(productId);

    const item = cart.find((cartItem) => cartItem.productId === productId);

    const quantityElement = document.querySelector(`.quantity-${productId}`);

    quantityElement.textContent = item.quantity;
  });
});
document.querySelectorAll(".subtract-quantity").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    decreaseQuantity(productId);
    const item = cart.find((cartItem) => cartItem.productId === productId);

    const quantityElement = document.querySelector(`.quantity-${productId}`);

    quantityElement.textContent = item.quantity;
  });
});
