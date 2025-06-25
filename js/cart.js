class CartManager {
    constructor() {
        this.cart = [];
        this.loadCart();
    }

    loadCart() {
        this.cart = window.storageManager.getCart();
    }


    addToCart(productId, quantity = 1) {
        const product = window.productManager.getProductById(productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                title: product.title,
                artist: product.artist,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartUI();
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    }

    getCartItems() {
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        window.storageManager.saveCart(this.cart);
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getCartItemCount();
        }

        const cartModal = document.getElementById('cartModal');
        if (cartModal && !cartModal.classList.contains('hidden')) {
            this.renderCartModal();
        }
    }

    renderCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItems || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-gray-500">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-mono font-bold">${item.title}</h4>
                    <p class="text-sm text-gray-600">${item.artist}</p>
                    <p class="font-bold">€${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" 
                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center font-mono">${item.quantity}</span>
                    <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})" 
                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <button onclick="cartManager.removeFromCart(${item.id})" 
                        class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        cartTotal.textContent = this.getCartTotal().toFixed(2);
    }

    checkout() {
        if (this.cart.some(item => item.quantity === 0)) {
            alert('Please make sure you have proper quantities for all items in your cart.');
            return;
        }

        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: [...this.cart],
            total: this.getCartTotal().toFixed(2),
            status: 'confirmed'
        };

        window.storageManager.addOrder(order);

        this.clearCart();

        window.location.href = 'confirmation.html';
    }
}

window.cartManager = new CartManager();