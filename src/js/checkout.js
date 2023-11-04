import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrderTotal.bind(checkoutProcess)
  );

document.forms["checkout"].addEventListener("submit", (e) => {
  //  you will want to keep the form from doing what it would normally do on submit.
  // You can do this by calling event.preventDefault() in the listener function.
  e.preventDefault();
  // e.target contains our form
  checkoutProcess.checkout(e.target);
});
document.querySelector("#checkoutSubmit").addEventListener("submit", (e) => {
  e.preventDefault();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) checkoutProcess.checkout();
});
