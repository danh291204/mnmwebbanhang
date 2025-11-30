async function fetchProducts(){
  const res = await fetch('api/products.php');
  return res.json();
}

function formatPrice(v){ return '$' + Number(v).toFixed(2); }

function renderProducts(products){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('div'); el.className = 'product';
    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${formatPrice(p.price)}</div>
      <div>
        <button class="btn add" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    container.appendChild(el);
  });

  document.querySelectorAll('.btn.add').forEach(b => {
    b.addEventListener('click', async (ev) => {
      const id = ev.currentTarget.dataset.id;
      await addToCart(id, 1);
    });
  });
}

async function addToCart(product_id, qty=1){
  const res = await fetch('api/add_to_cart.php', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `product_id=${encodeURIComponent(product_id)}&qty=${encodeURIComponent(qty)}`
  });
  const data = await res.json();
  if (data.success){ updateCartCount(data.cart_count); }
  else alert(data.message || 'Could not add to cart');
}

async function fetchCart(){
  const res = await fetch('api/cart.php');
  return res.json();
}

function updateCartCount(n){ document.getElementById('cart-count').textContent = n; }

function renderCartModal(cart){
  const c = document.getElementById('cart-contents');
  c.innerHTML = '';
  if (!cart.items.length) { c.innerHTML = '<p>Your cart is empty.</p>'; document.getElementById('cart-total').textContent = ''; return; }
  cart.items.forEach(it => {
    const row = document.createElement('div'); row.className = 'cart-item';
    row.innerHTML = `
      <img src="${it.image}" alt="${it.name}">
      <div style="flex:1">
        <div><strong>${it.name}</strong></div>
        <div>${formatPrice(it.price)} × ${it.qty} = ${formatPrice(it.subtotal)}</div>
      </div>
    `;
    c.appendChild(row);
  });
  document.getElementById('cart-total').textContent = 'Total: ' + formatPrice(cart.total);
}

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);

  // cart button
  document.getElementById('view-cart').addEventListener('click', async ()=>{
    const cart = await fetchCart();
    renderCartModal(cart);
    document.getElementById('cart-modal').classList.remove('hidden');
    updateCartCount(cart.count || 0);
  });
  document.getElementById('close-cart').addEventListener('click', ()=>{
    document.getElementById('cart-modal').classList.add('hidden');
  });

  // initial count
  const cart = await fetchCart(); updateCartCount(cart.count || 0);
});
