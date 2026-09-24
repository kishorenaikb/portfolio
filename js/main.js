/**
 * ===================================================================
 * KISHORE NAIK - PORTFOLIO INTERACTION ENGINE
 * Exact Reference Site Animations & Logic
 * Source: https://kishore-portfolio-site.netlify.app/
 * ===================================================================
 */

// Global Settings State
let trackingActive = true;

// Initialize AOS (Animation On Scroll) & Core Functions
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out",
      once: false
    });
  }

  initTypingAnimation();
  initAvatarGazeAndClickTracking();
  initScrollSpy();
  initAcademicTrackInitial();
});

/* ===================================================================
   1. DYNAMIC HERO ROLE TYPEWRITER
   =================================================================== */
function initTypingAnimation() {
  const typingAnimationElement = document.getElementById("typing-animation");
  if (!typingAnimationElement) return;

  const typingTexts = [
    "Front-End Developer  ",
    "B.Tech CSE Student  ",
    "Problem Solver  ",
    "Tech Explorer  "
  ];

  let currentTextIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeStep() {
    const currentText = typingTexts[currentTextIndex];

    if (isDeleting) {
      typingAnimationElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingAnimationElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      speed = 350;
    }

    setTimeout(typeStep, speed);
  }

  typeStep();
}

/* ===================================================================
   2. BARCODE CLICK INTERACTION (Authentic Typewriter Printing & Scroll)
   =================================================================== */
/* ===================================================================
   2. BARCODE CLICK INTERACTION (Smooth Slow-Motion Print & Return to Barcode)
/* ===================================================================
   2. BARCODE CLICK & HOVER INTERACTION (EXACT REFERENCE SITE TYPE)
   =================================================================== */
function toggleBarcode(element) {
  const box = element || document.getElementById("barcode-box");
  if (!box) return;

  const isShowing = box.classList.contains("show-name");
  if (isShowing) {
    box.classList.remove("show-name");
    if (box._barcodeTimer) clearTimeout(box._barcodeTimer);
  } else {
    box.classList.add("show-name");
    // Stay showing name, then smoothly revert back after 8 seconds
    if (box._barcodeTimer) clearTimeout(box._barcodeTimer);
    box._barcodeTimer = setTimeout(() => {
      box.classList.remove("show-name");
    }, 8000);
  }
}
window.toggleBarcode = toggleBarcode;

/* Smooth Scroll to Profile Social Connect Row on "Let's Connect!" Click */
function scrollToConnect(e) {
  if (e) e.preventDefault();
  const target = document.getElementById("profile-connect");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.remove("highlight-connect");
    void target.offsetWidth;
    target.classList.add("highlight-connect");
    setTimeout(() => {
      target.classList.remove("highlight-connect");
    }, 2200);
  }
}
window.scrollToConnect = scrollToConnect;

/* ===================================================================
   3. ACADEMIC TRACK ON-IMAGE DETAILS & MOVING CIRCLE ANIMATION
   =================================================================== */
let currentActiveHouseId = "house1";

function showDetails(houseId) {
  currentActiveHouseId = houseId;

  const houses = document.querySelectorAll(".house");
  houses.forEach((h) => {
    h.classList.remove("active-house");
    if (h.id !== houseId) {
      h.classList.remove("show-overlay");
    }
  });

  const clickedHouse = document.getElementById(houseId);
  if (clickedHouse) {
    clickedHouse.classList.add("active-house");
    // Toggle details overlay directly ON the image card
    clickedHouse.classList.toggle("show-overlay");
  }

  // Dynamic accents matching clean light white active style (no neon glow halos)
  const circle = document.getElementById("moving-circle");
  const roadProgress = document.getElementById("road-progress");

  if (circle) {
    circle.style.background = "#ffffff";
    circle.style.boxShadow = "0 0 14px rgba(255, 255, 255, 0.5)";
  }
  if (roadProgress) {
    roadProgress.style.background = "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))";
    roadProgress.style.boxShadow = "none";
  }

  moveCircleToHouse(houseId);
}

function closeHouseOverlay(e, houseId) {
  if (e) e.stopPropagation();
  const house = document.getElementById(houseId);
  if (house) {
    house.classList.remove("show-overlay");
  }
}

function moveCircleToHouse(houseId) {
  const circle = document.getElementById("moving-circle");
  const road = document.getElementById("academic-road") || document.querySelector(".road");
  const targetHouse = document.getElementById(houseId);
  const roadProgress = document.getElementById("road-progress");
  if (!circle || !road || !targetHouse) return;

  const houseRect = targetHouse.getBoundingClientRect();
  const roadRect = road.getBoundingClientRect();
  const circleWidth = circle.offsetWidth || 26;

  // Calculate center of target house relative to road bar
  let targetLeft = (houseRect.left + (houseRect.width / 2)) - roadRect.left - (circleWidth / 2);
  const minLeft = 6;
  const maxLeft = roadRect.width - circleWidth - 6;

  if (targetLeft < minLeft) targetLeft = minLeft;
  if (targetLeft > maxLeft) targetLeft = maxLeft;

  circle.style.left = `${targetLeft}px`;

  if (roadProgress) {
    const progressWidth = targetLeft + (circleWidth / 2);
    roadProgress.style.width = `${Math.min(roadRect.width, progressWidth)}px`;
  }
}

