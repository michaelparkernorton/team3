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
    superscript.innerText = cartItems.length;
    cart.append(superscript);
  } else {
    superscript.style.display = "none";
    cart.append(superscript);
  }
}
