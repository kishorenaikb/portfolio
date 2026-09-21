/**
 * ===================================================================
 * KISHORE NAIK - MAIN APPLICATION LOGIC
 * ===================================================================
 * Dynamic rendering, Command Palette (Ctrl+K), section filters,
 * modals, smooth navigation tracking, form validation, and toasts.
 */

// Global Toast Function
window.showToast = function(message, duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// Main App Controller
class PortfolioApp {
  constructor() {
    this.data = PORTFOLIO_DATA;
    this.init();
  }

  init() {
    this.renderInfoCards();
    this.renderSkills('all');
    this.renderProjects('ALL');
    this.renderJourney();
    this.renderAchievements();
    this.renderCertifications();
    this.renderFamily();
    this.renderGallery('all');
    
    this.setupScrollEffects();
    this.setupActiveNavTracking();
    this.setupDropdownMenus();
    this.setupMobileMenu();
    this.setupCommandPalette();
    this.setupProjectModals();
    this.setupGalleryLightbox();
    this.setupContactForm();
    this.setupPhotoManagerModal();
    this.setupKeyboardShortcuts();
  }

  // 1. Render About Info Cards
  renderInfoCards() {
    const container = document.getElementById('about-info-cards');
    if (!container) return;

    container.innerHTML = this.data.personal.infoCards.map(card => `
      <div class="glass-panel glass-panel-hover info-card">
        <div class="info-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4M12 8h.01"></path>
          </svg>
        </div>
        <div class="info-card-label">${card.label}</div>
        <div class="info-card-value">${card.value}</div>
      </div>
    `).join('');
  }

  // 2. Render Skills with Category Filter
  renderSkills(category = 'all') {
    const grid = document.getElementById('skills-grid-container');
    if (!grid) return;

    let items = [];
    if (category === 'all') {
      items = [
        ...this.data.skills.programming.map(s => ({ ...s, group: 'Programming' })),
        ...this.data.skills.development.map(s => ({ ...s, group: 'Development' })),
        ...this.data.skills.core.map(s => ({ ...s, group: 'Core' })),
        ...this.data.skills.interests.map(s => ({ ...s, group: 'Interests' }))
      ];
    } else if (this.data.skills[category]) {
      items = this.data.skills[category].map(s => ({ ...s, group: category }));
    }

    grid.innerHTML = items.map(skill => `
      <div class="glass-panel glass-panel-hover skill-card">
        <div class="skill-header">
          <div class="skill-name-wrap">
            <div class="skill-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div class="skill-title">${skill.name}</div>
          </div>
          <span class="skill-tag-pill">${skill.tag}</span>
        </div>
        <div class="skill-meter-bg">
          <div class="skill-meter-fill" style="width: ${skill.level}%;"></div>
        </div>
      </div>
    `).join('');

    // Tab buttons active toggle
    const tabs = document.querySelectorAll('.skills-filter-tabs .filter-tab-btn');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category') === category);
      tab.onclick = () => this.renderSkills(tab.getAttribute('data-category'));
    });
  }

  // 3. Render Projects with Category Filter
  renderProjects(category = 'ALL') {
    const grid = document.getElementById('projects-grid-container');
    if (!grid) return;

    let filtered = this.data.projects;
    if (category !== 'ALL') {
      filtered = this.data.projects.filter(p => p.category === category || p.tags.includes(category));
    }

    grid.innerHTML = filtered.map(proj => `
      <div class="glass-panel glass-panel-hover project-card">
        <div class="project-top">
          <div class="project-category-row">
            <span class="project-category-tag">${proj.category}</span>
            <span class="project-status-tag">${proj.status}</span>
          </div>
          <h3 class="project-card-title">${proj.title}</h3>
          <p class="project-card-desc">${proj.description}</p>
        </div>
        <div>
          <div class="project-card-tech">
            ${proj.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
          <div class="project-actions-row">
            <button class="btn btn-primary btn-sm view-project-btn" data-project-id="${proj.id}">
              View Details
            </button>
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">
              GitHub
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Rebind project detail modal buttons
    const detailBtns = grid.querySelectorAll('.view-project-btn');
    detailBtns.forEach(btn => {
      btn.onclick = () => this.openProjectModal(btn.getAttribute('data-project-id'));
    });

    // Tab buttons active toggle
    const tabs = document.querySelectorAll('.projects-filter-bar .filter-tab-btn');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === category);
      tab.onclick = () => this.renderProjects(tab.getAttribute('data-filter'));
    });
  }

  // 4. Render Journey Timeline
  renderJourney() {
    const container = document.getElementById('journey-nodes-container');
    if (!container) return;

    container.innerHTML = this.data.journey.map((node, index) => `
      <div class="glass-panel glass-panel-hover journey-node-card" data-journey-index="${index}">
        <div class="journey-stage-row">
          <span class="journey-stage-tag">${node.stage}</span>
          <span class="journey-year-tag">${node.year}</span>
        </div>
        <h4 class="journey-title">${node.title}</h4>
        <div class="journey-inst">${node.institution}</div>
        <p class="journey-desc">${node.details}</p>
      </div>
    `).join('');
  }

  // 5. Render Achievements
  renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    grid.innerHTML = this.data.achievements.map(item => `
      <div class="glass-panel glass-panel-hover achievement-card">
        <div class="trophy-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"></path>
            <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: #f5af19; font-weight: 700; margin-bottom: 0.2rem;">
            ${item.category} • ${item.date}
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
            ${item.title}
          </h4>
          <div style="font-size: 0.85rem; color: #00d2ff; margin-bottom: 0.5rem;">
            ${item.organization}
          </div>
          <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.5;">
            ${item.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  // 6. Render Certifications
  renderCertifications() {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;

    grid.innerHTML = this.data.certifications.map(cert => `
      <div class="glass-panel glass-panel-hover cert-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span class="cert-id-tag">${cert.credentialId}</span>
            <span style="font-size: 0.8rem; color: #94a3b8;">${cert.date}</span>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
            ${cert.title}
          </h4>
          <div style="font-size: 0.88rem; color: #00d2ff; margin-bottom: 0.75rem;">
            ${cert.organization}
          </div>
          <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.6;">
            ${cert.description}
          </p>
        </div>
        <div style="padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06);">
          <button class="btn btn-glass btn-sm view-cert-btn" data-cert-id="${cert.credentialId}">
            View Certificate
          </button>
        </div>
      </div>
    `).join('');

    const certBtns = grid.querySelectorAll('.view-cert-btn');
    certBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cert-id');
        const cert = this.data.certifications.find(c => c.credentialId === id);
        if (cert) this.openCertificateModal(cert);
      };
    });
  }

  // 7. Render Family
  renderFamily() {
    const grid = document.getElementById('family-grid');
    if (!grid) return;

    grid.innerHTML = this.data.family.map(mem => `
      <div class="glass-panel glass-panel-hover family-card">
        <div class="family-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <div class="family-rel-title">${mem.title}</div>
          <div class="family-name-kin">${mem.relationship}</div>
          <div class="family-desc-text">${mem.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // 8. Render Gallery
  renderGallery(category = 'all') {
    const grid = document.getElementById('gallery-grid-container');
    if (!grid) return;

    let filtered = this.data.gallery;
    if (category !== 'all') {
      filtered = this.data.gallery.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    grid.innerHTML = filtered.map(item => {
      const src = PhotoManager.getPhotoSrc(item.isPhotoSlot) || item.image;
      return `
        <div class="gallery-item" data-src="${src}" data-title="${item.title}" data-caption="${item.caption}">
          <img src="${src}" alt="${item.title}" class="gallery-img" data-photo-slot="${item.isPhotoSlot}">
          <div class="gallery-overlay">
            <span class="gallery-item-cat">${item.category}</span>
            <div class="gallery-item-title">${item.title}</div>
          </div>
        </div>
      `;
    }).join('');

    // Rebind lightbox clicks
    const items = grid.querySelectorAll('.gallery-item');
    items.forEach(el => {
      el.onclick = () => {
        const src = el.getAttribute('data-src');
        const title = el.getAttribute('data-title');
        const caption = el.getAttribute('data-caption');
        this.openLightbox(src, title, caption);
      };
    });

    // Gallery Filter Tabs
    const tabs = document.querySelectorAll('.gallery-filter-bar .filter-tab-btn');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === category);
      tab.onclick = () => this.renderGallery(tab.getAttribute('data-filter'));
    });
  }

  // 9. Scroll Effects: Progress Bar, Header Blur, Back-To-Top
  setupScrollEffects() {
    const header = document.querySelector('.glass-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / (scrollHeight || 1)) * 100;

      if (progressBar) progressBar.style.width = `${progress}%`;

      if (header) {
        if (scrollTop > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }

      if (backToTopBtn) {
        if (scrollTop > 400) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // 10. Active Navigation Tracking (IntersectionObserver)
  setupActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .dock-item, .mobile-nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(s => observer.observe(s));
  }

  // 11. Mobile Navigation Menu Toggle
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const drawer = document.getElementById('mobile-drawer');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('active');
      toggleBtn.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('active');
        toggleBtn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 12. Global Command Palette (Ctrl + K)
  setupCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    const triggerBtn = document.getElementById('search-trigger-btn');
    const input = document.getElementById('cmd-search-input');
    const resultsContainer = document.getElementById('cmd-results-list');
    const closeBtn = document.getElementById('cmd-close-btn');

    if (!modal || !input || !resultsContainer) return;

    // Search Index
    const searchIndex = [
      { title: "Home / Hero Section", section: "hero", type: "Section" },
      { title: "About Kishore Naik", section: "about", type: "About" },
      { title: "My Roots (Bommarajupalli Thanda, Palnadu)", section: "roots", type: "Heritage" },
      { title: "Education: B.Tech (Gokula Krishna College of Engg)", section: "education", type: "Education" },
      { title: "Education: Intermediate (College of Excellence, Yerragondapalem)", section: "education", type: "Education" },
      { title: "Education: SSC (APTWR School, Narasaraopet)", section: "education", type: "Education" },
      { title: "Skills: Python, Java, C, C++, JavaScript", section: "skills", type: "Skills" },
      { title: "Problem Solver & Algorithm Visualizer", section: "problem-solver", type: "Core Focus" },
      { title: "Projects: Interactive Algorithm Visualizer", section: "projects", type: "Project" },
      { title: "Projects: Student Academic & Grade Tracker", section: "projects", type: "Project" },
      { title: "Projects: Smart Task & Study Planner", section: "projects", type: "Project" },
      { title: "My Journey Timeline", section: "journey", type: "Journey" },
      { title: "Achievements & Competitions", section: "achievements", type: "Achievements" },
      { title: "Certifications", section: "certifications", type: "Credentials" },
      { title: "Experience: Current & Technical", section: "experience", type: "Experience" },
      { title: "Interests: Bookshelf, Music Visualizer, Gaming", section: "interests", type: "Interests" },
      { title: "Family Members", section: "family", type: "Personal" },
      { title: "Gallery & Memories", section: "gallery", type: "Gallery" },
      { title: "Resume Summary & Download PDF", section: "resume", type: "Resume" },
      { title: "Contact Information & Form", section: "contact", type: "Contact" }
    ];

    const openPalette = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      input.value = '';
      renderResults(searchIndex);
      setTimeout(() => input.focus(), 50);
    };

    const closePalette = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const renderResults = (items) => {
      if (items.length === 0) {
        resultsContainer.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: #64748b;">No matching results found</li>`;
        return;
      }
      resultsContainer.innerHTML = items.map((item, idx) => `
        <li class="cmd-result-item ${idx === 0 ? 'selected' : ''}" data-section="${item.section}">
          <span>${item.title}</span>
          <span style="font-size: 0.75rem; color: #00d2ff; background: rgba(0, 210, 255, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px;">
            ${item.type}
          </span>
        </li>
      `).join('');

      // Click to jump
      resultsContainer.querySelectorAll('.cmd-result-item').forEach(el => {
        el.onclick = () => {
          const targetId = el.getAttribute('data-section');
          closePalette();
          const targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        };
      });
    };

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = searchIndex.filter(item => 
        item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        modal.classList.contains('active') ? closePalette() : openPalette();
      } else if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePalette();
      }
    });
  }

  // 13. Project Case Study Modal
  setupProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('project-modal-close');
    if (!modal) return;

    this.openProjectModal = (projId) => {
      const proj = this.data.projects.find(p => p.id === projId);
      if (!proj) return;

      document.getElementById('p-modal-title').textContent = proj.title;
      document.getElementById('p-modal-category').textContent = `${proj.category} • ${proj.status}`;
      document.getElementById('p-modal-problem').textContent = proj.problem;
      document.getElementById('p-modal-solution').textContent = proj.solution;
      
      const featContainer = document.getElementById('p-modal-features');
      featContainer.innerHTML = proj.features.map(f => `<li>${f}</li>`).join('');

      const techContainer = document.getElementById('p-modal-tech');
      techContainer.innerHTML = proj.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('');

      document.getElementById('p-modal-github').href = proj.githubUrl;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 14. Certificate Modal
  openCertificateModal(cert) {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;

    document.getElementById('cert-modal-title').textContent = cert.title;
    document.getElementById('cert-modal-org').textContent = `${cert.organization} (${cert.date})`;
    document.getElementById('cert-modal-id').textContent = `Credential ID: ${cert.credentialId}`;
    document.getElementById('cert-modal-desc').textContent = cert.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('cert-modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }
  }

  // 15. Lightbox Viewer
  setupGalleryLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal || !imgEl) return;

    this.openLightbox = (src, title, caption) => {
      imgEl.src = src;
      titleEl.textContent = title || '';
      captionEl.textContent = caption || '';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.onclick = closeLightbox;
    modal.onclick = (e) => {
      if (e.target === modal) closeLightbox();
    };
  }

  // 16. Contact Form Validation & Submission
  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#form-name').value.trim();
      const email = form.querySelector('#form-email').value.trim();
      const subject = form.querySelector('#form-subject').value.trim();
      const message = form.querySelector('#form-message').value.trim();

      if (!name || !email || !subject || !message) {
        window.showToast("Please fill in all required fields.");
        return;
      }

      // Simple regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast("Please enter a valid email address.");
        return;
      }

      // Form submission success feedback
      window.showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      form.reset();
    });
  }

  // 17. Photo Manager Modal setup
  setupPhotoManagerModal() {
    const openBtns = document.querySelectorAll('.open-photo-manager-btn');
    const closeBtn = document.getElementById('photo-modal-close');
    const resetAllBtn = document.getElementById('photo-modal-reset-all');

    openBtns.forEach(btn => {
      btn.onclick = () => {
        const slot = btn.getAttribute('data-slot');
        PhotoManager.openModal(slot);
      };
    });

    if (closeBtn) closeBtn.onclick = () => PhotoManager.closeModal();
    if (resetAllBtn) resetAllBtn.onclick = () => PhotoManager.resetAll();

    // Bind file inputs inside Photo Manager
    ['heroProfile', 'btechPhoto', 'intermediatePhoto', 'sscPhoto'].forEach(slot => {
      const input = document.getElementById(`input-file-${slot}`);
      if (input) {
        input.addEventListener('change', (e) => {
          PhotoManager.handleFileSelect(slot, e.target.files[0]);
        });
      }
    });
  }

  // 18. Global Escape Key Listener for Modals
  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => {
          m.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
  }

  // 19. Desktop & Touch Dropdown Navigation
  setupDropdownMenus() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      const parentLink = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-menu');
      if (!dropdown || !parentLink) return;

      // Click to toggle on desktop/touch
      parentLink.addEventListener('click', (e) => {
        const isOpen = item.classList.contains('open');
        navItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          e.preventDefault();
          item.classList.add('open');
        }
      });

      // Clicking any dropdown option smoothly scrolls to section and closes dropdown
      const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
      dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            item.classList.remove('open');
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        navItems.forEach(item => item.classList.remove('open'));
      }
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
