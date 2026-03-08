const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');
const header = document.getElementById('header');

function toggleMenu(open = null) {
  const isActive = mobileMenu.classList.contains('active');

  if (open === true || (open === null && !isActive)) {
    burger.classList.add('active');
    mobileMenu.classList.add('active');

    setTimeout(() => {
      document.querySelectorAll('.mobile-menu a').forEach((el, i) => {
        el.style.transitionDelay = `${0.18 + i * 0.14}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      });
    }, 140);
  } else {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');

    document.querySelectorAll('.mobile-menu a').forEach(el => {
      el.style.transitionDelay = '0s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) scale(0.94)';
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
  rootMargin: '0px 0px -18% 0px',
  threshold: 0.24
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .features .card').forEach(el => {
  revealObserver.observe(el);
});

document.querySelectorAll('.features .card').forEach((card, i) => {
  card.style.transitionDelay = `${0.14 + i * 0.16}s`;
});

window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    setTimeout(() => hero.classList.add('visible'), 480);
  }
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes ringSlow {
    from { transform: rotateY(0deg) rotateX(6deg); }
    to   { transform: rotateY(360deg) rotateX(6deg); }
  }
  @keyframes coreBreathe {
    0%, 100% { transform: scale(1);   box-shadow: 0 0 120px rgba(160,160,255,0.28); }
    50%      { transform: scale(1.05); box-shadow: 0 0 180px rgba(160,160,255,0.45); }
  }
  @keyframes subtleGradient {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 400% 50%; }
  }
`;
document.head.appendChild(styleSheet);

window.addEventListener('load', () => {
  setTimeout(() => {
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0) scale(1)';
  }, 900);

  setTimeout(() => {
    logo.style.textShadow = '0 0 120px rgba(200,200,255,0.22)';
  }, 2200);

  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => loading.remove(), 1800);
  }, 6200);  // celkem ~8 sekund
});
const track = document.querySelector(".partners-track");

track.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

track.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});