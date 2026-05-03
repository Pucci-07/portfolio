/* ============================================================
   main.js — JoJo Portfolio — App Initialisation & Interactions
   ============================================================ */

(function () {
    'use strict';

    /* ── Helpers ───────────────────────────────────────────── */
    function $(selector, ctx) {
        return (ctx || document).querySelector(selector);
    }
    function $$(selector, ctx) {
        return Array.from((ctx || document).querySelectorAll(selector));
    }

    /* ── Navbar: active link & scroll class ────────────────── */
    function initNavbar() {
        const navbar   = $('.navbar');
        const navLinks = $$('.nav-link');
        const sections = $$('.section[id]');
        const toggle   = $('.nav-toggle');
        const menu     = $('.nav-menu');

        if (!navbar) return;

        /* Scroll-triggered navbar shadow */
        function onScroll() {
            navbar.classList.toggle('scrolled', window.scrollY > 40);

            /* Highlight the active nav link based on scroll position */
            let current = '';
            sections.forEach(function (section) {
                const top = section.offsetTop - 80;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(function (link) {
                link.classList.toggle(
                    'active',
                    link.getAttribute('data-section') === current
                );
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* Mobile toggle */
        if (toggle && menu) {
            toggle.addEventListener('click', function () {
                const isOpen = menu.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(isOpen));
            });

            /* Close menu on link click */
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    menu.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    /* ── Smooth scroll for anchor links ────────────────────── */
    function initSmoothScroll() {
        document.addEventListener('click', function (e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const target = document.getElementById(
                anchor.getAttribute('href').slice(1)
            );
            if (!target) return;
            e.preventDefault();
            const navHeightStr = getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-height').trim();
            const offset = parseInt(navHeightStr, 10) || 64;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    }

    /* ── Scroll-reveal: animate-on-scroll elements ─────────── */
    function initScrollReveal() {
        const items = $$('.animate-on-scroll');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            /* Fallback: show all immediately */
            items.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ── Skill bars: animate width on reveal ───────────────── */
    function initSkillBars() {
        const fills = $$('.skill-bar__fill');
        if (!fills.length) return;

        if (!('IntersectionObserver' in window)) {
            fills.forEach(function (fill) { fill.classList.add('animated'); });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        fills.forEach(function (fill) { observer.observe(fill); });
    }

    /* ── Contact form: basic client-side feedback ───────────── */
    function initContactForm() {
        const form = $('#contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = form.querySelector('[type="submit"]');
            const original = btn.textContent;

            btn.textContent = 'Sent! ✓';
            btn.disabled = true;
            btn.classList.add('btn-outline');
            btn.classList.remove('btn-primary');

            setTimeout(function () {
                btn.textContent = original;
                btn.disabled = false;
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                form.reset();
            }, 3000);
        });
    }

    /* ── Footer year ────────────────────────────────────────── */
    function initFooterYear() {
        const el = $('#footer-year');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ── Hero particles: generate star dots ────────────────── */
    function initParticles() {
        const container = $('.hero-particles');
        if (!container) return;

        const PARTICLE_COUNT = 60;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const dot = document.createElement('span');
            dot.setAttribute('aria-hidden', 'true');

            const size   = Math.random() * 3 + 1;         /* 1-4 px */
            const x      = Math.random() * 100;            /* % */
            const y      = Math.random() * 100;
            const delay  = Math.random() * 6;              /* s  */
            const dur    = Math.random() * 4 + 4;          /* 4-8 s */
            const colors = ['#FFD700', '#8B008B', '#00CED1', '#F5F5F5'];
            const color  = colors[Math.floor(Math.random() * colors.length)];

            dot.style.cssText = [
                'position:absolute',
                'border-radius:50%',
                'pointer-events:none',
                'will-change:transform,opacity',
                'left:'   + x    + '%',
                'top:'    + y    + '%',
                'width:'  + size + 'px',
                'height:' + size + 'px',
                'background:' + color,
                'opacity:' + (Math.random() * 0.6 + 0.1),
                'animation:float ' + dur + 's ' + delay + 's ease-in-out infinite',
            ].join(';');

            fragment.appendChild(dot);
        }

        container.appendChild(fragment);
    }

    /* ── Project card 3-D tilt on mouse move ────────────────── */
    function initCardTilt() {
        const cards = $$('.project-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect   = card.getBoundingClientRect();
                const cx     = rect.left + rect.width  / 2;
                const cy     = rect.top  + rect.height / 2;
                const dx     = (e.clientX - cx) / (rect.width  / 2);
                const dy     = (e.clientY - cy) / (rect.height / 2);
                const tiltX  = dy * -6;   /* degrees */
                const tiltY  = dx *  6;

                card.style.transform =
                    'translateY(-6px) perspective(600px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    /* ── Bootstrap ──────────────────────────────────────────── */
    function initApp() {
        initNavbar();
        initSmoothScroll();
        initScrollReveal();
        initSkillBars();
        initContactForm();
        initFooterYear();
        initParticles();
        initCardTilt();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}());
