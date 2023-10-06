import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
	let percentageOff = (product.SuggestedRetailPrice-product.FinalPrice)/product.SuggestedRetailPrice * 100;
	const newProduct = `<li class="product-card">
		<a href="product_pages/index.html?product=${product.Id}">
		<img
			src="${product.Image}"
			alt="${product.Name}"
		/>
		<h3 class="card__brand">${product.Brand.Name}</h3>
		<h2 class="card__name">${product.NameWithoutBrand}</h2>
		<p class="product-card__discount">-${percentageOff.toFixed(0)}%</p></a>
		<p class="product-card__price">$${product.FinalPrice}</p>
		<p class="product-card__retail-price">$${product.SuggestedRetailPrice.toFixed(2)}</p></a>
	</li>`;

	return newProduct;
}

export default async function productList(selector, category){
	// get the element we will insert the list into from the selector
	const el = document.querySelector(selector);
  // get the list of products 
	const list = await getData(category);
  // render out the product list to the element
	renderListWithTemplate(productCardTemplate, el, list,"afterbegin");
}


