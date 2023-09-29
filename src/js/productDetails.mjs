import { getLocalStorage, setLocalStorage} from './utils.mjs';
import { findProductById } from './productData.mjs';

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
  document.querySelector('#productFinalPrice').innerText = product.FinalPrice;
  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  // console.log(product);
}

function addToCart() {
  const cartItems = getLocalStorage('so-cart') || [];
  if (cartItems.length > 0) {
    cartItems.push(product);// push new item into the array
    // TODO: update existing cart item
  } else {
    cartItems.push(product);// push new item into the array
  }

    setLocalStorage('so-cart', cartItems);
 
}