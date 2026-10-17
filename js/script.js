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




/* ---------- Animation d'introduction ---------- */
function initIntroAnimation() {
  const intro = document.getElementById("intro-animation");
  if (!intro) return;

  const logo = intro.querySelector("img");
  if (!logo) {
    intro.remove();
    return;
  }

  // Détecter la page À propos
  const isAboutPage = /(?:^|\/)a-propos\.html$/i.test(
    window.location.pathname
  );

  // Respecter la préférence de réduction des animations
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.remove();
    return;
  }

  // Sur À propos : animation permanente et fond transparent
  if (isAboutPage) {
    intro.classList.add("intro--persistent");
  }

  const duration = 1750;
  const fadeDuration = 1000;
  const rotationSpeed = 500;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  let vx = (Math.random() < 0.5 ? -1 : 1) * 715;
  let vy = (Math.random() < 0.5 ? -1 : 1) * 528;

  let angle = 0;
  let startTime = null;
  let previousTime = null;
  let animationFrame;

  function animate(time) {
    if (startTime === null) {
      startTime = time;
      previousTime = time;
    }

    const elapsed = time - startTime;

    // Sur l'accueil uniquement : début du fondu
    if (
      !isAboutPage &&
      elapsed >= duration &&
      !intro.classList.contains("is-fading")
    ) {
      intro.classList.add("is-fading");
      initHeroCarousel();
    }

    // Sur l'accueil uniquement : fin de l'introduction
    if (!isAboutPage && elapsed >= duration + fadeDuration) {
      cancelAnimationFrame(animationFrame);
      intro.remove();
      return;
    }

    const delta = Math.min(
      (time - previousTime) / 1000,
      0.025
    );

    previousTime = time;

    // Dimensions actualisées du logo
    const halfW = logo.offsetWidth / 2;
    const halfH = logo.offsetHeight / 2;

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

    // Rotation continue
    angle += rotationSpeed * delta;

    logo.style.transform =
      `translate3d(${x - halfW}px, ${y - halfH}px, 0) rotate(${angle}deg)`;

    animationFrame = requestAnimationFrame(animate);
  }

  function start() {
    if (!logo.offsetWidth || !logo.offsetHeight) {
      requestAnimationFrame(start);
      return;
    }

    x = window.innerWidth / 2;
    y = window.innerHeight / 2;

    const halfW = logo.offsetWidth / 2;
    const halfH = logo.offsetHeight / 2;

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



/* ==============================
   CONFIGURATION DES POLICES
============================== */

const fontConfigs = {
  didak: {
    fontFamily: "Didak",
    characters: [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ..."abcdefghijklmnopqrstuvwxyz",
      ..."ÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ",
      ..."àáâäçèéêëìíîïòóôöœùúûü",
      ..."0123456789",
      ...".,:;!?'\"-–—()&*"
    ]
  },

  joyboy: {
    fontFamily: "Joyboy",
    characters: [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ..."abcdefghijklmnopqrstuvwxyz",
      ..."àáâäçèéêëìíîïòóôöùúûü",
      ..."0123456789",
      ..."!&'()*,./:;^"
    ]
  },

  fulicaregular: {
    fontFamily: "Fulicaregular",
    characters: [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ..."abcdefghijklmnopqrstuvwxyz",
      ..."ÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ",
      ..."àáâäçèéêëìíîïòóôöùúûü",
      ..."0123456789",
      ..."!&'()*,-.«»:;^¨"
    ]
  },
  fulicalineaire: {
    fontFamily: "Fulicalineaire",
    characters: [
      ..."abcdefghijklmnopqrstuvwxyz"
    ]
  },
  fulicacondensed: {
    fontFamily: "Fulicacondensed",
    characters: [
      ..."abcdefghijklmnopqrstuvwxyz"
    ]
  },
  fulicaheavy: {
    fontFamily: "Fulicaheavy",
    characters: [
      ..."abcdefghijklmnopqrstuvwxyz"
    ]
  },
  fulicaexotique: {
    fontFamily: "Fulicaexotique",
    characters: [
      ..."abcdefghijklmnopqrstuvwxyz"
    ]
  },
  fulicaitalique: {
    fontFamily: "Fulicaitalique",
    characters: [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ..."abcdefghijklmnopqrstuvwxyz",
      ..."ÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ",
      ..."àáâäçèéêëìíîïòóôöùúûü",
      ..."0123456789",
      ..."!&'()*,-.«»:;^¨"
    ],

  offsets: {
  "A": -0.1,
  "B": -0.1,
  "C": -0.1,
  "D": -0.1,
  "E": -0.1,
  "F": -0.1,
  "G": -0.1,
  "H": -0.1,
  "I": -0.1,
  "J": -0.1,
  "K": -0.1,
  "L": -0.1,
  "M": -0.1,
  "N": -0.1,
  "O": -0.1,
  "P": -0.1,
  "Q": -0.3,
  "R": -0.1,
  "S": -0.1,
  "T": -0.1,
  "U": -0.1,
  "V": -0.1,
  "W": -0.15,
  "X": -0.1,
  "Y": -0.1,
  "Z": -0.1,

  "a": -0.1,
  "b": -0.1,
  "c": -0.1,
  "d": -0.1,
  "e": -0.1,
  "f": -0.1,
  "g": -0.1,
  "h": -0.1,
  "i": -0.1,
  "j": -0.1,
  "k": -0.1,
  "l": -0.1,
  "m": -0.1,
  "n": -0.1,
  "o": -0.1,
  "p": -0.1,
  "q": -0.1,
  "r": -0.1,
  "s": -0.1,
  "t": -0.1,
  "u": -0.1,
  "v": -0.1,
  "w": -0.1,
  "x": -0.1,
  "y": -0.1,
  "z": -0.1,

  "À": -0.1,
  "Á": -0.1,
  "Â": -0.1,
  "Ä": -0.1,
  "È": -0.1,
  "É": -0.1,
  "Ê": -0.1,
  "Ë": -0.1,
  "Ì": -0.1,
  "Í": -0.1,
  "Î": -0.1,
  "Ï": -0.1,
  "Ò": -0.1,
  "Ó": -0.1,
  "Ô": -0.1,
  "Ö": -0.1,
  "Ù": -0.1,
  "Ú": -0.1,
  "Û": -0.1,
  "Ü": -0.1,

  "à": -0.1,
  "á": -0.1,
  "â": -0.1,
  "ä": -0.1,
  "ç": -0.1,
  "è": -0.1,
  "é": -0.1,
  "ê": -0.1,
  "ë": -0.1,
  "ì": -0.1,
  "í": -0.1,
  "î": -0.1,
  "ï": -0.1,
  "ò": -0.1,
  "ó": -0.1,
  "ô": -0.1,
  "ö": -0.1,
  "ù": -0.1,
  "ú": -0.1,
  "û": -0.1,
  "ü": -0.1,

  "0": -0.1,
  "1": -0.1,
  "2": -0.1,
  "3": -0.1,
  "4": -0.1,
  "5": -0.1,
  "6": -0.1,
  "7": -0.1,
  "8": -0.1,
  "9": -0.1,

  "!": -0.1,
  "&": -0.1,
  "'": -0.1,
  "(": -0.1,
  ")": -0.1,
  "*": -0.1,
  ",": -0.1,
  "-": -0.1,
  ".": -0.1,
  "«": -0.1,
  "»": -0.1,
  ":": -0.1,
  ";": -0.1,
  "^": -0.1,
  "¨": -0.1
}
},
fulicahigh: {
    fontFamily: "Fulicahigh",
    characters: [
      ..."abcdefghijklmnopqrstuvwxyz"
    ]
  }

  
};




/* ==============================
   INITIALISATION DE LA PAGE
============================== */
const fontKey = document.body.dataset.font;
const fontConfig = fontConfigs[fontKey];

if (fontConfig) {
  document.documentElement.style.setProperty(
    "--specimen-font",
    `"${fontConfig.fontFamily}"`
  );

  initFontTester();
  initSpecimen(fontConfig);

} else {
  console.warn(`Police inconnue : ${fontKey}`);
}


/* ==============================
   TESTEUR TYPOGRAPHIQUE
============================== */

function initFontTester() {
  const preview = document.getElementById("font-tester-preview");
  const sizeSlider = document.getElementById("font-tester-size");
  const sizeOutput = document.getElementById("font-tester-size-value");

  if (!preview || !sizeSlider || !sizeOutput) return;

  function updateSize() {
    preview.style.fontSize = `${sizeSlider.value}px`;
    sizeOutput.textContent = `${sizeSlider.value} px`;
  }

  // Valeurs initiales adaptées à l'écran
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  sizeSlider.max = isMobile ? 200 : 500;
  sizeSlider.value = isMobile ? 100 : 200;

  sizeSlider.addEventListener("input", updateSize);
  updateSize();
}


/* ==============================
   SPÉCIMEN INTERACTIF
============================== */
/* ==============================
   SPÉCIMEN INTERACTIF
============================== */

function initSpecimen(fontConfig) {
  const grid = document.getElementById("didak-character-grid");
  const large = document.getElementById("didak-selected-character");
  const count = document.getElementById("didak-character-count");

  if (!grid || !large) return;

  const characters = fontConfig.characters;
  const offsets = fontConfig.offsets || {};

  grid.replaceChildren();

  function selectCharacter(character, selectedButton) {
    large.textContent = character;

    // Récupère le décalage de la lettre
    // Si aucun décalage n'est défini : 0
    const offset = offsets[character] ?? 0;

    // Applique le décalage horizontal
    large.style.transform = `translateX(${offset}em)`;

    grid
      .querySelectorAll(".didak-specimen__character")
      .forEach(button => {
        const selected = button === selectedButton;

        button.classList.toggle("is-selected", selected);
        button.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });
  }

  characters.forEach((character, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "didak-specimen__character";
    button.textContent = character;

    button.setAttribute(
      "aria-label",
      `Afficher ${character}`
    );

    button.setAttribute(
      "aria-pressed",
      "false"
    );

    button.addEventListener("click", () => {
      selectCharacter(character, button);
    });

    grid.appendChild(button);

    // Premier caractère sélectionné
    if (index === 0) {
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");

      large.textContent = character;

      const offset = offsets[character] ?? 0;

      large.style.transform =
        `translateX(${offset}em)`;
    }
  });

  if (count) {
    count.textContent =
      `${characters.length} signes`;
  }
}

