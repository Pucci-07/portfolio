// LocalStorage management
const storage = {
    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },

    load(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },

    // Portfolio-specific helpers
    getUsers() {
        return this.load('jojo_users') || {};
    },

    saveUsers(users) {
        return this.save('jojo_users', users);
    },

    getCurrentUser() {
        return this.load('jojo_current_user');
    },

    saveCurrentUser(email) {
        return this.save('jojo_current_user', email);
    },

    clearCurrentUser() {
        return this.remove('jojo_current_user');
    },

    getUserData(email) {
        const users = this.getUsers();
        return users[email] || null;
    },

    saveUserData(email, data) {
        const users = this.getUsers();
        users[email] = { ...users[email], ...data };
        return this.saveUsers(users);
    },

    getPortfolioData(email) {
        const user = this.getUserData(email);
        return user ? user.portfolio || {} : {};
    },

    savePortfolioData(email, portfolioData) {
        return this.saveUserData(email, { portfolio: portfolioData });
    }
};

