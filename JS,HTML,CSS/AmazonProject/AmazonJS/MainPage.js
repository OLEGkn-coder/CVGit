import {Products} from './Product.js';
import {cart} from './CartData.js';
function renderProducts(){
let productHTML = '';
Products.forEach((Products) => {
  productHTML += `
   <div class = "Goods-section">
   <div class = "Goods-imgane">
    <img class = "Goods-img" src = "${Products.image}">
    </div>
    <div class = "Goods-name">
    <p class = "Name">${Products.name}</p>
    </div>
    <div class = "Goods-rating">
    <img class = "Rating-img" src="ratings/rating-${Products.rating.stars * 10}.png">
    <p class = "Rating">${Products.rating.count}</p>
    </div>
    <div class = "Goods-price">
    <p class = "Price">$${(Products.priceCent / 100).toFixed(2)}</p>
    </div>
    <div class = "Quantity">
    <select class = "Quantity-select-${Products.id}" data-testid = "${Products.id}">
     ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
    </select>
    </div>
    <div class = "Message-text">
    <div class = "Message-${Products.id}" data-testid = "${Products.id}">
    </div>
  </div>
  <div class = "Cart-button">
  <button class = "Add-To-Cart" id = "AddToCart" data-product-id = "${Products.id}">Add to cart</button>
  </div>
  </div> `;
})
document.querySelector('.Main-section').innerHTML = productHTML;
}; renderProducts();


function AddToCart(){
document.querySelectorAll('.Add-To-Cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = event.target.dataset.productId;
    hideMessage(productId);
    const quantitySelector = document.querySelector(`.Quantity-select-${productId}`);
    const quantity = parseInt(quantitySelector.value, 10) || 1;
    let matchingItem = cart.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity
      });
     }
    updateCartCount();
   });
 });
}; AddToCart();


function hideMessage(productId) {
  const Message = document.querySelector(`.Message-${productId}`);
  Message.classList.add("Message-js"); 
if(Message){
  Message.innerHTML = 
    `<img class = "Added-img" src="IconsAndLogo/checkmark.png">
    <p class = "Added-text">Added</p>`;
  Message.style.display = "flex";
  clearTimeout(Message.hideTimeout);
Message.hideTimeout = setTimeout(() => {
Message.style.display = "none";
  }, 3000);
 }
}


function updateCartCount() {
const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('.Cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalQuantity;
    } else {
      console.error("Cart count element not found");
  }
}
