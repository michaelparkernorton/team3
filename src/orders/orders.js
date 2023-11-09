// orders.js

import { checkLogin, getOrders } from '../js/externalServices.mjs';

// Function to display orders to the user
function displayOrders(orders) {
 
}

// Check if the user is logged in
const userToken = checkLogin();

if (userToken) {
  // If the user is authenticated, fetch and display the orders
  getOrders(userToken)
    .then((orders) => {
      displayOrders(orders);
    })
    .catch((error) => {
      console.error('Failed to retrieve orders:', error);
    });
}
