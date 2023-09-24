import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let cart = getLocalStorage("so-cart")
// The below line logs out all data points affiliated with this specific item
// console.log(cart)
let cartItems = [];

function addProductToCart(product) {
  cartItems.push(product);
  // The below line logs out all data points affiliated with this specific item
  // console.log(cartItems);
  setLocalStorage("so-cart", product);
  console.log(getLocalStorage("so-cart"));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
