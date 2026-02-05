const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');
const header = document.getElementById('header');

// Mobilní menu – toggle + stagger + smooth scale/fade
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

// Header – blur + lift při scrollu
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }
});

// Scroll reveal – Intersection Observer
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

// Hero – elegantní nástup při načtení stránky
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    setTimeout(() => hero.classList.add('visible'), 480);
  }
});

// ──────────────────────────────────────────────────────────────
// Nejčistší futuristický loading screen – jen logo + glass core
// ──────────────────────────────────────────────────────────────
/*
const loading = document.createElement('div');
loading.id = 'elite-loading';
loading.style.cssText = `
  position: fixed; inset: 0; z-index: 99999;
  background: #000;
  display: flex; justify-content: center; align-items: center;
  opacity: 1; transition: opacity 1.5s cubic-bezier(0.19,1,0.22,1);
  overflow: hidden;
`;

const central = document.createElement('div');
central.style.cssText = `
  position: relative; width: 400px; height: 400px;
  display: flex; justify-content: center; align-items: center;
  perspective: 1600px;
`;

const ringOuter = document.createElement('div');
ringOuter.style.cssText = `
  position: absolute; inset: 0;
  border: 1px solid rgba(200,200,255,0.08);
  border-radius: 50%;
  animation: ringSlow 36s linear infinite;
  transform-style: preserve-3d;
`;

const ringInner = ringOuter.cloneNode();
ringInner.style.cssText += `
  border-color: rgba(160,160,255,0.06);
  animation-duration: 48s;
  animation-direction: reverse;
  transform: scale(0.72);
`;

const core = document.createElement('div');
core.style.cssText = `
  width: 240px; height: 240px;
  background: linear-gradient(135deg, rgba(200,200,255,0.06), rgba(140,140,220,0.04));
  backdrop-filter: blur(36px) saturate(200%);
  -webkit-backdrop-filter: blur(36px) saturate(200%);
  border: 1px solid rgba(200,200,255,0.18);
  border-radius: 50%;
  box-shadow: 
    0 0 120px rgba(160,160,255,0.28),
    inset 0 0 70px rgba(255,255,255,0.05);
  animation: coreBreathe 8.4s ease-in-out infinite;
`;

const logo = document.createElement('div');
logo.textContent = 'Baltaci';
logo.style.cssText = `
  position: absolute;
  font-size: 5.2rem; font-weight: 900; letter-spacing: -4px;
  color: transparent;
  background: linear-gradient(90deg, #f5f5f7 10%, #d8d8ff 50%, #f5f5f7 90%);
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 400% 100%;
  animation: subtleGradient 18s ease-in-out infinite;
  opacity: 0; transform: translateY(80px) scale(0.88);
  transition: all 2.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  text-shadow: 0 0 80px rgba(200,200,255,0.12);
`;

central.appendChild(ringOuter);
central.appendChild(ringInner);
central.appendChild(core);
central.appendChild(logo);
loading.appendChild(central);
document.body.appendChild(loading);

// ─── Keyframes ────────────────────────────────────────────────
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

// ─── Loading sekvence – delší a dramatická ───────────────────
window.addEventListener('load', () => {
  // 1. logo pomalý nástup
  setTimeout(() => {
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0) scale(1)';
  }, 900);

  // 2. jemné zesílení glow
  setTimeout(() => {
    logo.style.textShadow = '0 0 120px rgba(200,200,255,0.22)';
  }, 2200);

  // 3. dlouhý fade out
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
*/
