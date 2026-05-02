// Main app initialization and orchestration

document.addEventListener('DOMContentLoaded', () => {
    if (auth.isLoggedIn()) {
        showPortfolio();
    } else {
        showAuth();
    }
});

// ─── AUTH SECTION ────────────────────────────────────────────────────────────

function showAuth() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('portfolio-section').classList.add('hidden');
    showLoginForm();
}

function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('auth-title').textContent = '✨ Connexion';
}

function showRegisterForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('auth-title').textContent = '🌟 Inscription';
}

// Attach auth form handlers
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const result = auth.login(email, password);
    if (result.success) {
        showToast(result.message, 'success');
        showPortfolio();
    } else {
        showToast(result.message, 'error');
    }
});

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const result = auth.register(name, email, password);
    if (result.success) {
        showToast(result.message, 'success');
        showPortfolio();
    } else {
        showToast(result.message, 'error');
    }
});

document.getElementById('show-register')?.addEventListener('click', showRegisterForm);
document.getElementById('show-login')?.addEventListener('click', showLoginForm);

document.getElementById('logout-btn')?.addEventListener('click', () => {
    auth.logout();
    showAuth();
    showToast('Déconnecté !', 'info');
});

// ─── PORTFOLIO SECTION ───────────────────────────────────────────────────────

function showPortfolio() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('portfolio-section').classList.remove('hidden');

    const userData = auth.getCurrentUserData();
    if (userData) {
        document.getElementById('welcome-name').textContent = userData.name || 'Visiteur';
        loadPortfolioData(userData);
    }

    renderTimeline();
    initGoldenWind();
    initScrollAnimations();
    initClickEffects();
    initNav();
    initProfileForm();
    initProjectForm();
    initSkillForm();
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function initNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.section;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            scrollToSection(target);
        });
    });

    // Highlight active nav on scroll
    const sections = document.querySelectorAll('.portfolio-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.toggle('active', l.dataset.section === entry.target.id);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
}

// ─── PROFILE FORM ────────────────────────────────────────────────────────────

function initProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    const email = storage.getCurrentUser();
    const data = storage.getPortfolioData(email);

    // Pre-fill
    ['bio', 'github', 'linkedin', 'twitter', 'discord'].forEach(field => {
        const el = document.getElementById(`profile-${field}`);
        if (el && data[field]) el.value = data[field];
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {};
        ['bio', 'github', 'linkedin', 'twitter', 'discord'].forEach(field => {
            const el = document.getElementById(`profile-${field}`);
            if (el) updated[field] = el.value.trim();
        });
        const portfolio = storage.getPortfolioData(email);
        storage.savePortfolioData(email, { ...portfolio, ...updated });
        renderSocialLinks({ ...portfolio, ...updated });
        showToast('Profil sauvegardé ! 🌟', 'success');
        applyEffect(form, 'stand-flash');
    });
}

function renderSocialLinks(data) {
    const container = document.getElementById('social-links');
    if (!container) return;
    const links = [
        { key: 'github', label: 'GitHub', icon: '🐙' },
        { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { key: 'twitter', label: 'Twitter', icon: '🐦' },
        { key: 'discord', label: 'Discord', icon: '💬' }
    ];
    container.innerHTML = links
        .filter(l => data[l.key])
        .map(l => `<a href="${escapeHtml(data[l.key])}" target="_blank" rel="noopener" class="social-link">${l.icon} ${l.label}</a>`)
        .join('');
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function initProjectForm() {
    const form = document.getElementById('project-form');
    if (!form) return;

    const email = storage.getCurrentUser();
    renderProjects(storage.getPortfolioData(email).projects || []);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('proj-title').value.trim();
        const description = document.getElementById('proj-desc').value.trim();
        const tech = document.getElementById('proj-tech').value.trim();
        const link = document.getElementById('proj-link').value.trim();

        if (!title) { showToast('Le titre est requis.', 'error'); return; }

        const portfolio = storage.getPortfolioData(email);
        const projects = portfolio.projects || [];
        projects.push({ id: generateId(), title, description, tech, link });
        storage.savePortfolioData(email, { ...portfolio, projects });
        renderProjects(projects);
        form.reset();
        showToast('Projet ajouté ! 💎', 'success');
    });

    // Delete project
    document.getElementById('projects-list')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-delete')) {
            const id = e.target.dataset.id;
            const portfolio = storage.getPortfolioData(email);
            portfolio.projects = (portfolio.projects || []).filter(p => p.id !== id);
            storage.savePortfolioData(email, portfolio);
            renderProjects(portfolio.projects);
            showToast('Projet supprimé.', 'info');
        }
    });
}

function renderProjects(projects) {
    const list = document.getElementById('projects-list');
    if (!list) return;
    if (!projects.length) {
        list.innerHTML = '<p class="empty-state">Aucun projet pour l\'instant. Ajoutez-en un !</p>';
        return;
    }
    list.innerHTML = '';
    projects.forEach(p => list.appendChild(createProjectCard(p)));
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function initSkillForm() {
    const form = document.getElementById('skill-form');
    if (!form) return;

    const email = storage.getCurrentUser();
    renderSkills(storage.getPortfolioData(email).skills || []);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('skill-name').value.trim();
        const level = document.getElementById('skill-level').value;

        if (!name) { showToast('Le nom de la compétence est requis.', 'error'); return; }

        const portfolio = storage.getPortfolioData(email);
        const skills = portfolio.skills || [];
        skills.push({ id: generateId(), name, level });
        storage.savePortfolioData(email, { ...portfolio, skills });
        renderSkills(skills);
        form.reset();
        showToast('Compétence ajoutée ! ⭐', 'success');
        setTimeout(triggerShimmer, 100);
    });

    // Delete skill
    document.getElementById('skills-list')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-delete')) {
            const id = e.target.dataset.id;
            const portfolio = storage.getPortfolioData(email);
            portfolio.skills = (portfolio.skills || []).filter(s => s.id !== id);
            storage.savePortfolioData(email, portfolio);
            renderSkills(portfolio.skills);
            showToast('Compétence supprimée.', 'info');
        }
    });
}

function renderSkills(skills) {
    const list = document.getElementById('skills-list');
    if (!list) return;
    if (!skills.length) {
        list.innerHTML = '<p class="empty-state">Aucune compétence pour l\'instant. Ajoutez-en une !</p>';
        return;
    }
    list.innerHTML = '';
    skills.forEach(s => list.appendChild(createSkillCard(s)));
}

// ─── LOAD ALL DATA ────────────────────────────────────────────────────────────

function loadPortfolioData(userData) {
    const data = userData.portfolio || {};
    renderSocialLinks(data);
    renderProjects(data.projects || []);
    renderSkills(data.skills || []);

    // Pre-fill bio display
    const bioEl = document.getElementById('bio-display');
    if (bioEl && data.bio) bioEl.textContent = data.bio;
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message envoyé ! (simulation) 📨', 'success');
    e.target.reset();
});

