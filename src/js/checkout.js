import checkoutProcess from './checkoutProcess.mjs';

checkoutProcess.init('so-cart');

document.querySelector("#zcode").addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

document.forms["checkout"].addEventListener("submit", (e) => {
    //  you will want to keep the form from doing what it would normally do on submit. 
    // You can do this by calling event.preventDefault() in the listener function.
    e.preventDefault();
    // e.target contains our form
    checkoutProcess.checkout(e.target);
})