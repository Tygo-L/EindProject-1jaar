class StorageManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem('grooveSpinners_products')) {
            this.resetToOriginal();
        }
        if (!localStorage.getItem('grooveSpinners_cart')) {
            localStorage.setItem('grooveSpinners_cart', JSON.stringify([]));
        }
        if (!localStorage.getItem('grooveSpinners_orders')) {
            localStorage.setItem('grooveSpinners_orders', JSON.stringify([]));
        }
    }

    resetToOriginal() {
        const originalProducts = {
            "products": [
                {
                    "id": 1,
                    "title": "Abbey Road",
                    "artist": "The Beatles",
                    "genre": "Rock",
                    "year": 1969,
                    "price": 45.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "The Beatles' eleventh studio album and their final recorded album.",
                    "fact": "The famous crosswalk photo was taken outside Abbey Road Studios in London.",
                    "type": "vinyl"
                },
                {
                    "id": 2,
                    "title": "Kind of Blue",
                    "artist": "Miles Davis",
                    "genre": "Jazz",
                    "year": 1959,
                    "price": 52.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Regarded as one of the greatest jazz albums of all time.",
                    "fact": "Most of the album was recorded in just two sessions.",
                    "type": "vinyl"
                },
                {
                    "id": 3,
                    "title": "The Dark Side of the Moon",
                    "artist": "Pink Floyd",
                    "genre": "Rock",
                    "year": 1973,
                    "price": 48.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "A concept album exploring themes of conflict, greed, and mental illness.",
                    "fact": "It stayed on the Billboard 200 chart for 14 years.",
                    "type": "vinyl"
                },
                {
                    "id": 4,
                    "title": "Blue Train",
                    "artist": "John Coltrane",
                    "genre": "Jazz",
                    "year": 1957,
                    "price": 39.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Coltrane's only album as leader for Blue Note Records.",
                    "fact": "The title track became one of Coltrane's most famous compositions.",
                    "type": "vinyl"
                },
                {
                    "id": 5,
                    "title": "Highway 61 Revisited",
                    "artist": "Bob Dylan",
                    "genre": "Folk",
                    "year": 1965,
                    "price": 42.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Dylan's sixth studio album, featuring 'Like a Rolling Stone'.",
                    "fact": "This album marked Dylan's transition from folk to electric rock.",
                    "type": "vinyl"
                },
                {
                    "id": 6,
                    "title": "Born to Run",
                    "artist": "Bruce Springsteen",
                    "genre": "Rock",
                    "year": 1975,
                    "price": 44.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Springsteen's breakthrough album that made him a star.",
                    "fact": "The title track took six months to record and mix.",
                    "type": "vinyl"
                },
                {
                    "id": 7,
                    "title": "Muddy Waters at Newport 1960",
                    "artist": "Muddy Waters",
                    "genre": "Blues",
                    "year": 1960,
                    "price": 38.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Live recording from the Newport Jazz Festival.",
                    "fact": "This performance helped introduce blues to white audiences.",
                    "type": "vinyl"
                },
                {
                    "id": 8,
                    "title": "Selected Ambient Works 85-92",
                    "artist": "Aphex Twin",
                    "genre": "Electronic",
                    "year": 1992,
                    "price": 41.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Pioneering ambient electronic music album.",
                    "fact": "Many tracks were recorded when Richard D. James was just a teenager.",
                    "type": "vinyl"
                },
                {
                    "id": 9,
                    "title": "Harvest",
                    "artist": "Neil Young",
                    "genre": "Folk",
                    "year": 1972,
                    "price": 43.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Young's most commercially successful album.",
                    "fact": "Features the hit single 'Heart of Gold', Young's only #1 hit.",
                    "type": "vinyl"
                },
                {
                    "id": 10,
                    "title": "Bitches Brew",
                    "artist": "Miles Davis",
                    "genre": "Jazz",
                    "year": 1970,
                    "price": 49.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Groundbreaking fusion of jazz and rock elements.",
                    "fact": "The album was recorded in just three sessions over three days.",
                    "type": "vinyl"
                },
                {
                    "id": 11,
                    "title": "The Velvet Underground & Nico",
                    "artist": "The Velvet Underground",
                    "genre": "Rock",
                    "year": 1967,
                    "price": 46.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Influential debut album with Andy Warhol's banana cover.",
                    "fact": "The original pressing had a peelable banana sticker on the cover.",
                    "type": "vinyl"
                },
                {
                    "id": 12,
                    "title": "Ambient 1: Music for Airports",
                    "artist": "Brian Eno",
                    "genre": "Electronic",
                    "year": 1978,
                    "price": 37.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "The first album in Eno's ambient series.",
                    "fact": "Designed to be continuously looped as a sound installation.",
                    "type": "vinyl"
                },
                {
                    "id": 13,
                    "title": "Turntable",
                    "artist": "Audio-Technica",
                    "genre": "Accessory",
                    "year": 2023,
                    "price": 299.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Professional belt-drive turntable for vinyl enthusiasts.",
                    "fact": "Features anti-resonance platter for superior sound quality.",
                    "type": "accessory"
                },
                {
                    "id": 14,
                    "title": "Vinyl Cleaning Kit",
                    "artist": "GrooveSpinners",
                    "genre": "Accessory",
                    "year": 2023,
                    "price": 24.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Complete cleaning solution for your vinyl collection.",
                    "fact": "Includes anti-static brush and cleaning solution.",
                    "type": "accessory"
                },
                {
                    "id": 15,
                    "title": "Record Storage Crate",
                    "artist": "GrooveSpinners",
                    "genre": "Accessory",
                    "year": 2023,
                    "price": 49.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Wooden crate for storing up to 50 vinyl records.",
                    "fact": "Made from sustainable bamboo wood.",
                    "type": "accessory"
                },
                {
                    "id": 16,
                    "title": "Stylus Replacement",
                    "artist": "Audio-Technica",
                    "genre": "Accessory",
                    "year": 2023,
                    "price": 89.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "High-quality replacement stylus for turntables.",
                    "fact": "Diamond tip provides over 1000 hours of playing time.",
                    "type": "accessory"
                },
                {
                    "id": 17,
                    "title": "Vinyl Record Sleeves (50 pack)",
                    "artist": "GrooveSpinners",
                    "genre": "Accessory",
                    "year": 2023,
                    "price": 19.99,
                    "image": "/placeholder.svg?height=300&width=300",
                    "description": "Anti-static inner sleeves to protect your vinyl.",
                    "fact": "Made from rice paper to prevent scratching.",
                    "type": "accessory"
                }
            ]
        };

        localStorage.setItem('grooveSpinners_products', JSON.stringify(originalProducts.products));
    }

    getProducts() {
        const products = localStorage.getItem('grooveSpinners_products');
        if (products) return JSON.parse(products);
        return [];
    }

    saveProducts(products) {
        localStorage.setItem('grooveSpinners_products', JSON.stringify(products));
    }

    async resetToOriginal() {
        try {
            let data = null;
            await fetch('data/products.json')
                .then(res => res.json())
                .then(json => data = json);
            this.saveProducts(data.products);

            return data.products;
        } catch (e) {
            console.error('Failed to reset products:', e);
        }
    }

    getCart() {
        return JSON.parse(localStorage.getItem('grooveSpinners_cart') || '[]');
    }

    saveCart(cart) {
        localStorage.setItem('grooveSpinners_cart', JSON.stringify(cart));
    }

    getOrders() {
        const orders = localStorage.getItem('orders');
        return orders ? JSON.parse(orders) : [];
    }

    saveOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    addOrder(order) {
        const orders = this.getOrders();
        orders.push(order);
        this.saveOrders(orders);

        localStorage.setItem('lastOrder', JSON.stringify(order));
    }

    clearCart() {
        this.saveCart([]);
    }
}

window.storageManager = new StorageManager();