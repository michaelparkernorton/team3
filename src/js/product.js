import { getParam } from "./mjs/utils.mjs";
import productDetails from "./mjs/productDetails.mjs";
import { loadHeaderFooter } from "./mjs/utils.mjs";
import { cartChange } from "./mjs/cartChange.mjs";

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);
cartChange();
