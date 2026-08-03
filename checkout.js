import {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cart.js";
import { menuItems } from "./menuitems.js";
let shoppingCart = "";
let subTotal = 0;

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

  // let totPrice;

  // totPrice = cartItem.quantity * matchingProduct.price;
  // subTotal += totPrice;
  updateSubtotal();
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
console.log(`${subTotal}  this is it`);
document.querySelector(".shopping-cart").innerHTML = shoppingCart;
console.log(shoppingCart);
document.querySelectorAll(".delete-item").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    removeFromCart(productId);
    console.log(cart);
    const container = document.querySelector(`.item-container-${productId}`);
    container.remove();
    updateSubtotal();
  });
});
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
cart.forEach((item) => {
  item.quantity;
});
export function updateSubtotal() {
  let subTotal = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = menuItems.find((product) => {
      return product.id === cartItem.productId;
    });

    subTotal += cartItem.quantity * matchingProduct.price;
  });

  document.querySelector(".subtotal-number").textContent = `₦${subTotal}`;
}
