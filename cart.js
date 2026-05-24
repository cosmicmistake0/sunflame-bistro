export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    { productId: "coconut-rice-01", quantity: 2 },
    { productId: "icecream-01", quantity: 3 },
  ];
}
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

  if (item) {
    item.quantity -= 1;
  }

  saveToStorage();
}
export function addToCart(productId) {
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
