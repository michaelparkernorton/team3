import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { superscript } from "./superscript.mjs";
import { doc } from "prettier";

let product = {};
const colorTemplate = document.querySelector("[color-template]");
const colorsContainer = document.querySelector(
  "[colors-container]"
);

// document.querySelector("#link")

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}


export function renderProductDetails() {

  document.querySelector("#category-name").innerHTML = product.Category;
  document.querySelector("#link").href =
    "../product-list/index.html?category=" + product.Category;
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
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

    console.log(product.Colors);
    const colors = product.Colors.map((color) => [color.ColorName, color.ColorChipImageSrc]);
    colors.forEach((color, index) => {
      // console.log(color);
      // console.log(index);
      const card = colorTemplate.content.cloneNode(true).children[0];
      // console.log(card);
      card.innerText = color[0];
      card.id = index;
      // console.log(card.id);
      card.addEventListener("click", function(){select(card)});
      
      if (index == 0) {
        card.classList.add("selected");
      }
      colorsContainer.append(card);
      // console.log(card);
            
    });

  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;

}



function select(element) {
  let allcards = document.querySelectorAll(".product__color");
  allcards.forEach(element => {
    console.log(element);
    element.classList.remove("selected");
  });
  element.classList.add("selected");
  let pictureSwitch = product.Colors[element.id].ColorPreviewImageSrc
  document.querySelector("#productImage").src = pictureSwitch;
  console.log(element.id);
  // console.log(allcards);
  // allcards.classList.toggle("selected");
  // console.log(element);
}

// const cart = document.getElementById('cart');

// function cartChange(){
//   cart.classList.add('added');

//   setTimeout(() => {
//     cart.classList.remove('added');
//   }, 5000);
// }

function addToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product); // push new item into the array
  setLocalStorage("so-cart", cartItems);
  // cartChange();
  superscript();
}
// document.getElementById('addToCart').addEventListener('click', addToCart);
