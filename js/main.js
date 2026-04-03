/* ===================================================
   Xavier Zhang Portfolio — main.js (FIXED for GitHub Pages)
   =================================================== */

// ── NAV: Scroll behavior & hamburger ──────────────
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (nav) {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile?.classList.toggle('open');
});

// Close mobile nav when a link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
  });
});


// ── SCROLL REVEAL ─────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));
}


// ── PORTFOLIO FILTER ──────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.portfolio-card');

if (filterBtns.length > 0 && cards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          if (!card.classList.contains('visible')) {
            setTimeout(() => card.classList.add('visible'), 60);
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


// ── PORTFOLIO CARD NAVIGATION (FIXED) ─────────────
function getCorrectPath(href) {
  // 获取当前路径（适配 GitHub Pages repo）
  const base = window.location.pathname.replace(/\/[^\/]*$/, '/');
  return base + href;
}

if (cards.length > 0) {
  cards.forEach(card => {

    card.addEventListener('click', () => {
      const href = card.dataset.href;
      if (href) {
        window.location.href = getCorrectPath(href);
      }
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = card.dataset.href;
        if (href) {
          window.location.href = getCorrectPath(href);
        }
      }
    });
  });
}


// ── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── ACTIVE NAV LINK ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length > 0 && navLinks.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
}
