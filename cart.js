export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function syncCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

window.addEventListener("pageshow", syncCart);
window.addEventListener("storage", syncCart);

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function increaseQuantity(productId) {
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += 1;
  }

  saveToStorage();
}
export function decreaseQuantity(productId) {
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }

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
  saveToStorage();
}
export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);

  saveToStorage();
}
