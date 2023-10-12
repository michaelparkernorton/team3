import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
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
    <span class='cart-card__remove' data-id=''>Delete</span>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// function renderCartContents() {
//     const cartItems = getLocalStorage('so-cart') || [];
//     // Set an item = to 0 so you can add to it
//     let subTotal = 0;
//     let itemsInCart = cartItems.length;
//     // for loop just adds all Final Prices together in cartItems
//     for (let i = 0; i < itemsInCart; i++) {
//       const price = cartItems[i].FinalPrice;
//       subTotal += price
//     }
//     //check if cartItems is an array before mapping
//     if (cartItems.length > 0) {
//       // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//       const htmlItems = cartItems.map(cartItemTemplate);

//       document.querySelector('.product-list').innerHTML = htmlItems.join('');
//       // Displays cart total
//       // TODO I want this element centered, or at least shifted to the left a little. It may look better that way.
//       document.querySelector('.cart-total').innerHTML = 'Cart Total: $' + subTotal;
//     } else {
//     document.querySelector('.product-list').innerHTML = 'Your cart is empty.';
//     document.querySelector('.cart-total').style.display = 'none';
//     }
//   }

//   renderCartContents();
