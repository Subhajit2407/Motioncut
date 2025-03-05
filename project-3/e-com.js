document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
      {
        id: 1,
        name: "Popular Shoe Trends",
        price: 25000.00,
        color: "white",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        backgroundColor: "#ff7a45"
      },
      {
        id: 2,
        name: "Popular Shoe Trends",
        price: 30000.00,
        color: "yellow",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        backgroundColor: "#5c50e4"
      },
      {
        id: 3,
        name: "Popular Shoe Trends",
        price: 40000.00,
        color: "blue",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        backgroundColor: "#00b96b"
      },
      {
        id: 4,
        name: "Popular Shoe Trends",
        price: 35000.00,
        color: "blue",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        backgroundColor: "#00b96b"
      },
      {
        id: 5,
        name: "Popular Shoe Trends",
        price: 25000.00,
        color: "white",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        backgroundColor: "#ff7a45"
      },
      {
        id: 6,
        name: "Popular Shoe Trends",
        price: 30000.00,
        color: "yellow",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        backgroundColor: "#5c50e4"
      }
    ];
  
    // Cart functionality
    let cartCount = 3;
    const cartCountElement = document.querySelector('.cart-count');
  
    function updateCartCount() {
      cartCountElement.textContent = cartCount;
    }
  
    function addToCart() {
      cartCount++;
      updateCartCount();
    }
  
    // Render products
    const productGrid = document.getElementById('product-grid');
    
    function renderProducts() {
      productGrid.innerHTML = '';
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
          <div class="product-actions">
            <button class="action-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
            </button>
          </div>
          <div class="cart-action">
            <button class="action-btn add-to-cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
          <div class="product-image-container" style="background-color: ${product.backgroundColor}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">Rs.${product.price.toFixed(2)}</p>
          </div>
        `;
        
        productGrid.appendChild(productCard);
        
        // Add event listener to the add to cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', addToCart);
      });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-options');
    
    sortSelect.addEventListener('change', function() {
      const sortOption = this.value;
      
      switch(sortOption) {
        case 'Sort by price: low to high':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'Sort by price: high to low':
          products.sort((a, b) => b.price - a.price);
          break;
        default:
          // Default sorting (by id)
          products.sort((a, b) => a.id - b.id);
      }
      
      renderProducts();
    });
    
    // Initial render
    renderProducts();
  });