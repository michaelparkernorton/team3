   import jwt_decode from 'jwt-decode';
import { getLocalStorage } from './utils.mjs';
   const baseURL = import.meta.env.VITE_SERVER_URL;
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw {name: 'servicesError', message: data};
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const userToken = getLocalStorage('so-token');

  const headers = {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json',
  }

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  };
  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
}

export async function loginRequest(user){
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + 'login', options).then(convertToJson);
  return response.accessToken;
};