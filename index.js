import { favItems } from "./favitems.js";

import { cart, addToCart } from "./cart.js";

function favProduct(name, image, price, id) {
  return `
    <div class="fav-card">
      <div class="fav-image">
        <img src="${image}" alt="">
      </div>

      <div class="fav-text">
        <div class="fav-name"><p>${name}</p></div>
        <div class="fav-price">Price: ₦${price}</div>
        <div class="fav-cta">
          <button class="cta-gold add-to-cart" data-product-id="${id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

export function render(products = []) {
  const favDom = document.querySelector(".fav-product-list");

  favDom.innerHTML = products
    .map((p) => favProduct(p.name, p.image, p.price, p.id))
    .join("");
  favDom.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      addToCart(productId);

      console.log(cart);
    });
  });
}

render(favItems);
