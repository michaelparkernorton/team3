import { getLocalStorage, setLocalStorage} from './utils.mjs';
import { findProductById } from './productData.mjs';
import { superscript } from './superscript.mjs';

let product = {};

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document.getElementById('addToCart').addEventListener('click', addToCart);
}

export function renderProductDetails() {
  document.querySelector('#productName').innerText = product.Brand.Name;
  document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
  document.querySelector('#productImage').src = product.Image;
  document.querySelector('#productImage').alt = product.Name;
  let percentageOff = (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100;
  document.querySelector('#productDiscount').innerText = '-' + percentageOff.toFixed(0) + '%';
  document.querySelector('#productFinalPrice').innerText = '$' + product.FinalPrice;
  document.querySelector('#productSuggestedRetailPrice').innerText = '$' + product.SuggestedRetailPrice.toFixed(2);
  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
}



// const cart = document.getElementById('cart');

// function cartChange(){
//   cart.classList.add('added');

//   setTimeout(() => {
//     cart.classList.remove('added');
//   }, 5000);
// }

function addToCart() {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);// push new item into the array
    // TODO: update existing cart item
  setLocalStorage('so-cart', cartItems);
  // cartChange();
}
// document.getElementById('addToCart').addEventListener('click', addToCart);

superscript();