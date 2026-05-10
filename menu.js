import { menuItems } from "./menuitems.js";

function menuProduct(name, image, price) {
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
                <button class="cta-gold">Add to Cart</button>
              </div>
            </div>
          </div>
  `;
}
function render(products = []) {
  const menuDom = document.querySelector(".menu-items-container");
  menuDom.innerHTML = products
    .map((p) => menuProduct(p.name, p.image, p.price))
    .join("");
}
render(menuItems);
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

featured.addEventListener("click", () => featuredFilter());

food.addEventListener("click", () => filterType("food"));

drinks.addEventListener("click", () => filterType("drinks"));

dessert.addEventListener("click", () => filterType("dessert"));

snacks.addEventListener("click", () => filterType("snacks"));
all.addEventListener("click", () => render(menuItems));
