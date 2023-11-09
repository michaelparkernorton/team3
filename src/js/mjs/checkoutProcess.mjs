import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from './utils.mjs';
import { checkout } from './externalServices.mjs';

// takes a form element and returns an object where the key is the 'name' of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  // Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: '',
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init(key) {
    this.key = key;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary() {
    const summaryEl = document.querySelector('#subTotal');
    const itemNumElement = document.querySelector('#num-items');
    itemNumElement.innerText = this.list.length;
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryEl.innerText = '$' + this.itemTotal;
  },
  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.querySelector('#shipping');
    const tax = document.querySelector('#tax');
    const orderTotal = document.querySelector('#orderTotal');
    shipping.innerText = '$' + this.shipping;
    tax.innerText = '$' + this.tax;
    orderTotal.innerText = '$' + this.orderTotal;
  },
  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart,
    // and the information entered into the form
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log('JSON: ' + json);
    // call the checkout method in our externalServices module and send it our data object.
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage('so-cart', []);
      location.assign('/checkout/success.html');
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  },
};

export default checkoutProcess;
