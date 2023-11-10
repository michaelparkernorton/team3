import { loadHeaderFooter, getParam } from "./mjs/utils.mjs";
import { login } from "./mjs/auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

const form = document
  .querySelector("#loginButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    // const formData = new FormData(form)
    // for (const pair of formData.entries()){
    //     console.log(pair)
    // }
    login({ email, password }, redirect);
  });
