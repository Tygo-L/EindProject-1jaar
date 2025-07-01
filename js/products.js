// The ProductManager class organizes all product - related logic for the webshop.
// It handles loading, filtering, searching, adding, updating, and deleting products, as well as saving changes to storage.
// By using this class, the code stays organized and makes it easy to manage products throughout the site.
// even een uitlegje van het internet omdat ik het anders vergeet.

class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.initialized = false;
    }

    async initialize() {
        this.products = window.storageManager.getProducts();
        this.filteredProducts = [...this.products];
        this.initialized = true;
        return this.products;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    addProduct(productData) {
        const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
        const newProduct = {
            id: newId,
            ...productData,
            price: parseFloat(productData.price)
        };
        this.products.push(newProduct);
        window.storageManager.saveProducts(this.products);
        this.applyFilters();
        return newProduct;
    }

    updateProduct(id, productData) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...productData,
                price: parseFloat(productData.price)
            };
            window.storageManager.saveProducts(this.products);
            this.applyFilters();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.products.splice(index, 1);
            window.storageManager.saveProducts(this.products);
            this.applyFilters();
            return true;
        }
        return false;
    }

    filterByGenre(genre) {
        this.currentFilter = genre;
        this.applyFilters();
    }

    search(term) {
        this.searchTerm = term.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            const matchesFilter = this.currentFilter === 'all' || product.genre === this.currentFilter;
            const matchesSearch = this.searchTerm === '' ||
                product.title.toLowerCase().includes(this.searchTerm) ||
                product.artist.toLowerCase().includes(this.searchTerm) ||
                product.genre.toLowerCase().includes(this.searchTerm);
            return matchesFilter && matchesSearch;
        });
    }

    getFilteredProducts() {
        return this.filteredProducts;
    }

    getRandomProduct() {
        const vinylProducts = this.products.filter(p => p.type === 'vinyl');
        if (vinylProducts.length === 0) return null;
        return vinylProducts[Math.floor(Math.random() * vinylProducts.length)];
    }

    async resetToOriginal() {
        await window.storageManager.resetToOriginal();
        this.products = window.storageManager.getProducts();
        this.applyFilters();
    }

    getStats() {
        const totalProducts = this.products.length;
        const totalValue = this.products.reduce((sum, product) => sum + product.price, 0);
        const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
        return {
            totalProducts,
            totalValue: totalValue.toFixed(2),
            avgPrice: avgPrice.toFixed(2)
        };
    }
}

window.productManager = new ProductManager();

async function loadProductsAndRender() {
    if (!window.productManager.initialized) {
        await window.productManager.initialize();
    }
}

document.addEventListener('DOMContentLoaded', loadProductsAndRender);