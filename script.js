const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const loading = document.getElementById('loading');
const track = document.querySelector(".partners-track");

function toggleMenu(open = null) {
  if (!mobileMenu || !burger) return;

  const isActive = mobileMenu.classList.contains('active');

  if (open === true || (open === null && !isActive)) {
    burger.classList.add('active');
    mobileMenu.classList.add('active');

    setTimeout(() => {
      document.querySelectorAll('.mobile-menu a').forEach((el, i) => {
        el.style.transitionDelay = `${0.1 + i * 0.08}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      });
    }, 100);

  } else {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');

    document.querySelectorAll('.mobile-menu a').forEach(el => {
      el.style.transitionDelay = '0s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.96)';
    });
  }
}

if (burger) burger.addEventListener('click', () => toggleMenu());
if (closeMenu) closeMenu.addEventListener('click', () => toggleMenu(false));
if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }
});

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -15% 0px',
  threshold: 0.2
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .features .card').forEach(el => {
  revealObserver.observe(el);
});

document.querySelectorAll('.features .card').forEach((card, i) => {
  card.style.transitionDelay = `${0.1 + i * 0.1}s`;
});

window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');

  if (hero) {
    setTimeout(() => hero.classList.add('visible'), 300);
  }

  if (logo) {
    setTimeout(() => {
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }

  if (loading) {
    setTimeout(() => {
      loading.classList.add('fade-out');
      loading.addEventListener('transitionend', () => {
        loading.remove();
      });
    }, 800);
  }
});

if (track) {
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes ringSlow {
  from { transform: rotateY(0deg) rotateX(6deg); }
  to   { transform: rotateY(360deg) rotateX(6deg); }
}

@keyframes coreBreathe {
  0%, 100% { transform: scale(1); box-shadow: 0 0 120px rgba(160,160,255,0.28); }
  50% { transform: scale(1.05); box-shadow: 0 0 180px rgba(160,160,255,0.45); }
}

@keyframes subtleGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 400% 50%; }
}
`;
document.head.appendChild(styleSheet);