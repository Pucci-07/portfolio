// Reusable UI components

// Show a toast notification
function showToast(message, type = 'info') {
    const existing = document.querySelector('.jojo-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `jojo-toast jojo-toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('jojo-toast--visible'), 10);
    setTimeout(() => {
        toast.classList.remove('jojo-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Create a button element
function createButton(label, className = '', onClick = null) {
    const button = document.createElement('button');
    button.textContent = label;
    if (className) button.className = className;
    if (onClick) button.addEventListener('click', onClick);
    return button;
}

// Create a skill card element
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = `skill-card skill-card--${skill.level.toLowerCase()}`;
    card.dataset.id = skill.id;
    card.innerHTML = `
        <span class="skill-name">${escapeHtml(skill.name)}</span>
        <span class="skill-level">${escapeHtml(skill.level)}</span>
        <button class="btn-delete skill-delete" title="Supprimer" data-id="${skill.id}">✕</button>
    `;
    return card;
}

// Create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;

    const techTags = (project.tech || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join('');

    card.innerHTML = `
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <div class="project-tech">${techTags}</div>
        ${project.link ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener" class="project-link">Voir le projet →</a>` : ''}
        <button class="btn-delete project-delete" title="Supprimer" data-id="${project.id}">✕</button>
    `;
    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}

// Generate a unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Smooth scroll to a section
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

