/**
 * ===================================================================
 * KISHORE NAIK - LIQUID GLASS ANIMATIONS & INTERACTIVE WIDGETS
 * ===================================================================
 * Ambient liquid canvas, problem solver algorithm visualizer,
 * music wave visualizer, and micro-interactions.
 */

// ===================================================================
// 1. LIQUID AMBIENT CANVAS BACKGROUND
// ===================================================================
class LiquidAmbientCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.orbs = [];
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.numOrbs = 4;
    this.numParticles = 28;
    this.animId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Liquid Orbs with gentle fluid drift
    const orbColors = [
      'rgba(0, 210, 255, 0.09)',
      'rgba(58, 123, 213, 0.08)',
      'rgba(121, 40, 202, 0.07)',
      'rgba(0, 242, 254, 0.06)'
    ];

    for (let i = 0; i < this.numOrbs; i++) {
      this.orbs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.min(this.width, this.height) * (0.25 + Math.random() * 0.2),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: orbColors[i % orbColors.length]
      });
    }

    // Subtle floating stardust particles
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 1 + Math.random() * 2,
        speedY: -0.15 - Math.random() * 0.25,
        opacity: 0.2 + Math.random() * 0.5
      });
    }

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render soft liquid orbs
    for (const orb of this.orbs) {
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -orb.radius) orb.x = this.width + orb.radius;
      if (orb.x > this.width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = this.height + orb.radius;
      if (orb.y > this.height + orb.radius) orb.y = -orb.radius;

      const gradient = this.ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, orb.radius
      );
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Render subtle particles
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (const p of this.particles) {
      p.y += p.speedY;
      if (p.y < 0) {
        p.y = this.height;
        p.x = Math.random() * this.width;
      }
      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// ===================================================================
// 2. INTERACTIVE PROBLEM SOLVER VISUALIZER (Binary Search Simulator)
// ===================================================================
class BinarySearchVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    this.target = 23;
    this.left = 0;
    this.right = this.array.length - 1;
    this.mid = -1;
    this.step = 0;
    this.found = false;
    this.isPlaying = false;
    this.playInterval = null;

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div style="font-size: 0.85rem; color: #94a3b8;">
            Searching for target: <strong style="color: #00d2ff; font-family: var(--font-mono); font-size: 1rem;">${this.target}</strong>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button id="bs-step-btn" class="btn btn-glass btn-sm" style="padding: 0.35rem 0.8rem; font-size: 0.78rem;">
              Step Forward
            </button>
            <button id="bs-reset-btn" class="btn btn-outline btn-sm" style="padding: 0.35rem 0.8rem; font-size: 0.78rem;">
              Reset
            </button>
          </div>
        </div>

        <!-- Array Elements Container -->
        <div class="bs-array-row" style="display: flex; gap: 6px; justify-content: space-between; margin-bottom: 1.5rem; overflow-x: auto; padding: 0.5rem 0;">
          ${this.array.map((val, idx) => {
      let bg = 'rgba(255, 255, 255, 0.05)';
      let border = 'rgba(255, 255, 255, 0.12)';
      let textColor = '#ffffff';

      if (idx === this.mid) {
        bg = this.found ? 'rgba(34, 197, 94, 0.3)' : 'rgba(0, 210, 255, 0.3)';
        border = this.found ? '#22c55e' : '#00d2ff';
        textColor = this.found ? '#86efac' : '#38bdf8';
      } else if (idx < this.left || idx > this.right) {
        bg = 'rgba(255, 255, 255, 0.01)';
        border = 'rgba(255, 255, 255, 0.04)';
        textColor = '#475569';
      }

      let pointerLabel = '';
      if (idx === this.left && idx === this.right) pointerLabel = 'L,R';
      else if (idx === this.left) pointerLabel = 'L';
      else if (idx === this.right) pointerLabel = 'R';

      return `
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 38px;">
                <div style="font-family: var(--font-mono); font-size: 0.68rem; color: #00d2ff; height: 16px;">
                  ${idx === this.mid ? 'MID' : pointerLabel}
                </div>
                <div style="
                  width: 38px; height: 42px; border-radius: 8px; background: ${bg};
                  border: 1px solid ${border}; display: flex; align-items: center; justify-content: center;
                  font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem; color: ${textColor};
                  transition: all 0.3s ease; box-shadow: ${idx === this.mid ? '0 0 15px rgba(0,210,255,0.4)' : 'none'};
                ">
                  ${val}
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #64748b;">[${idx}]</div>
              </div>
            `;
    }).join('')}
        </div>

        <!-- Status Log -->
        <div id="bs-status-log" style="
          padding: 0.85rem 1rem; border-radius: 8px; background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08); font-family: var(--font-mono);
          font-size: 0.8rem; color: #94a3b8; line-height: 1.5;
        ">
          ${this.getStatusMessage()}
        </div>
      </div>
    `;

    // Bind event listeners
    const stepBtn = document.getElementById('bs-step-btn');
    const resetBtn = document.getElementById('bs-reset-btn');

    if (stepBtn) stepBtn.onclick = () => this.stepForward();
    if (resetBtn) resetBtn.onclick = () => this.reset();
  }

  getStatusMessage() {
    if (this.step === 0) {
      return `Initial state: search range [${this.left}, ${this.right}]. Click <strong>Step Forward</strong> to evaluate middle element.`;
    }
    if (this.found) {
      return `🎯 Match found! nums[${this.mid}] == ${this.target}. Element found at index ${this.mid} in ${this.step} steps (O(log N)).`;
    }
    if (this.left > this.right) {
      return `Element ${this.target} not found in array. Range exhausted.`;
    }
    const val = this.array[this.mid];
    if (val < this.target) {
      return `Step ${this.step}: Mid index is ${this.mid} (val: ${val}). Since ${val} &lt; ${this.target}, target must be in right half. Setting left = ${this.mid + 1}.`;
    } else {
      return `Step ${this.step}: Mid index is ${this.mid} (val: ${val}). Since ${val} &gt; ${this.target}, target must be in left half. Setting right = ${this.mid - 1}.`;
    }
  }

  stepForward() {
    if (this.found || this.left > this.right) return;

    this.step++;
    this.mid = Math.floor(this.left + (this.right - this.left) / 2);

    if (this.array[this.mid] === this.target) {
      this.found = true;
    } else if (this.array[this.mid] < this.target) {
      this.render();
      this.left = this.mid + 1;
      return;
    } else {
      this.render();
      this.right = this.mid - 1;
      return;
    }

    this.render();
  }

  reset() {
    this.left = 0;
    this.right = this.array.length - 1;
    this.mid = -1;
    this.step = 0;
    this.found = false;
    this.render();
  }
}

// ===================================================================
// 3. INTERACTIVE MUSIC VISUALIZER CONTROLLER
// ===================================================================
class MusicVisualizerController {
  constructor() {
    this.bars = document.querySelectorAll('.wave-bar');
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.statusText = document.getElementById('music-status-text');
    this.isPlaying = true;

    if (!this.toggleBtn) return;
    this.init();
  }

  init() {
    this.toggleBtn.addEventListener('click', () => {
      this.isPlaying = !this.isPlaying;
      this.updateState();
    });
  }

  updateState() {
    this.bars.forEach(bar => {
      bar.style.animationPlayState = this.isPlaying ? 'running' : 'paused';
    });

    if (this.statusText) {
      this.statusText.textContent = this.isPlaying ? 'Active Flow • Ambient Beats' : 'Paused';
    }

    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = this.isPlaying
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Play`;
    }
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new LiquidAmbientCanvas('ambient-canvas');
  new BinarySearchVisualizer('binary-search-app');
  new MusicVisualizerController();
});
