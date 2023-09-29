import { getLocalStorage } from './utils.mjs';
// import { } from '../../dist/images'; 

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  // Set an item = to 0 so you can add to it
  let subTotal = 0;
  // for loop just adds all Final Prices together in cartItems
  for (let i = 0; i < cartItems.length; i++) {
    const price = cartItems[i].FinalPrice;
    subTotal+=price
  }
  //check if cartItems is an array before mapping
  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    // Displays cart total
    // TODO I want this element centered, or at least shifted to the left a little. It may look better that way.
    document.querySelector('.cart-total').innerHTML = 'Cart Total: $' + subTotal;
  } else {
  document.querySelector('.product-list').innerHTML = 'Your cart is empty.';
  document.querySelector('.cart-total').innerHTML = '';
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
