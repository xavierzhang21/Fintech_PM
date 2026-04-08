/* ============================================================
   XAVIER ZHANG PORTFOLIO — main.js
   All interactivity in a single file. No modules, no imports.
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav glass effect ── */
  const nav = document.getElementById('nav');
  if (nav) {
    function updateNav() {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Hamburger toggle ── */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = hamburger.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* ── Mobile link close ── */
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (hamburger) hamburger.classList.remove('open');
      if (navMobile) navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll with 80px offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Scroll reveal with sibling stagger ── */
  var allReveal = Array.from(document.querySelectorAll('.reveal'));

  function makeVisible(el) {
    if (el.classList.contains('visible')) return;
    var parent = el.parentElement;
    var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [el];
    var index = siblings.indexOf(el);
    var delay = Math.min(index * 80, 320);
    setTimeout(function () { el.classList.add('visible'); }, delay);
  }

  /* Hard fallback: after 600ms everything must be visible regardless */
  setTimeout(function () {
    allReveal.forEach(function (el) { el.classList.add('visible'); });
  }, 600);

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        makeVisible(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    allReveal.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* No IntersectionObserver support — show everything immediately */
    allReveal.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Active nav link via IntersectionObserver ── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ── Portfolio filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      portfolioCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Card navigation ── */
  portfolioCards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', function () {
      const href = this.dataset.href;
      if (href) window.location.href = href;
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = this.dataset.href;
        if (href) window.location.href = href;
      }
    });
  });

  /* ── Image fallback (Unsplash errors) ── */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.opacity = '0';
    });
  });

})();
