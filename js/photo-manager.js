/**
 * ===================================================================
 * KISHORE NAIK - DEDICATED PHOTO MANAGER & REAL-TIME PREVIEW
 * ===================================================================
 * Preserves actual facial identity with zero AI alteration.
 * Allows Kishore to preview, upload, and update photos for:
 * 1. Hero Profile Photo
 * 2. B.Tech College Photo
 * 3. Intermediate College Photo
 * 4. School / SSC Photo
 *
 * Supports localStorage live persistence and direct asset replacement.
 */

const PhotoManager = {
  // Storage keys for localStorage
  STORAGE_KEYS: {
    heroProfile: "kishore_photo_heroProfile",
    btechPhoto: "kishore_photo_btechPhoto",
    intermediatePhoto: "kishore_photo_intermediatePhoto",
    sscPhoto: "kishore_photo_sscPhoto"
  },

  // Fallback SVG Placeholders if local files aren't found yet
  FALLBACK_SVGS: {
    heroProfile: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%230c1427"/><circle cx="200" cy="180" r="75" fill="%231e293b" stroke="%2300d2ff" stroke-width="2"/><path d="M100 420 C100 310, 300 310, 300 420 Z" fill="%231e293b" stroke="%2300d2ff" stroke-width="2"/><text x="200" y="460" font-family="sans-serif" font-size="14" fill="%237dd3fc" text-anchor="middle" font-weight="600">KISHORE NAIK • PROFILE PHOTO</text><text x="200" y="480" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">Click 'Update Photo' to upload</text></svg>`,
    btechPhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%230c1427"/><polygon points="200,80 320,150 200,220 80,150" fill="%231e293b" stroke="%2300d2ff" stroke-width="2"/><rect x="140" y="220" width="120" height="100" fill="%231e293b" stroke="%2338bdf8" stroke-width="2"/><text x="200" y="360" font-family="sans-serif" font-size="14" fill="%237dd3fc" text-anchor="middle" font-weight="600">B.TECH COLLEGE PHOTO</text><text x="200" y="380" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">Gokula Krishna College of Engg</text></svg>`,
    intermediatePhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%230c1427"/><path d="M140 120 L260 120 L280 280 L120 280 Z" fill="%231e293b" stroke="%237928ca" stroke-width="2"/><circle cx="200" cy="180" r="35" fill="%230f172a" stroke="%23a855f7" stroke-width="2"/><text x="200" y="340" font-family="sans-serif" font-size="14" fill="%23c084fc" text-anchor="middle" font-weight="600">INTERMEDIATE PHOTO</text><text x="200" y="360" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">College of Excellence, Yerragondapalem</text></svg>`,
    sscPhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%230c1427"/><rect x="130" y="110" width="140" height="180" rx="12" fill="%231e293b" stroke="%2300f2fe" stroke-width="2"/><circle cx="200" cy="170" r="30" fill="%230f172a" stroke="%2338bdf8" stroke-width="2"/><text x="200" y="340" font-family="sans-serif" font-size="14" fill="%2367e8f9" text-anchor="middle" font-weight="600">SSC / SCHOOL PHOTO</text><text x="200" y="360" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">APTWR School, Narasaraopet</text></svg>`
  },

  // Get active image src for a given slot
  getPhotoSrc(slotKey) {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS[slotKey]);
      if (stored) return stored;
    } catch (e) {
      console.warn("LocalStorage unavailable for photos:", e);
    }
    return PORTFOLIO_DATA.photos[slotKey] || this.FALLBACK_SVGS[slotKey];
  },

  // Save uploaded photo to localStorage and update DOM
  setPhoto(slotKey, dataUrl) {
    try {
      localStorage.setItem(this.STORAGE_KEYS[slotKey], dataUrl);
    } catch (e) {
      console.warn("LocalStorage save error:", e);
      if (window.showToast) {
        window.showToast("Storage quota reached. The photo is displayed for this session.");
      }
    }
    this.updateDomPhoto(slotKey, dataUrl);
  },

  // Clear a photo from localStorage (revert to config/placeholder)
  resetPhoto(slotKey) {
    try {
      localStorage.removeItem(this.STORAGE_KEYS[slotKey]);
    } catch (e) { }
    const defaultSrc = PORTFOLIO_DATA.photos[slotKey] || this.FALLBACK_SVGS[slotKey];
    this.updateDomPhoto(slotKey, defaultSrc);
  },

  // Revert all photos
  resetAll() {
    Object.keys(this.STORAGE_KEYS).forEach(k => this.resetPhoto(k));
    if (window.showToast) {
      window.showToast("All photo slots reverted to default configuration.");
    }
  },

  // Update DOM elements referencing this slot
  updateDomPhoto(slotKey, src) {
    const images = document.querySelectorAll(`[data-photo-slot="${slotKey}"]`);
    images.forEach(img => {
      img.src = src;
    });

    // Also update preview inside photo manager modal if open
    const preview = document.getElementById(`modal-preview-${slotKey}`);
    if (preview) {
      preview.src = src;
    }
  },

  // Setup error handlers for broken file paths to gracefully fallback to clean SVG
  setupFallbackHandlers() {
    const images = document.querySelectorAll('[data-photo-slot]');
    images.forEach(img => {
      const slotKey = img.getAttribute('data-photo-slot');
      img.onerror = () => {
        if (this.FALLBACK_SVGS[slotKey]) {
          img.src = this.FALLBACK_SVGS[slotKey];
        }
      };
      // Initial load check
      const activeSrc = this.getPhotoSrc(slotKey);
      if (activeSrc) {
        img.src = activeSrc;
      }
    });
  },

  // Handle file input selection
  handleFileSelect(slotKey, file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      this.setPhoto(slotKey, dataUrl);
      if (window.showToast) {
        window.showToast(`Updated ${slotKey} photo successfully!`);
      }
    };
    reader.readAsDataURL(file);
  },

  // Open the Photo Manager Modal
  openModal(preselectedSlot) {
    const modal = document.getElementById('photo-manager-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (preselectedSlot) {
        const targetCard = document.getElementById(`photo-card-${preselectedSlot}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth' });
          targetCard.style.borderColor = '#00d2ff';
          setTimeout(() => targetCard.style.borderColor = '', 2000);
        }
      }
    }
  },

  // Close the Photo Manager Modal
  closeModal() {
    const modal = document.getElementById('photo-manager-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PhotoManager.setupFallbackHandlers();
});
