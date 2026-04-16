/* ============================================
   ANIMATIONS.JS – Scroll Reveal, Counters, Particles
   ============================================ */

(function () {
  'use strict';

  // ---- Page Loader ----
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 600);
    }

    // Trigger hero bg zoom
    const heroBg = document.getElementById('heroBg');
    if (heroBg) setTimeout(() => heroBg.classList.add('zoom'), 100);
  });

  // ---- Scroll Reveal (IntersectionObserver) ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ---- Progress Bar Fill ----
  const progressBars = document.querySelectorAll('.progress-fill[data-width]');

  if (progressBars.length > 0) {
    const pbObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.style.width = target.dataset.width + '%';
            pbObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.3 }
    );

    progressBars.forEach((bar) => pbObserver.observe(bar));
  }

  // ---- Counter Animation ----
  function animateCounter(el, target) {
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    function update() {
      current += step;
      if (current >= target) {
        current = target;
        // Format number
        if (target >= 100000) {
          el.textContent = '₹' + (target / 100000).toFixed(1) + 'L';
        } else if (target >= 1000) {
          el.textContent = target.toLocaleString('en-IN');
        } else {
          el.textContent = target;
        }
        return;
      }

      if (target >= 100000) {
        el.textContent = '₹' + (current / 100000).toFixed(1) + 'L';
      } else if (target >= 1000) {
        el.textContent = current.toLocaleString('en-IN');
      } else {
        el.textContent = current;
      }

      requestAnimationFrame(update);
    }

    update();
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count, 10);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  }

  // ---- Hero Particles ----
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = Math.random() * 8 + 6 + 's';
      p.style.animationDelay = Math.random() * 5 + 's';
      p.style.opacity = Math.random() * 0.5 + 0.1;
      particleContainer.appendChild(p);
    }
  }

  // ---- Parallax on mouse move (hero only) ----
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 10;
      const my = (e.clientY / window.innerHeight - 0.5) * 10;
      const content = hero.querySelector('.hero-content');
      if (content) {
        content.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
      }
    });
  }
})();
