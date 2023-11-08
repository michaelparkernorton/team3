import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { superscript } from "./superscript.mjs";
import { doc } from "prettier";

let product = {};
const colorTemplate = document.querySelector("[color-template]");
const colorsContainer = document.querySelector("[colors-container]");
const buttons = document.querySelectorAll("[data-carousel-button]");
let displayImage = document.querySelector("#productImage");
let images = [];

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  product.Colors[0].Selected = true;
  for (let index = 1; index < product.Colors.length; index++) {
    const element = product.Colors[index];
    product.Colors[index].Selected = false;
  }
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

export function renderProductDetails() {
  document.querySelector("#category-name").innerHTML = product.Category;
  document.querySelector("#link").href =
    "../product-list/index.html?category=" + product.Category;
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;

  // ------------ Display Image and Carousel -----------------------------------
  images.push(product.Images.PrimaryLarge)
  displayImage.src = images[0];

  if (product.Images.ExtraImages != null){
    buttons.forEach(button => {
      button.style.display = "inline";
    });
    product.Images.ExtraImages.forEach(image => {
      images.push(image.Src);
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      let newIndex = images.indexOf(displayImage.src) + offset;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      displayImage.src = images[newIndex];
    })
  })
  // ------------ Display Image and Carousel -----------------------------------
  
  document.querySelector("#productImage").alt = product.Name;
  let percentageOff =
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
    100;
  document.querySelector("#productDiscount").innerText =
    "-" + percentageOff.toFixed(0) + "%";
  document.querySelector("#productFinalPrice").innerText =
    "$" + product.FinalPrice;
  document.querySelector("#productSuggestedRetailPrice").innerText =
    "$" + product.SuggestedRetailPrice.toFixed(2);
  const colors = product.Colors.map((color) => color.ColorChipImageSrc);
  colors.forEach((color, index) => {
    const card = colorTemplate.content.cloneNode(true).children[0];
    card.src = color;
    card.id = index;
    card.addEventListener("click", function () {
      select(card);
    });
    colorsContainer.append(card);
  });
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
}

function select(element) {
  let pictureSwitch = product.Colors[element.id].ColorPreviewImageSrc;
  document.querySelector("#productImage").src = pictureSwitch;
  product.Colors.forEach((element) => {
    element.Selected = false;
  });
  product.Colors[element.id].Selected = true;
}

function addToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  superscript();
}

