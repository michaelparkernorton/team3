
document.addEventListener('DOMContentLoaded', function() {
    const cart = document.querySelector('.cart'); 
  
    function cartChange() {
      if (cart) {
        cart.classList.add('added');
    
        setTimeout(() => {
          cart.classList.remove('added');
        }, 5000);
      }
    }
  
   
    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', cartChange);
    }
  });
  