function initAcademicTrackInitial() {
  const align = () => {
    moveCircleToHouse(currentActiveHouseId);
  };

  setTimeout(align, 150);
  setTimeout(align, 500);
  setTimeout(align, 1000);

  window.addEventListener("resize", () => {
    moveCircleToHouse(currentActiveHouseId);
  });

  const academicRoad = document.getElementById("academic-road") || document.querySelector(".road");
  if (academicRoad) {
    academicRoad.addEventListener("click", (e) => {
      const rect = academicRoad.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / rect.width;
      if (ratio < 0.35) {
        document.getElementById("house1")?.click();
      } else if (ratio < 0.68) {
        document.getElementById("house2")?.click();
      } else {
        document.getElementById("house3")?.click();
      }
    });
  }
}

/* ===================================================================
   4. FOOTER AVATAR EYE-ONLY CLICK & CURSOR TRACKING (HEAD STAYS STILL)
   =================================================================== */
function initAvatarGazeAndClickTracking() {
  const avatar = document.getElementById("footer-wala-avatar") || document.getElementById("footer-avatar-img");
  const avatarContainer = document.querySelector(".footer-avatar-container");
  let pupils = Array.from(document.getElementsByClassName("footer-pupil"));

  // Ensure head never moves or rotates (Stationary & constant)
  if (avatar) {
    avatar.style.transform = "none";
  }

  function directPupilGaze(targetX, targetY, isClick = false) {
    if (!trackingActive) return;

    if (pupils.length === 0) {
      pupils = Array.from(document.getElementsByClassName("footer-pupil"));
    }
    if (pupils.length === 0) return;

    // Responsive travel distances based on eye sizes
    const isMobile = window.innerWidth <= 500;
    const isTablet = window.innerWidth > 500 && window.innerWidth <= 768;
    const maxTravelX = isMobile ? 8.0 : (isTablet ? 9.5 : 12.0);
    const maxTravelY = isMobile ? 6.0 : (isTablet ? 7.0 : 9.0);

    let t = 0;
    let o = 0;

    const targetElem = avatarContainer || avatar;
    if (targetElem) {
      const rect = targetElem.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;
      const dx = targetX - avatarCenterX;
      const dy = targetY - avatarCenterY;

      const dist = Math.hypot(dx, dy);
      if (dist > 0) {
        const angle = Math.atan2(dy, dx);
        // Intensity scaling so even close-up clicks visibly shift the gaze
        const intensity = Math.min(1, Math.max(0.4, dist / (isMobile ? 50 : 80)));
        t = Math.cos(angle) * maxTravelX * intensity;
        o = Math.sin(angle) * maxTravelY * intensity;
      }
    } else {
      const fracX = Math.max(0, Math.min(1, targetX / (window.innerWidth || 1)));
      const fracY = Math.max(0, Math.min(1, targetY / (window.innerHeight || 1)));
      t = (fracX - 0.5) * 2 * maxTravelX;
      o = (fracY - 0.5) * 2 * maxTravelY;
    }

    pupils.forEach((p) => {
      p.style.transition = isClick
        ? "transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)"
        : "transform 0.05s ease-out";
      p.style.transform = `translate(${t.toFixed(1)}px, ${o.toFixed(1)}px)`;
    });
  }

  // Click tracking: Clicking anywhere on desktop or mobile turns eyes to click side
  document.addEventListener("click", (e) => {
    directPupilGaze(e.clientX, e.clientY, true);
  });

  // Mobile tap tracking: Touching/tapping anywhere turns eyes to the tapped side
  document.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      directPupilGaze(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  }, { passive: true });

  // Direct click / tap listener on the avatar container itself
  if (avatarContainer) {
    avatarContainer.addEventListener("click", (e) => {
      directPupilGaze(e.clientX, e.clientY, true);
    });
    avatarContainer.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        directPupilGaze(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    }, { passive: true });
  }

  // Smooth mouse movement cursor tracking across desktop
  let throttle = false;
  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;
    if (throttle) return;
    throttle = true;
    requestAnimationFrame(() => {
      directPupilGaze(e.clientX, e.clientY, false);
      throttle = false;
    });
  });
}

/* ===================================================================
   5. HAMBURGER MENU & DRAWER (3-Line Navbar Button Toggle)
   =================================================================== */
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  const menu = document.getElementById("mobiletogglemenu");
  const toggleBtn = document.getElementById("nav-menu-toggle");
  if (menu) menu.classList.toggle("show-toggle-menu");
  if (toggleBtn) toggleBtn.classList.toggle("active");
}
window.togglenavmenu = hamburgerMenu;

