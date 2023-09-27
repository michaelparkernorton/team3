import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs'; 


export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  // add a listener to Add to Cart button
  const findItem = await findProductById(productId);
  return findItem.find
}

// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }

export function renderProductDetails(){
  const productName = document.querySelector('productName');
  productName.innerHTML = "Ajax";
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