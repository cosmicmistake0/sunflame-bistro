import { favItems } from "./favitems.js";

function favProduct(name, image, price) {
  return `
    <div class="fav-card">
      <div class="fav-image">
        <img src="${image}" alt="">
      </div>

      <div class="fav-text">
        <div class="fav-name"><p>${name}</p></div>
        <div class="fav-price">Price: ₦${price}</div>
        <div class="fav-cta">
          <button class="cta-gold">Order</button>
        </div>
      </div>
    </div>
  `;
}

function render(products = []) {
  const favDom = document.querySelector(".fav-product-list");

  favDom.innerHTML = products
    .map((p) => favProduct(p.name, p.image, p.price))
    .join("");
}

render(favItems);