function hidemenubyli() {
  document.body.classList.remove("stopscrolling");
  const menu = document.getElementById("mobiletogglemenu");
  const toggleBtn = document.getElementById("nav-menu-toggle");
  if (menu) menu.classList.remove("show-toggle-menu");
  if (toggleBtn) toggleBtn.classList.remove("active");
}

/* ===================================================================
   6. SCROLL SPY & EXACT VERTICAL BACK-TO-TOP BUTTON
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
  const mybutton = document.getElementById("backtotopbutton");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 250) {
        currentId = section.getAttribute("id");
      }
    });

    mobilenavLi.forEach((li) => {
      li.classList.remove("activeThismobiletab");
      if (li.classList.contains(currentId)) {
        li.classList.add("activeThismobiletab");
      }
    });

    // Back to top visibility
    if (mybutton) {
      if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    }
  });
}

function scrolltoTopfunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ===================================================================
   7. SKILLS CATEGORY FILTER
   =================================================================== */
function showSkills(category, btnElement) {
  const allCategories = document.querySelectorAll(".skill-category");
  allCategories.forEach((cat) => cat.classList.add("hidden"));

  const activeCategory = document.getElementById(category);
  if (activeCategory) {
    activeCategory.classList.remove("hidden");
  }

  const buttons = document.querySelectorAll(".skills-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }
}

/* ===================================================================
   8. EXACT REFERENCE SETTING TOGGLE & WHITE THEME VISUAL MODE
   =================================================================== */
function settingtoggle() {
  const container = document.getElementById("setting-container");
  const visualBtn = document.getElementById("visualmodetogglebuttoncontainer");
  const switchSetting = document.getElementById("switchforsetting");

  if (container) container.classList.toggle("settingactivate");
  if (visualBtn) visualBtn.classList.toggle("visualmodeshow");
}
window.settingtoggle = settingtoggle;

function visualmode() {
  document.body.classList.toggle("light-mode");
  const inverts = document.querySelectorAll(".needtobeinvert");
  inverts.forEach((e) => {
    e.classList.toggle("invertapplied");
  });

  const isLight = document.body.classList.contains("light-mode");
  const switchVisual = document.getElementById("switchforvisualmode");
  if (switchVisual) switchVisual.checked = isLight;

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("kishore-theme", isLight ? "light" : "dark");
  }
}
window.visualmode = visualmode;

// Restore saved theme on page load
(function restoreTheme() {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("kishore-theme");
    if (saved === "light") {
      document.body.classList.add("light-mode");
      const switchVisual = document.getElementById("switchforvisualmode");
      if (switchVisual) switchVisual.checked = true;
      const inverts = document.querySelectorAll(".needtobeinvert");
      inverts.forEach((e) => {
        e.classList.add("invertapplied");
      });
    }
  }
})();

// Click outside collapses setting container
document.addEventListener("click", (e) => {
  const container = document.getElementById("setting-container");
  if (container && !container.contains(e.target)) {
    const visualBtn = document.getElementById("visualmodetogglebuttoncontainer");
    const switchSetting = document.getElementById("switchforsetting");
    if (container.classList.contains("settingactivate")) {
      container.classList.remove("settingactivate");
    }
    if (visualBtn && visualBtn.classList.contains("visualmodeshow")) {
      visualBtn.classList.remove("visualmodeshow");
    }
    if (switchSetting) switchSetting.checked = false;
  }
});

function toggleAmbientGlow(input) {
  const blob = document.querySelector(".blob");
  if (blob) {
    blob.style.display = input.checked ? "block" : "none";
  }
}

function toggleAvatarTracking(input) {
  trackingActive = input.checked;
  const pupils = document.querySelectorAll(".footer-pupil");
  if (!trackingActive) {
    pupils.forEach((p) => {
      p.style.transform = "translate(0px, 0px)";
    });
  }
}

/* ===================================================================
   9. A TALE STORY MODAL & RESUME ACTIONS
   =================================================================== */
function openTaleModal(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById("tale-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeTaleModal(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById("tale-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function closeTaleOnOverlay(e) {
  if (e.target && e.target.id === "tale-modal") {
    closeTaleModal(e);
  }
}

function openResume() {
  window.open("mailto:kishorenaik2k06@gmail.com?subject=Resume%20Request%20-%20Kishore%20Naik", "_blank");
}

// Global escape key to dismiss any open modal
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const settingsModal = document.getElementById("settings-modal");
    if (settingsModal && settingsModal.classList.contains("active")) {
      settingsModal.classList.remove("active");
    }
    const taleModal = document.getElementById("tale-modal");
    if (taleModal && taleModal.classList.contains("active")) {
      closeTaleModal();
    }
  }
});

