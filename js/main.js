document.addEventListener('DOMContentLoaded', async function () {
    await window.productManager.initialize();
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    loadRandomPick();
    window.cartManager.updateCartUI();
}

function loadProducts() {
    const products = window.productManager.getFilteredProducts();
    const grid = document.getElementById('productsGrid');

    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-vinyl-cream text-xl">No products found</div>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div class="relative mb-4">
                <img src="${product.image.startsWith('svg/') ? '../' + product.image : product.image}" alt="${product.title}" 
                     class="w-full h-64 object-cover rounded-lg cursor-pointer"
                     onclick="showProductDetail(${product.id})">
                <div class="absolute top-2 right-2">
                    <span class="bg-vinyl-orange text-white px-2 py-1 rounded-full text-xs font-mono">
                        ${product.type === 'vinyl' ? '🎵' : '🔧'}
                    </span>
                </div>
            </div>
            
            <div class="space-y-2">
                <h3 class="font-mono text-lg font-bold text-vinyl-brown cursor-pointer hover:text-vinyl-orange"
                    onclick="showProductDetail(${product.id})">${product.title}</h3>
                <p class="text-vinyl-brown/70 font-medium">${product.artist}</p>
                <div class="flex justify-between items-center text-sm">
                    <span class="bg-vinyl-mint/20 text-vinyl-brown px-2 py-1 rounded-full font-mono">
                        ${product.genre}
                    </span>
                    <span class="text-vinyl-brown/60 font-mono">${product.year}</span>
                </div>
                <p class="text-vinyl-brown/80 text-sm line-clamp-2">${product.description}</p>
            </div>
            
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-vinyl-brown/10">
                <span class="text-2xl font-bold text-vinyl-orange">€${product.price.toFixed(2)}</span>
                <button onclick="addToCart(${product.id})" 
                        class="cassette-btn px-4 py-2 rounded-lg font-mono hover:scale-105 transition-transform">
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
            <div class="flex mt-2 text-xs text-vinyl-brown/60">
                <p class="justify-end">${product.amount === 0 ?
            `<span class="text-red-500">Sold out</span>` :
            product.amount < 5 ?
                `<span class="text-orange-500">Almost sold out (${product.amount} left)</span>` :
                `<span class="text-green-500">In stock</span>`
        }</p>
            </div>
            ${product.fact ? `
                <div class="mt-3 p-3 bg-vinyl-ochre/10 rounded-lg">
                    <p class="text-xs text-vinyl-brown/80">
                        <i class="fas fa-lightbulb mr-1 text-vinyl-ochre"></i>
                        <strong>Did you know?</strong> ${product.fact}
                    </p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const grid = document.getElementById('productsGrid');
            if (grid) {
                grid.scrollIntoView({ behavior: 'smooth' });
            }

            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-vinyl-orange', 'text-white'));
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) {
                allBtn.click();
            }

            window.productManager.search(e.target.value);
            loadProducts();
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-vinyl-orange', 'text-white'));
            this.classList.add('bg-vinyl-orange', 'text-white');

            const filter = this.dataset.filter;
            window.productManager.filterByGenre(filter);
            loadProducts();
        });
    });

    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', function () {
            window.cartManager.renderCartModal();
            cartModal.classList.remove('hidden');
        });
    }

    if (closeCart && cartModal) {
        closeCart.addEventListener('click', function () {
            cartModal.classList.add('hidden');
        });
    }

    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkout');

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            window.cartManager.clearCart();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            window.cartManager.checkout();
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
            document.querySelectorAll('.fixed.inset-0').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
}

function addToCart(productId) {
    const success = window.cartManager.addToCart(productId);
    if (success) {
        showNotification('Added to cart! 🎵', 'success');
    }
}

function showProductDetail(productId) {
    const product = window.productManager.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const content = document.getElementById('productModalContent');

    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <h2 class="font-retro text-3xl text-vinyl-brown">${product.title}</h2>
            <button onclick="closeProductModal()" class="text-vinyl-brown hover:text-vinyl-orange">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div>
                <img src="${product.image.startsWith('svg/') ? '../' + product.image : product.image}" alt="${product.title}" 
                     class="w-full rounded-2xl shadow-lg">
            </div>
            
            <div class="space-y-4">
                <div>
                    <h3 class="font-mono text-xl text-vinyl-orange mb-2">${product.artist}</h3>
                    <div class="flex gap-4 text-sm mb-4">
                        <span class="bg-vinyl-mint/20 px-3 py-1 rounded-full font-mono">${product.genre}</span>
                        <span class="bg-vinyl-ochre/20 px-3 py-1 rounded-full font-mono">${product.year}</span>
                    </div>
                </div>
                
                <p class="text-vinyl-brown/80 leading-relaxed">${product.description}</p>
                
                ${product.fact ? `
                    <div class="bg-vinyl-ochre/10 p-4 rounded-lg">
                        <h4 class="font-mono text-vinyl-ochre mb-2">
                            <i class="fas fa-lightbulb mr-2"></i>Vinyl Fact
                        </h4>
                        <p class="text-vinyl-brown/80">${product.fact}</p>
                    </div>
                ` : ''}
                
                <div class="flex items-center justify-between pt-6 border-t">
                    <span class="text-4xl font-bold text-vinyl-orange">€${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id}); closeProductModal();" 
                            class="bg-vinyl-orange hover:bg-vinyl-ochre text-white px-8 py-3 rounded-lg font-mono text-lg">
                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function loadRandomPick() {
    const randomProduct = window.productManager.getRandomProduct();
    const content = document.getElementById('randomPickContent');

    if (randomProduct && content) {
        content.innerHTML = `
            <div class="text-center">
                <img src="${randomProduct.image.startsWith('svg/') ? '../' + randomProduct.image : randomProduct.image}" alt="${randomProduct.title}" 
                     class="w-24 h-24 mx-auto rounded-lg mb-3 cursor-pointer"
                     onclick="showProductDetail(${randomProduct.id})">
                <h4 class="font-mono font-bold cursor-pointer hover:text-vinyl-orange"
                    onclick="showProductDetail(${randomProduct.id})">${randomProduct.title}</h4>
                <p class="text-sm opacity-80">${randomProduct.artist}</p>
                <p class="text-vinyl-orange font-bold mt-2">€${randomProduct.price.toFixed(2)}</p>
            </div>
        `;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 left-4 z-50 px-6 py-3 rounded-lg font-mono text-white transform -translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
            'bg-vinyl-orange'
        }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('-translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('-translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}