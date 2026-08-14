/**
 * StyleHaus — main.js
 * Handles: hamburger nav toggle, navbar scroll shadow, smooth anchor offset
 */

(function () {
    'use strict';

    /* ─── Hamburger / Mobile Nav ───────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

            hamburger.setAttribute('aria-expanded', String(!isOpen));
            mobileNav.setAttribute('aria-hidden', String(isOpen));
            mobileNav.classList.toggle('is-open', !isOpen);
        });

        /* Close mobile nav when a link is clicked */
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileNav.classList.remove('is-open');
            });
        });

        /* Close on outside click */
        document.addEventListener('click', function (e) {
            const header = document.getElementById('site-header');
            if (header && !header.contains(e.target)) {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileNav.classList.remove('is-open');
            }
        });

        /* Close on Escape key */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileNav.classList.remove('is-open');
                hamburger.focus();
            }
        });
    }

    /* ─── Navbar scroll shadow ─────────────────────────────── */
    const header = document.getElementById('site-header');

    if (header) {
        const onScroll = function () {
            header.style.boxShadow = window.scrollY > 8
                ? '0 2px 20px rgba(0,0,0,0.10)'
                : '';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ─── Smooth scroll with navbar offset ────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = header ? header.offsetHeight : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ─── Lazy image fallback placeholder ──────────────────── */
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
        img.addEventListener('error', function () {
            // Only apply placeholder style if not already handled
            if (!img.dataset.fallback) {
                img.dataset.fallback = 'true';
                img.style.backgroundColor = '#F3F1EC';
                img.style.minHeight = '160px';
            }
        });
    });

})();
