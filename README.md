# Kishore Naik - Premium Liquid Glass Portfolio & Digital Identity

A modern, high-performance personal developer portfolio and digital identity for **Kishore Naik**, 3rd Year B.Tech Computer Science and Engineering student at Gokula Krishna College of Engineering.

Built with an **Apple-inspired Liquid Glass UI**, dark-mode obsidian aesthetics, frosted glass panels, fluid gradients, responsive navigation, and zero-bloat vanilla web standards.

---

## 🌟 Highlights & Features

1. **Liquid Glass Design System**:
   - Translucent frosted glass layers (`backdrop-filter: blur(20px)`), subtle reflections, and fluid gradients.
   - Ambient dynamic canvas background with flowing liquid orbs and stardust particles.
   - Dark mode primary theme optimized for high contrast, elegance, and battery efficiency.

2. **Dual Navigation & Mobile Experience**:
   - Sticky Glass Header with intelligent dropdown mega-menus (About, Education, Work, More).
   - Floating Glass Bottom Dock for one-touch navigation (Home, About, Projects, Journey, Contact).
   - Full mobile glass drawer menu and top scroll-progress indicator bar.

3. **Dedicated 3-Tier Educational Timeline & Photo System**:
   - **B.Tech Section**: Gokula Krishna College of Engineering (3rd Year CSE) + `[B.Tech Photo Slot]`.
   - **Intermediate Section**: Andhra Pradesh Tribal Welfare Residential College of Excellence (Boys), Yerragondapalem, Prakasam District + `[Intermediate Photo Slot]`.
   - **SSC Section**: Andhra Pradesh Tribal Welfare Residential School (Boys), Narasaraopet + `[School / SSC Photo Slot]`.
   - Dedicated identity preservation system: photos never swap or distort facial identity.

4. **Global Command Palette (`Ctrl + K` or `⌘ + K`)**:
   - Instant search modal across all sections, projects, skills, education, and credentials with direct keyboard jump.

5. **Interactive Problem Solver Visualizer**:
   - Live interactive binary search algorithm tracer with step-by-step execution, pointer tracking (`L`, `MID`, `R`), and complexity log.

6. **Interactive Widgets & Interests**:
   - Digital Bookshelf with click-to-view key takeaways (*Clean Code*, *Algorithms Unlocked*, *Wings of Fire*, *Atomic Habits*).
   - Ambient Soundwave Music Visualizer with active Play/Pause state controls.
   - Respectful Family cards and Roots map radar visual (*Bommarajupalli Thanda, Palnadu District*).

7. **In-Browser Real-Time Photo Manager**:
   - Click **Photos** in the navbar or **Update Photo** on any photo card to select real photos from your computer.
   - Instant live preview in browser without needing to touch code!

8. **Centralized Single Source of Truth (`js/portfolio-data.js`)**:
   - Update any project, skill, social link (`GITHUB_URL`, `LINKEDIN_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL`), or bio in one clean configuration file.

---

## 📂 Project Structure

```
kishore-naik-portfolio/
├── index.html                 # Semantic HTML5 structure & all portfolio sections
├── css/
│   ├── styles.css             # Liquid Glass design system, color variables, typography, reset
│   └── components.css         # Navigation, modals, cards, floating bottom dock, responsive layouts
├── js/
│   ├── portfolio-data.js      # Centralized data store (Single Source of Truth)
│   ├── animations.js          # Ambient liquid canvas background, algorithm & music widgets
│   ├── photo-manager.js       # Live photo replacer & identity preservation manager
│   └── main.js                # Core controller, search palette, filters, modals, form validation
├── assets/
│   ├── images/                # Personal photo slots & SVG mockups
│   │   ├── profile.svg        # Hero profile placeholder
│   │   ├── btech.svg          # B.Tech college placeholder
│   │   ├── intermediate.svg   # Intermediate college placeholder
│   │   ├── ssc.svg            # SSC school placeholder
│   │   ├── project-featured.svg # Featured project mockup
│   │   └── cert-placeholder.svg # Certificate mockup
│   └── documents/             # Resume PDF slot (Kishore_Naik_Resume.pdf)
└── README.md                  # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

Because this project is built using vanilla standards (HTML5, CSS3, ES6 JavaScript), you do not need Node.js, npm, or complex builds.

### Option 1: Direct File Launch
Double-click `index.html` to open it immediately in Google Chrome, Microsoft Edge, Brave, or Firefox.

### Option 2: Live Local Server
If using VS Code or terminal:
```bash
# Using Python (built-in):
python -m http.server 8080

# Or using npx:
npx serve
```
Then visit `http://localhost:8080` in your browser.

---

## 📸 How to Add Your Real Photographs

You have two easy ways to insert your real photos:

### Method A: Using the In-Browser Photo Manager (Zero Code)
1. Open the website in your browser.
2. Click the **Photos** button in the top navigation bar.
3. Click **Browse File** for each of the 4 slots:
   - **Hero Profile Photo**
   - **B.Tech College Photo**
   - **Intermediate College Photo**
   - **School / SSC Photo**
4. Your photos will appear on the website immediately!

### Method B: Permanent File Replacement (For GitHub Pages / Vercel)
Copy your photos into the `assets/images/` folder and name them:
- `assets/images/profile.jpg` (or `.png`)
- `assets/images/btech.jpg`
- `assets/images/intermediate.jpg`
- `assets/images/ssc.jpg`

If you use `.png` or custom names, simply update the file paths in `js/portfolio-data.js` under `PORTFOLIO_DATA.photos`.

---

## 🌐 Deploying to the Web (Free in 2 Minutes)

### 1. GitHub Pages (Recommended)
1. Create a new repository on GitHub named `portfolio` or `<username>.github.io`.
2. Push the files in this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kishore Naik Liquid Glass Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings** → **Pages** → select `main` branch → Click **Save**.
4. Your website will be live at `https://<your-username>.github.io/portfolio/`!

### 2. Vercel or Netlify
1. Drag and drop the `kishore-naik-portfolio` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
2. It will deploy automatically within seconds.

---

## 👤 Personal Profile & Contact Info

- **Full Name**: Kishore Naik
- **College**: Gokula Krishna College of Engineering (3rd Year B.Tech CSE)
- **Native Place**: Bommarajupalli Thanda, Ipur Mandal, Palnadu District, Andhra Pradesh
- **Email**: [kishorenaik2k06@gmail.com](mailto:kishorenaik2k06@gmail.com)
- **Phone / WhatsApp**: [+91 7013741421](https://wa.me/917013741421)
- **Copyright**: © 2026 Kishore Naik. All rights reserved.
