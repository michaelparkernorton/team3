import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs'; 


export function productDetails(productID){

}

function renderProductDetails(){

}

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