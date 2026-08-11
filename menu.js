import { menuItems } from "./menuitems.js";
import { cart } from "./cart.js";
import { addToCart } from "./cart.js";
function menuProduct(name, image, price, id) {
  return `
     <div class="menu-card">
            <div class="menu-image">
              <img src="${image}" />
            </div>

            <div class="menu-text">
              <div class="menu-name">
                <p>${name}</p>
              </div>

              <div class="menu-price">Price: ₦${price}</div>

              <div class="menu-cta">
                <button class="cta-gold add-to-cart" data-product-id="${id}">Add to Cart</button>
              </div>
            </div>
          </div>
  `;
}

function render(products = []) {
  const menuDom = document.querySelector(".menu-items-container");

  if (!menuDom) return;

  menuDom.innerHTML = products;
  menuDom.innerHTML = products
    .map((p) => menuProduct(p.name, p.image, p.price, p.id))
    .join("");

  // add to cart button

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      button.textContent = "ADDED";

      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 700);

      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      console.log(cartQuantity);
      console.log(cart);
    });
  });
}

render(menuItems);
console.log("js running");
// for filter

let filterValue = "";
let filteredValues = [];
function filterType(val) {
  filterValue = val;

  let filteredValues = menuItems.filter((item) =>
    item.category.includes(filterValue),
  );

  render(filteredValues);
  console.log(filteredValues);
}
function featuredFilter() {
  filteredValues = menuItems.filter((item) => item.fav);
  console.log(filteredValues);

  render(filteredValues);
}
const featured = document.getElementById("featured");
const food = document.getElementById("food");
const drinks = document.getElementById("drinks");
const dessert = document.getElementById("dessert");
const snacks = document.getElementById("snacks");
const all = document.getElementById("all");

if (featured) featured.addEventListener("click", () => featuredFilter());
if (food) food.addEventListener("click", () => filterType("food"));
if (drinks) drinks.addEventListener("click", () => filterType("drinks"));
if (dessert) dessert.addEventListener("click", () => filterType("dessert"));
if (snacks) snacks.addEventListener("click", () => filterType("snacks"));
if (all) all.addEventListener("click", () => render(menuItems));
