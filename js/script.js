/* =========================================================
   Portfolio — script principal
   - Met à jour l'année dans le pied de page
   - Fait apparaître les vignettes au chargement / au scroll
   - Ouvre les photos de la page projet dans une visionneuse
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  revealCards();
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

const heroImages = document.querySelectorAll(".hero__image");

let currentHeroImage = 0;

setInterval(() => {
  heroImages[currentHeroImage].classList.remove("is-active");

  currentHeroImage =
    (currentHeroImage + 1) % heroImages.length;

  heroImages[currentHeroImage].classList.add("is-active");
}, 1000);

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