import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: '',
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,  
    checkoutTotal: 0,

    init(key){
        this.key = key;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
    calculateItemSummary(){
        const summaryEl = document.querySelector('#subTotal');
        const itemNumElement = document.querySelector('#num-items');
        itemNumElement.innerText = this.list.length;
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryEl.innerText = '$' + this.itemTotal;
    },
    calculateOrderTotal(){
        this.shipping = 10 + (this.list.length - 1 ) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    },
    displayOrderTotals(){
        // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");
        const orderTotal = document.querySelector("#orderTotal");
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },
}

export default checkoutProcess;