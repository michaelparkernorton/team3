
document.addEventListener('DOMContentLoaded', function() {
    const cart = document.querySelector('.cart'); // Change the selector to match the class of your cart element
  
    function cartChange() {
      if (cart) {
        cart.classList.add('added');
    
        setTimeout(() => {
          cart.classList.remove('added');
        }, 5000);
      }
    }
  
    // Assuming there's a button with id "addToCart" that triggers the cartChange function
    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', cartChange);
    }
  });
  