// Visual effects – JoJo stand animations, particles, shimmer

// Create a particle explosion at (x, y)
function createParticles(x, y, count = 8) {
    const colors = ['#FFD700', '#FF1493', '#00BFFF', '#FF6B35', '#90EE90', '#DA70D6'];
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'jojo-particle';
        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            --dx: ${(Math.random() - 0.5) * 120}px;
            --dy: ${(Math.random() - 0.5) * 120}px;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// Apply a "stand activated" flash to an element
function applyEffect(element, effect) {
    if (!element) return;
    element.classList.add(effect);
    setTimeout(() => element.classList.remove(effect), 1000);
}

// Shimmer effect on skill bars
function triggerShimmer() {
    document.querySelectorAll('.skill-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('shimmer'), i * 80);
        setTimeout(() => card.classList.remove('shimmer'), i * 80 + 800);
    });
}

// Add "ORA ORA" text burst at cursor on click (30% chance)
function initClickEffects() {
    const phrases = ['ORA!', 'MUDA!', 'WRYYY!', 'KONO DIO DA!', 'ZA WARUDO!', 'YARE YARE'];
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.30) return; // 30% chance
        createParticles(e.clientX, e.clientY);

        const text = document.createElement('div');
        text.className = 'ora-text';
        text.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        text.style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`;
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 800);
    });
}

// Animate elements on scroll (intersection observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Golden wind effect – floating stars in hero
function initGoldenWind() {
    const hero = document.getElementById('home');
    if (!hero) return;
    const colors = ['#FFD700', '#FFA500', '#FFEC8B', '#fff'];
    for (let i = 0; i < 18; i++) {
        const star = document.createElement('div');
        star.className = 'golden-star';
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${4 + Math.random() * 6}px;
            height: ${4 + Math.random() * 6}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-delay: ${Math.random() * 4}s;
            animation-duration: ${3 + Math.random() * 3}s;
        `;
        hero.appendChild(star);
    }
}

