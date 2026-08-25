export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function syncCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartQuantity();
}

window.addEventListener("pageshow", syncCart);
window.addEventListener("storage", syncCart);

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function updateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector(".cart-quantity-display");

  if (cartQuantityElement) {
    cartQuantityElement.textContent = totalQuantity;
  }
}
document.addEventListener("DOMContentLoaded", updateCartQuantity);
export function increaseQuantity(productId) {
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += 1;
  }
  updateCartQuantity();
  saveToStorage();
}
export function decreaseQuantity(productId) {
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
  updateCartQuantity();
  saveToStorage();
}

export function addToCart(productId) {
  console.log("ADDING:", productId);

  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  updateCartQuantity();
  saveToStorage();
}
export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  updateCartQuantity();
  saveToStorage();
}
