/* Klaria — klaria.no */
(function () {
  'use strict';

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
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
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { navLinks.classList.remove('open'); navActions.classList.remove('open'); })
    );
  }

  // Rotating hero words (like native.no)
  const words = ['bedrifter', 'kontorer', 'barnehager', 'borettslag', 'butikker', 'restauranter'];
  const rotateEl = document.getElementById('heroRotate');
  if (rotateEl) {
    let idx = 0;
    function nextWord() {
      idx = (idx + 1) % words.length;
      rotateEl.style.opacity = '0';
      setTimeout(() => {
        rotateEl.textContent = words[idx];
        rotateEl.style.opacity = '1';
      }, 350);
    }
    setInterval(nextWord, 2800);
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(
    '.step, .svc, .compare__col, .compare__table-wrap, ' +
    '.quote-section__inner, .partner-cta__inner, .faq__item, ' +
    '.contact__left, .contact__form, .trust'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i * 0.05, 0.3) + 's';
    observer.observe(el);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20, behavior: 'smooth' });
      }
    });
  });

  // Form
  const form = document.getElementById('ctaForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.contact__submit');
      btn.textContent = 'Sendt! Vi kontakter deg snart.';
      btn.disabled = true;
      btn.style.opacity = '.7';
      setTimeout(() => { btn.textContent = 'Send forespørsel'; btn.disabled = false; btn.style.opacity = '1'; form.reset(); }, 4000);
    });
  }
})();
