/**
 * ===================================================================
 * KISHORE NAIK - PORTFOLIO INTERACTION ENGINE
 * Exact Reference Site Animations & Logic
 * Source: https://kishore-portfolio-site.netlify.app/
 * ===================================================================
 */

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
   =================================================================== */
let barcodePrintTimer = null;
let barcodeResetTimer = null;
let isBarcodePrinting = false;
let isBarcodeShowingName = false;

function toggleBarcode(element) {
  const box = element || document.getElementById("barcode-box");
  const textEl = document.getElementById("barcode-print-text") || (box ? box.querySelector(".textt") : null);
  const barcodeImg = box ? box.querySelector(".iamge") : null;
  if (!box || !textEl || !barcodeImg) return;

  // If already showing name and user clicks again -> smoothly return back to barcode!
  if (isBarcodeShowingName) {
    resetBarcodeToOriginal(box, textEl, barcodeImg);
    return;
  }

  // If currently printing, ignore rapid clicks
  if (isBarcodePrinting) return;

  // Clear timers
  if (barcodePrintTimer) clearInterval(barcodePrintTimer);
  if (barcodeResetTimer) clearTimeout(barcodeResetTimer);

  isBarcodePrinting = true;
  box.classList.add("clicked");
  barcodeImg.style.display = "none";
  textEl.style.display = "inline-block";
  textEl.style.opacity = "1";
  textEl.textContent = "";

  const fullName = "Kishore Naik";
  let charIdx = 0;

  // Smooth medium slow motion character-by-character printing (~165ms per char)
  barcodePrintTimer = setInterval(() => {
    if (charIdx < fullName.length) {
      textEl.textContent = fullName.substring(0, charIdx + 1);
      charIdx++;
    } else {
      clearInterval(barcodePrintTimer);
      barcodePrintTimer = null;
      isBarcodePrinting = false;
      isBarcodeShowingName = true;

      // Stay visible smoothly so the user can see their full name, then automatically return back to barcode!
      barcodeResetTimer = setTimeout(() => {
        resetBarcodeToOriginal(box, textEl, barcodeImg);
      }, 2600);
    }
  }, 165);
}

function resetBarcodeToOriginal(box, textEl, barcodeImg) {
  if (barcodePrintTimer) {
    clearInterval(barcodePrintTimer);
    barcodePrintTimer = null;
  }
  if (barcodeResetTimer) {
    clearTimeout(barcodeResetTimer);
    barcodeResetTimer = null;
  }
  isBarcodePrinting = false;
  isBarcodeShowingName = false;

  // Smooth fade out of name and fade in of original barcode
  textEl.style.transition = "opacity 0.25s ease";
  textEl.style.opacity = "0";

  setTimeout(() => {
    textEl.style.display = "none";
    textEl.textContent = "";
    box.classList.remove("clicked");
    barcodeImg.style.display = "flex";
    barcodeImg.style.opacity = "0";
    void barcodeImg.offsetWidth;
    barcodeImg.style.transition = "opacity 0.35s ease";
    barcodeImg.style.opacity = "1";
  }, 250);
}

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

  // Dynamic accents matching card
  const circle = document.getElementById("moving-circle");
  const roadProgress = document.getElementById("road-progress");

  if (houseId === "house1") {
    // School: Light Yellowish
    if (circle) {
      circle.style.background = "var(--accent-yellow)";
      circle.style.boxShadow = "0 0 18px #fbbf24, 0 0 30px rgba(251, 191, 36, 0.6)";
    }
    if (roadProgress) {
      roadProgress.style.background = "linear-gradient(90deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.5))";
      roadProgress.style.boxShadow = "0 0 15px rgba(251, 191, 36, 0.4)";
    }
  } else if (houseId === "house2") {
    // Intermediate: Pink
    if (circle) {
      circle.style.background = "var(--accent-pink)";
      circle.style.boxShadow = "0 0 18px #ec4899, 0 0 30px rgba(236, 72, 153, 0.6)";
    }
    if (roadProgress) {
      roadProgress.style.background = "linear-gradient(90deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.5))";
      roadProgress.style.boxShadow = "0 0 15px rgba(236, 72, 153, 0.4)";
    }
  } else if (houseId === "house3") {
    // B.Tech College: Blue
    if (circle) {
      circle.style.background = "var(--accent-blue)";
      circle.style.boxShadow = "0 0 18px #00d2ff, 0 0 30px rgba(0, 210, 255, 0.6)";
    }
    if (roadProgress) {
      roadProgress.style.background = "linear-gradient(90deg, rgba(0, 210, 255, 0.2), rgba(0, 210, 255, 0.5))";
      roadProgress.style.boxShadow = "0 0 15px rgba(0, 210, 255, 0.4)";
    }
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
  let pupils = Array.from(document.getElementsByClassName("footer-pupil"));

  // Ensure head never moves or rotates
  if (avatar) {
    avatar.style.transform = "none";
  }

  const pupilStartPoint = -10;
  const pupilRangeX = 20;
  const pupilRangeY = 15;

  function directPupilGaze(targetX, targetY, isClick = false) {
    if (!trackingActive) return;
    if (pupils.length === 0) {
      pupils = Array.from(document.getElementsByClassName("footer-pupil"));
    }
    if (pupils.length === 0) return;

    const mouseXRange = window.innerWidth || 1;
    const mouseYRange = window.innerHeight || 1;
    const fracXValue = Math.max(0, Math.min(1, targetX / mouseXRange));
    const fracYValue = Math.max(0, Math.min(1, targetY / mouseYRange));

    const t = pupilStartPoint + fracXValue * pupilRangeX;
    const o = pupilStartPoint + fracYValue * pupilRangeY;

    pupils.forEach((p) => {
      p.style.transition = isClick ? "transform 0.16s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.04s linear";
      p.style.transform = `translate(${t.toFixed(1)}px, ${o.toFixed(1)}px)`;
    });
  }

  // Click tracking: Clicking anywhere turns ONLY the eyes to that side
  document.addEventListener("click", (e) => {
    directPupilGaze(e.clientX, e.clientY, true);
  });

  // Mobile tap tracking
  document.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      directPupilGaze(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  }, { passive: true });

  // Smooth mouse movement cursor tracking
  let throttle = false;
  window.addEventListener("mousemove", (e) => {
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
   8. SETTING SYMBOL ACTION (Expands to Small Bar Like Resume Button Only)
   =================================================================== */
function toggleSettingBar(btn, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const button = btn || document.getElementById("setting-btn");
  if (button) {
    // Does not open any modal or window; toggles small bar like the resume button
    button.classList.toggle("active-bar");
  }
}

// Click outside collapses the small setting bar
document.addEventListener("click", (e) => {
  const settingBtn = document.getElementById("setting-btn");
  if (settingBtn && !settingBtn.contains(e.target)) {
    settingBtn.classList.remove("active-bar");
  }
});

function toggleAmbientGlow(input) {
  const blob = document.querySelector(".blob");
  if (blob) {
    blob.style.display = input.checked ? "block" : "none";
  }
}

let trackingActive = true;
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

