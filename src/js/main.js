import { Func } from "./mjs/alert.mjs";
import { loadHeaderFooter } from "./mjs/utils.mjs";

// import { superscript } from "./superscript.mjs";

loadHeaderFooter();
Func();
// const productCardTemplate = document.querySelector("[data-product-template]");
// const productCardContainer = document.querySelector("[data-product-cards-container]");
// const searchInput = document.querySelector("[data-search]");

// let products = [];

// searchInput.addEventListener("input", (e) => {
//     const value = e.target.value.toLowerCase();
//     products.forEach(product => {
//         if (product.Id !== "989CG" && product.Id !== "880RT") {
//             const isVisible = product.brand.toLowerCase().includes(value) || product.name.toLowerCase().includes(value);
//             product.element.classList.toggle("hide", !isVisible);
//         }
//     })
// })

// fetch("/json/tents.json")
//     .then(res => res.json())
//     .then(data => {
//         products = data.map(product => {
//             let percentageOff = ((product.SuggestedRetailPrice - product.FinalPrice) /
//             product.SuggestedRetailPrice) * 100;
//             const card = productCardTemplate.content.cloneNode(true).children[0];
//             const brand = card.querySelector("[data-brand]");
//             const name = card.querySelector("[data-name]");
//             const discount = card.querySelector("[data-discount]");
//             const price = card.querySelector("[data-price]");
//             const retailPrice = card.querySelector("[data-retail-price]");
//             const image = card.querySelector("[data-image]");
//             const link = card.querySelector("[data-link]");
//             brand.textContent = product.Brand.Name;
//             name.textContent = product.NameWithoutBrand;
//             discount.textContent = -percentageOff.toFixed(0) + "%";
//             price.textContent = "$" + product.FinalPrice;
//             retailPrice.textContent = "$" + product.SuggestedRetailPrice.toFixed(2);
//             image.src = product.Image.toString();
//             image.alt = product.Name.toString();
//             link.href = "product_pages/index.html?product=" + product.Id;
//             if (product.Id === "989CG" || product.Id === "880RT") {
//                 card.classList.add("hide");
//             }

//             productCardContainer.append(card);
//             return { brand: product.Brand.Name, name: product.NameWithoutBrand, Id: product.Id, element: card }
//         })
//     })

// superscript();
