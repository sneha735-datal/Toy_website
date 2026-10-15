
const products = [
  {
    id: 1, name: "Teddy Bear", category: "Soft Toys",
    price: 499,
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2, name: "Toy Car", category: "Vehicles",
    price: 299,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3, name: "Building Blocks", category: "Educational",
    price: 399,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4, name: "Toy Train", category: "Vehicles",
    price: 599,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5, name: "Cute Plush Toy", category: "Soft Toys",
    price: 349,
    image: "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6, name: "Puzzle Game", category: "Games",
    price: 249,
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b821e3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7, name: "Learning Blocks", category: "Educational",
    price: 449,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8, name: "Playtime Toy", category: "Games",
    price: 199,
    image: "https://images.unsplash.com/photo-1560961911-ba7ef651a56c?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];

function renderProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search) &&
    (category === "All" || product.category === category)
  );

  document.getElementById("products").innerHTML = filtered.length
    ? filtered.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}"
             loading="lazy"
             onerror="this.onerror=null;this.src='https://placehold.co/500x350/fff0f4/ff6384?text=ToyJoy'">
        <div class="product-info">
          <small>${product.category}</small>
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button class="add-btn" onclick="addToCart(${product.id})">
            + Add to Cart
          </button>
        </div>
      </div>
    `).join("")
    : "<p>No toys found. Try another search!</p>";
}

function addToCart(id) {
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...products.find(p => p.id === id), quantity: 1 });
  }

  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);
}

function showCart() {
  document.getElementById("cart-modal").style.display = "flex";
  document.getElementById("message").textContent = "";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");

  if (!cart.length) {
    cartItems.innerHTML = "<p>Your cart is empty. Add some toys! 🧸</p>";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.quantity}
        </div>
        <div>
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("total").textContent = `Total: ₹${total}`;
}

function changeQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += change;
  cart = cart.filter(item => item.quantity > 0);

  updateCartCount();
  renderCart();
}

function checkout() {
  if (!cart.length) {
    document.getElementById("message").textContent =
      "Please add a toy to your cart first!";
    return;
  }

  document.getElementById("message").textContent =
    "Demo checkout only. No order or payment has been processed.";
}

renderProducts();
