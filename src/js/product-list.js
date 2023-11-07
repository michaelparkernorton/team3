import { getParam, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import { doc } from "prettier";

const category = getParam("category");
productList(".product-list", category);

loadHeaderFooter();

const breadcrumbsCategoryName = document.querySelector("#category-name");
let breadcrumbsNumberOfItems = document.querySelector("#number-of-items");
breadcrumbsCategoryName.innerText = category;

const productCardTemplate = document.querySelector("[data-product-template]");
const productCardContainer = document.querySelector(
  "[data-product-cards-container]"
);
const searchInput = document.querySelector("[data-search]");
const header = document.querySelector("[data-header]");

header.textContent =
  "Top Products: " + category.toUpperCase().slice(0, 1) + category.slice(1);

let products = [];

let sortValue = "";

function removeChildren() {
  var arr = [].slice.call(productCardContainer.children);
  arr.forEach((child) => {
    productCardContainer.removeChild(child);
  });
}

document
  .querySelector("[data-price-low-high]")
  .addEventListener("click", function () {
    sortValue = "price-low-high";
    removeChildren();
    loadProducts(sortValue);
  });

document
  .querySelector("[data-price-high-low]")
  .addEventListener("click", function () {
    sortValue = "price-high-low";
    removeChildren();
    loadProducts(sortValue);
  });

document.querySelector("[data-name]").addEventListener("click", function () {
  sortValue = "name-lower-upper";
  removeChildren();
  loadProducts(sortValue);
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  products.forEach((product) => {
    if (product.Id !== "989CG" && product.Id !== "880RT") {
      const isVisible =
        product.brand.toLowerCase().includes(value) ||
        product.name.toLowerCase().includes(value);
      product.element.classList.toggle("hide", !isVisible);
    }
  });
});

const baseURL = import.meta.env.VITE_SERVER_URL;

function loadProducts(sortValue) {
  let numberOfItems = 0;
  fetch(baseURL + `products/search/${category}`)
    .then((res) => res.json())
    .then((data) => {
      let sortedProducts = data.Result;
      if (sortValue === "name-lower-upper") {
        sortedProducts = data.Result.sort((a, b) =>
          a.NameWithoutBrand.toLowerCase() > b.NameWithoutBrand.toLowerCase()
            ? 1
            : a.NameWithoutBrand.toLowerCase() <
              b.NameWithoutBrand.toLowerCase()
            ? -1
            : 0
        );
      } else if (sortValue === "name-upper-lower") {
        sortedProducts = data.Result.sort((a, b) =>
          a.NameWithoutBrand.toLowerCase() < b.NameWithoutBrand.toLowerCase()
            ? 1
            : a.NameWithoutBrand.toLowerCase() >
              b.NameWithoutBrand.toLowerCase()
            ? -1
            : 0
        );
      } else if (sortValue === "price-low-high") {
        sortedProducts = data.Result.sort((a, b) =>
          a.FinalPrice > b.FinalPrice ? 1 : a.FinalPrice < b.FinalPrice ? -1 : 0
        );
      } else if (sortValue === "price-high-low") {
        sortedProducts = data.Result.sort((a, b) =>
          a.FinalPrice < b.FinalPrice ? 1 : a.FinalPrice > b.FinalPrice ? -1 : 0
        );
      }
      products = sortedProducts.map((product) => {
        let percentageOff =
          ((product.SuggestedRetailPrice - product.FinalPrice) /
            product.SuggestedRetailPrice) *
          100;
        numberOfItems++;
        breadcrumbsNumberOfItems.innerText = numberOfItems;
        const card = productCardTemplate.content.cloneNode(true).children[0];
        const brand = card.querySelector("[data-brand]");
        const name = card.querySelector("[data-name]");
        const discount = card.querySelector("[data-discount]");
        const price = card.querySelector("[data-price]");
        const retailPrice = card.querySelector("[data-retail-price]");
        const image = card.querySelector("[data-image]");
        const link = card.querySelector("[data-link]");
        brand.textContent = product.Brand.Name;
        name.textContent = product.NameWithoutBrand;
        discount.textContent = -percentageOff.toFixed(0) + "%";
        price.textContent = "$" + product.FinalPrice;
        retailPrice.textContent = "$" + product.SuggestedRetailPrice.toFixed(2);
        image.src = product.Images.PrimaryMedium.toString();
        image.alt = product.Name.toString();
        link.href = "../product_pages/index.html?product=" + product.Id;
        if (product.Id === "989CG" || product.Id === "880RT") {
          card.classList.add("hide");
        }
        console.log(product);

        productCardContainer.append(card);
        return {
          brand: product.Brand.Name,
          name: product.NameWithoutBrand,
          Id: product.Id,
          element: card,
        };
      });
    });
}
loadProducts();
