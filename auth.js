// Authentication system
const auth = {
    // Register a new user
    register(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, message: 'Tous les champs sont requis.' };
        }
        if (password.length < 6) {
            return { success: false, message: 'Le mot de passe doit contenir au moins 6 caractères.' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: 'Adresse email invalide.' };
        }

        const users = storage.getUsers();
        if (users[email]) {
            return { success: false, message: 'Un compte existe déjà avec cet email.' };
        }

        const hashedPassword = btoa(password); // NOTE: btoa is base64 encoding, NOT encryption.
        // This is a client-side demo only – never store passwords this way in a real app.
        users[email] = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            portfolio: {
                bio: '',
                github: '',
                linkedin: '',
                twitter: '',
                discord: '',
                projects: [],
                skills: []
            }
        };

        storage.saveUsers(users);
        storage.saveCurrentUser(email);
        return { success: true, message: 'Compte créé avec succès !' };
    },

    // Login an existing user
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Email et mot de passe requis.' };
        }

        const users = storage.getUsers();
        const user = users[email];

        if (!user) {
            return { success: false, message: 'Aucun compte trouvé avec cet email.' };
        }

        const hashedPassword = btoa(password);
        if (user.password !== hashedPassword) {
            return { success: false, message: 'Mot de passe incorrect.' };
        }

        storage.saveCurrentUser(email);
        return { success: true, message: 'Connexion réussie !' };
    },

    // Logout the current user
    logout() {
        storage.clearCurrentUser();
    },

    // Check if a user is currently logged in
    isLoggedIn() {
        return !!storage.getCurrentUser();
    },

    // Get the currently logged-in user's data
    getCurrentUserData() {
        const email = storage.getCurrentUser();
        if (!email) return null;
        return storage.getUserData(email);
    }
};

