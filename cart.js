const products = [
    { id: 1, name: 'Diamond Necklace', price: 1200.00, image: 'https://images.unsplash.com/photo-1611652032936-a7275939b829?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A beautiful diamond necklace that will make you shine.', category: 'Jewelry', brand: 'Chopard', rating: 4.5 },
    { id: 2, name: 'Sapphire Earrings', price: 850.00, image: 'https://images.unsplash.com/photo-1610202313156-38a833c2c482?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Elegant sapphire earrings that will add a touch of class to any outfit.', category: 'Jewelry', brand: 'Cartier', rating: 4.8 },
    { id: 3, name: 'Ruby Bracelet', price: 950.00, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A stunning ruby bracelet that will make a statement.', category: 'Jewelry', brand: 'Tiffany & Co.', rating: 4.7 },
    { id: 4, name: 'Classic Sneakers', price: 65.00, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b83775?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Comfortable and stylish sneakers for everyday wear.', category: 'Shoes', brand: 'Nike', rating: 4.2 },
    { id: 5, name: 'Gold Ring', price: 50.00, image: 'https://images.unsplash.com/photo-1585399001829-d84c6d75b47c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A simple yet elegant gold ring.', category: 'Jewelry', brand: 'Generic', rating: 4.0 },
    { id: 6, name: 'Sport Shoes', price: 80.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Durable and comfortable sport shoes for all your athletic needs.', category: 'Shoes', brand: 'Adidas', rating: 4.6 },
    { id: 7, name: 'Curly Lace Front', price: 70.00, image: 'https://images.unsplash.com/photo-1597248885539-32465f631d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A beautiful curly lace front wig.', category: 'Wigs', brand: 'Generic', rating: 4.1 },
    { id: 8, name: 'Smartphone', price: 999.00, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A powerful and feature-rich smartphone.', category: 'Phones', brand: 'Apple', rating: 4.9 },
    { id: 9, name: 'Leather Boots', price: 250.00, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Stylish and durable leather boots.', category: 'Shoes', brand: 'Dr. Martens', rating: 4.8 },
];

document.addEventListener('DOMContentLoaded', () => {
    const cart = {
        items: [],
        add(productId) {
            console.log('Adding product with ID:', productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                const cartItem = this.items.find(item => item.id === productId);
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    this.items.push({ ...product, quantity: 1 });
                }
                this.save();
                console.log('Cart items:', this.items);
            }
        },
        remove(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.save();
        },
        save() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        },
        load() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.items = JSON.parse(cartData);
            }
        },
        getTotal() {
            return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        getProductById(productId) {
            return products.find(p => p.id === productId);
        }
    };

    cart.load();

    window.cart = cart;
});
