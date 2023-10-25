// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function renderWithTemplate(
  templateFn,
  parentEl,
  data,
  callback,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentEl.innerHTML = '';
  }
  const htmlText = await templateFn(data);

  parentEl.insertAdjacentHTML(position, htmlText);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate('/partials/header.html');
  const footerTemplateFn = loadTemplate('/partials/footer.html');

  const headerEl = document.querySelector('#main-header');
  const footerEl = document.querySelector('#main-footer');
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}

// export async function removeItem(productId){
//   try {
//   const cartIndex = shoppingCart.findIndex((item) => item.id === productId);
//   if (cartIndex !== -1){
//     cartIndex.splice(cartIndex, 1);
//     return { success: true, message: "Item removed from the cart"};
//   } else{
//     return { success: false, message: "Item not found in the cart"};
//   }
//   }
//   catch (error) {
//     return {success: false, message: "An error occurred while attempting to remove item."}
//   }
// }