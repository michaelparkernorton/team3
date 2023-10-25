import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: '',
    outputSelector: '',
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,  
    checkoutTotal: 0,

    init(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },

    calculateItemSummary(){
        const summaryEl = document.querySelector(' #subTotal');
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryEl.innerText = '$' + this.itemTotal;
        console.log(this.itemTotal);
    },
    // calculateOrderTotal(){
    // this.shipping = 10 + (2 * itemCount);
    //     this.tax = subTotal * .06;
    //     this.checkoutTotal = (subTotal + this.shipping + this.tax)
    // }
}

export default checkoutProcess;