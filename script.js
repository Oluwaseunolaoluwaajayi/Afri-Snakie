// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.getAttribute('data-item');
    const price = parseFloat(button.getAttribute('data-price'));
    const cartItem = cart.find(i => i.item === item);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ item, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  });
});

// Render cart
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartSection = document.getElementById('cart');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.item} (x${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
      <button onclick="removeFromCart('${item.item}')">Remove</button>
    `;
    cartItems.appendChild(itemDiv);
  });
  cartTotal.textContent = total.toFixed(2);
  cartSection.classList.remove('hidden');
}

// Remove from cart
function removeFromCart(itemName) {
  cart = cart.filter(item => item.item !== itemName);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initialize cart
renderCart();

document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Order placed successfully! Thank you for your purchase.');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'index.html';
});
// Proceed to Checkout
document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty! Please add items before proceeding to checkout.');
    return;
  }
  window.location.href = 'checkout.html';
});
// Display cart summary on checkout page
if (document.getElementById('cart-summary')) {
  const cartSummary = document.getElementById('cart-summary');
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.item} (x${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
    `;
    cartSummary.appendChild(itemDiv);
  });
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  cartSummary.appendChild(totalDiv);

  // If cart is empty, redirect back to menu
  if (cart.length === 0) {
    alert('Your cart is empty! Redirecting to menu.');
    window.location.href = 'menu.html';
  }
}
// Hamburger menu toggle
const toggle = document.getElementById('toggle');
const nav = document.querySelector('.nav-right');

toggle.addEventListener('change', () => {
  nav.style.display = toggle.checked ? 'block' : 'none';
});

// Close menu when a link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.checked = false;
    nav.style.display = 'none';
  });
});