import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';
import { productDetails, renderProductDetails } from './productDetails.mjs';

const productId = getParam('product');
productDetails(productId);
// renderProductDetails();


function addProductToCart(product) {
  // get existing cart data from local storage
  let cart = getLocalStorage('so-cart');
  //if cart is empty, initialize as empty array
  if(!Array.isArray(cart)){
    cart = [];
  }
  //Add new product to cart
  cart.push(product);
  //Update cart in local storage
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
