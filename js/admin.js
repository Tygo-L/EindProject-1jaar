class AdminManager {
    constructor() {
        this.currentEditingId = null;
        this.initializeAdmin();
    }

    initializeAdmin() {
        this.loadDashboardStats();
        this.loadAdminProducts();
        this.setupEventListeners();
    }

    loadDashboardStats() {
        const stats = window.productManager.getStats();
        const orders = window.storageManager.getOrders();
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);

        document.getElementById('totalProducts').textContent = stats.totalProducts;
        document.getElementById('totalOrders').textContent = orders.length;
        document.getElementById('totalRevenue').textContent = '€' + totalRevenue.toFixed(2);
        document.getElementById('avgPrice').textContent = stats.avgPrice;
    }

    async loadAdminProducts() {
        const products = await this.getAdminProducts();
        const grid = document.getElementById('adminProductsGrid');

        if (!grid) return;

        if (products.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center text-vinyl-cream text-xl">No products found</div>';
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="bg-white rounded-lg p-4 shadow-md">
                <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover rounded mb-3">
                <h3 class="font-mono font-bold text-sm mb-1">${product.title}</h3>
                <p class="text-xs text-gray-600 mb-1">${product.artist}</p>
                <p class="text-xs text-gray-500 mb-2">${product.genre} • ${product.year}</p>
                <p class="font-bold text-vinyl-orange mb-3">€${product.price.toFixed(2)}</p>
                <div class="flex gap-2">
                    <button onclick="adminManager.editProduct(${product.id})" 
                            class="flex-1 bg-vinyl-mint hover:bg-vinyl-mint/80 text-vinyl-brown px-3 py-1 rounded text-xs font-mono">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                    <button onclick="adminManager.deleteProduct(${product.id})" 
                            class="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-mono">
                        <i class="fas fa-trash mr-1"></i>Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('addProductBtn')?.addEventListener('click', () => {
            this.showProductForm();
        });

        document.getElementById('resetDataBtn')?.addEventListener('click', async () => {
            if (confirm('Are you sure you want to reset all products to original data? This cannot be undone.')) {
                await window.productManager.resetToOriginal();
                await this.loadAdminProducts();
                this.loadDashboardStats();
                alert('Data has been reset to original!');
            }
        });

        document.getElementById('viewOrdersBtn')?.addEventListener('click', () => {
            const viewOrdersBtn = document.getElementById('ordersSection');
            viewOrdersBtn.scrollIntoView({ behavior: 'smooth' });
            this.toggleOrdersSection();
        });

        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.hideProductForm();
        });

        document.getElementById('cancelBtn')?.addEventListener('click', () => {
            this.hideProductForm();
        });

        document.getElementById('productForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('toggleProductsBtn')?.addEventListener('click', () => {
            const section = document.getElementById('manageProductsSection');
            if (section) {
                section.classList.toggle('hidden');
            }
        });
    }

    showProductForm(productId = null) {
        this.currentEditingId = productId;
        const modal = document.getElementById('productFormModal');
        const title = document.getElementById('modalTitle');

        if (productId) {
            const product = window.productManager.getProductById(productId);
            title.textContent = 'Edit Product';
            this.populateForm(product);
        } else {
            title.textContent = 'Add Product';
            this.clearForm();
        }

        modal.classList.remove('hidden');
    }

    hideProductForm() {
        document.getElementById('productFormModal').classList.add('hidden');
        this.currentEditingId = null;
    }

    populateForm(product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productArtist').value = product.artist;
        document.getElementById('productGenre').value = product.genre;
        document.getElementById('productYear').value = product.year;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productFact').value = product.fact || '';
    }

    clearForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    }

    saveProduct() {
        const formData = {
            title: document.getElementById('productTitle').value,
            artist: document.getElementById('productArtist').value,
            genre: document.getElementById('productGenre').value,
            year: parseInt(document.getElementById('productYear').value),
            price: parseFloat(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value,
            fact: document.getElementById('productFact').value,
            type: document.getElementById('productGenre').value === 'Accessory' ? 'accessory' : 'vinyl'
        };

        if (this.currentEditingId) {
            window.productManager.updateProduct(this.currentEditingId, formData);
        } else {
            window.productManager.addProduct(formData);
        }

        this.hideProductForm();
        this.loadAdminProducts();
        this.loadDashboardStats();
    }

    editProduct(id) {
        this.showProductForm(id);
    }

    deleteProduct(id) {
        const product = window.productManager.getProductById(id);
        if (confirm(`Are you sure you want to delete "${product.title}" by ${product.artist}?`)) {
            window.productManager.deleteProduct(id);
            this.loadAdminProducts();
            this.loadDashboardStats();
        }
    }

    toggleOrdersSection() {
        const section = document.getElementById('ordersSection');
        if (section.classList.contains('hidden')) {
            this.loadOrders();
            section.classList.remove('hidden');
        }
    }

    loadOrders() {
        const orders = window.storageManager.getOrders();
        const ordersList = document.getElementById('ordersList');

        if (orders.length === 0) {
            ordersList.innerHTML = '<p class="text-center text-gray-500">No orders yet</p>';
            return;
        }

        ordersList.innerHTML = orders.reverse().map(order => `
            <div class="bg-white rounded-lg p-4 shadow-md">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-mono font-bold">Order ${order.id}</h3>
                        <p class="text-sm text-gray-600">${new Date(order.date).toLocaleString()}</p>
                    </div>
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                        ${order.status}
                    </span>
                </div>
                <div class="space-y-1 mb-3">
                    ${order.items.map(item => `
                        <div class="flex justify-between text-sm">
                            <span>${item.title} by ${item.artist} (x${item.quantity})</span>
                            <span>€${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="border-t pt-2">
                    <div class="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>€${order.total}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async getAdminProducts() {
        if (window.productManager && window.productManager.getAllProducts) {
            return window.productManager.getAllProducts();
        }
        return [];
    }
}

async function getAdminProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        return data.products;
    } catch (e) {
        if (window.productManager && window.productManager.getAllProducts) {
            return window.productManager.getAllProducts();
        }
        return [];
    }
}

async function updateDashboardStats() {
    const products = await getAdminProducts();
    const totalProducts = products.length;
    const statsElement = document.getElementById('dashboardTotalProducts');
    if (statsElement) {
        statsElement.textContent = totalProducts;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.productManager && !window.productManager.initialized) {
        await window.productManager.initialize();
    }
    if (document.getElementById('adminProductsGrid')) {
        window.adminManager = new AdminManager();
    }
    updateDashboardStats();
});