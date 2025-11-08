document.addEventListener('DOMContentLoaded', () => {
    const user = {
        users: [],
        currentUser: null,
        signup(name, email, password) {
            const userExists = this.users.find(u => u.email === email);
            if (userExists) {
                return false;
            }
            const newUser = { name, email, password, orders: [], wishlist: [] };
            this.users.push(newUser);
            this.save();
            this.currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            return true;
        },
        login(email, password) {
            const user = this.users.find(u => u.email === email && u.password === password);
            if (user) {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
            return false;
        },
        logout() {
            this.currentUser = null;
            localStorage.removeItem('currentUser');
        },
        getCurrentUser() {
            if (!this.currentUser) {
                const user = localStorage.getItem('currentUser');
                if (user) {
                    this.currentUser = JSON.parse(user);
                }
            }
            return this.currentUser;
        },
        addToWishlist(productId) {
            if (this.currentUser) {
                if (!this.currentUser.wishlist.includes(productId)) {
                    this.currentUser.wishlist.push(productId);
                    this.updateUser(this.currentUser);
                }
            }
        },
        removeFromWishlist(productId) {
            if (this.currentUser) {
                this.currentUser.wishlist = this.currentUser.wishlist.filter(id => id !== productId);
                this.updateUser(this.currentUser);
            }
        },
        updateUser(user) {
            const index = this.users.findIndex(u => u.email === user.email);
            if (index !== -1) {
                this.users[index] = user;
                this.save();
            }
        },
        save() {
            localStorage.setItem('users', JSON.stringify(this.users));
            if (this.currentUser) {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        },
        load() {
            const users = localStorage.getItem('users');
            if (users) {
                this.users = JSON.parse(users);
            }
        }
    };

    user.load();
    user.getCurrentUser();

    window.user = user;
});