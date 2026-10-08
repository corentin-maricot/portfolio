/* =========================================================
   Portfolio — script principal
   - Met à jour l'année dans le pied de page
   - Fait apparaître les vignettes au chargement / au scroll
   - Ouvre les photos de la page projet dans une visionneuse
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  revealCards();
  initIntroAnimation();
});

/* Année automatique dans le footer */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* Apparition douce des vignettes (grille d'accueil) */
function revealCards() {
  const cards = document.querySelectorAll(".work-card");

  cards.forEach((card, i) => {
    card.style.animationDelay = `${Math.min(i * 60, 300)}ms`;
  });
}

function initHeroCarousel() {
  const heroImages = document.querySelectorAll(".hero__image");

  if (heroImages.length <= 1) return;

  let currentHeroImage = 0;

  setInterval(() => {
    heroImages[currentHeroImage].classList.remove("is-active");

    currentHeroImage =
      (currentHeroImage + 1) % heroImages.length;

    heroImages[currentHeroImage].classList.add("is-active");
  }, 1000);
}

/* Visionneuse plein écran pour la page projet 
function initLightbox() {
  const gallery = document.getElementById("project-gallery");
  const lightbox = document.getElementById("lightbox");
  if (!gallery || !lightbox) return;

  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  gallery.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

*/



/* ---------- Animation d'introduction : 3 secondes ---------- */
function initIntroAnimation() {
  const intro = document.getElementById("intro-animation");
  if (!intro) return;

  const logo = intro.querySelector("img");
  if (!logo) {
    intro.remove();
    return;
  }

  // Respecter la préférence de réduction des animations.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.remove();
    return;
  }

  const duration = 1750; // 3 secondes avant le fondu
  const fadeDuration = 1000; // 1 seconde de fondu
  const rotationSpeed = 500; // degrés par seconde

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  // Vitesse initiale
  let vx = (Math.random() < 0.5 ? -1 : 1) * 715;
  let vy = (Math.random() < 0.5 ? -1 : 1) * 528;

  let angle = 0;
  let startTime = null;
  let previousTime = null;
  let animationFrame;

  const halfW = logo.offsetWidth / 2;
  const halfH = logo.offsetHeight / 2;

  function animate(time) {
    if (startTime === null) {
      startTime = time;
      previousTime = time;
    }

    const elapsed = time - startTime;

    // À 3 secondes : commencer le fondu
if (
  elapsed >= duration &&
  !intro.classList.contains("is-fading")
) {
  intro.classList.add("is-fading");
  initHeroCarousel();
}

    // À 4 secondes : supprimer complètement l'intro
if (elapsed >= duration + fadeDuration) {
  cancelAnimationFrame(animationFrame);
  initHeroCarousel();
  intro.remove();
  return;
}

    // Limiter le delta
    const delta = Math.min(
      (time - previousTime) / 1000,
      0.025
    );

    previousTime = time;

    // Déplacement
    x += vx * delta;
    y += vy * delta;

    // Limites de l'écran
    const maxX = Math.max(
      halfW,
      window.innerWidth - halfW
    );

    const maxY = Math.max(
      halfH,
      window.innerHeight - halfH
    );

    // Rebond horizontal
    if (x <= halfW) {
      x = halfW;
      vx = Math.abs(vx);
    } else if (x >= maxX) {
      x = maxX;
      vx = -Math.abs(vx);
    }

    // Rebond vertical
    if (y <= halfH) {
      y = halfH;
      vy = Math.abs(vy);
    } else if (y >= maxY) {
      y = maxY;
      vy = -Math.abs(vy);
    }

    // Rotation
    angle += rotationSpeed * delta;

    // Position + rotation du SVG
    logo.style.transform =
      `translate3d(${x - halfW}px, ${y - halfH}px, 0) rotate(${angle}deg)`;

    // Continuer l'animation, même pendant le fondu
    animationFrame = requestAnimationFrame(animate);
  }

  // Attendre que le SVG soit chargé
function start() {
  if (!logo.offsetWidth || !logo.offsetHeight) {
    requestAnimationFrame(start);
    return;
  }

  // Position de départ : exactement au centre de l'écran
  x = window.innerWidth / 2;
  y = window.innerHeight / 2;

  logo.style.transform =
    `translate3d(${x - halfW}px, ${y - halfH}px, 0) rotate(0deg)`;

  animationFrame = requestAnimationFrame(animate);
}

  if (logo.complete) {
    start();
  } else {
    logo.addEventListener("load", start, { once: true });

    logo.addEventListener(
      "error",
      () => intro.remove(),
      { once: true }
    );
  }
}

