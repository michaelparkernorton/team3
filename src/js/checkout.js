import checkoutProcess from './checkoutProcess.mjs';

checkoutProcess.init('so-cart');

document.querySelector("#zcode").addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));