import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";


// products are being allow to be additionally added
// this is unnessary as there is a quanity feature
let cart = getLocalStorage("so-cart");
let product_added = false;

function addProductToCart(product) {
  if (!product_added) {
    cart.push(product);
    // console.log(cart);
    setLocalStorage("so-cart", cart);
    console.log(getLocalStorage("so-cart"));
    product_added = true;
  }
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
