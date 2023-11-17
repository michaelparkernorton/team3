// This file needed to be created in order to avoid bugs that
// were created by adding this function to any other file.

import { getLocalStorage } from "./utils.mjs";

export function superscript() {
  const cart = document.querySelector(".cart");
  // This creates an HTML element
  const superscript = document.createElement("span");
  // This adds a class name to the added HTML element
  superscript.className = "superscript";
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length > 0) {
    //! I tried to get the superscript to change based on the quantity of
    //! items, but was unable to.
    // var test = 0;
    // for(let i = 0; i < cartItems.length; i++)
    // {
          // test + cartItems[i].Quantity;
    //   console.log(cartItems[i].Quantity)
    // }
    superscript.innerText = cartItems.length;
    cart.append(superscript);
  } else {
    superscript.style.display = "none";
    cart.append(superscript);
  }
}
