/* Klaria — Marketing Site JS */

(function () {
  'use strict';

  // Nav scroll effect
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 40);
    lastScroll = y;
  }, { passive: true });

  // Mobile burger
  const burger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav__links');
  const navActions = document.querySelector('.nav__actions');
  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navActions.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navActions.classList.remove('open');
      });
    });
  }

  // Animated counters
  function animateCounters() {
    const items = document.querySelectorAll('.stats__item');
    items.forEach(item => {
      const target = parseInt(item.dataset.target, 10);
      const numEl = item.querySelector('.stats__num');
      if (!target || item.dataset.animated) return;
      item.dataset.animated = '1';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.round(target * eased).toLocaleString('nb-NO');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Scroll reveal
  const reveals = [];
  function initReveals() {
    document.querySelectorAll(
      '.how__step, .service-card, .compare__col, .compare__table-wrap, ' +
      '.testimonials__quote, .partners__content, .partners__visual, .faq__item, ' +
      '.cta__content, .cta__form'
    ).forEach(el => {
      el.classList.add('reveal');
      reveals.push(el);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Stagger reveal delays
  function staggerReveals() {
    const groups = {};
    reveals.forEach(el => {
      const parent = el.parentElement;
      const key = parent ? parent.className : 'root';
      if (!groups[key]) groups[key] = [];
      groups[key].push(el);
    });
    Object.values(groups).forEach(group => {
      group.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.1) + 's';
        observer.observe(el);
      });
    });
  }

  // Form handling
  const form = document.getElementById('ctaForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sendt! Vi kontakter deg snart.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.textContent = 'Send forespørsel';
        btn.disabled = false;
        btn.style.opacity = '1';
        form.reset();
      }, 4000);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Init
  initReveals();
  staggerReveals();
  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);
})();
