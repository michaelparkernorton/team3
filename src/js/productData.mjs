const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
  // const response = await fetch(`http://server-nodejs.cit.byui.edu:3000/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// baseURL + `product/${id}`
export async function findProductById(id) {
  // const products = await getData();
  const response = await fetch(baseURL + `/product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
  // console.log(products);
  // const product = products.find((item) => item.Id === id);
  // // console.log(product);
  // return products.find((item) => item.Id === id);
  // return products.find(baseURL + `product/${id}`);
}
