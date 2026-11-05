# PricePilot – Simple Plans, Smarter Choices

> **Internship Task 3 — Full Stack Web Development Internship**  
> A complete, responsive, and visually modern SaaS pricing website built with pure HTML5, CSS3, and Vanilla JavaScript (ES6+).

---

## 🚀 Live Demo & Project Overview

**PricePilot** is a SaaS pricing landing page designed for digital product startups, creator teams, and enterprise platforms. It features three subscription tiers (**Starter**, **Professional**, and **Enterprise**), an interactive **Monthly/Yearly billing toggle** offering 20% annual savings, badge ribbons for highlighted plans, smooth CSS hover transitions, and an expandable FAQ accordion.

The site is designed using a dark navy and electric purple palette (`#0B1020`, `#11182B`, `#8B5CF6`, `#A78BFA`, and emerald accent `#34D399`) inspired by modern SaaS interfaces like Stripe and Linear.

---

## 🎯 Project Objectives

1. **Dynamic Pricing Switching:** Implement an accessible Monthly/Yearly billing toggle that updates prices across all three plans dynamically using HTML5 data attributes without duplicating pricing data in JavaScript.
2. **Interactive UI & Visual Hierarchy:** Emphasize the most popular plan (**Professional**) with glowing purple gradient borders, elevation scale, and ribbon badges.
3. **Smooth CSS Transitions & Transforms:** Implement hardware-accelerated lift effects (`translateY(-6px)`), box-shadow glows, and sliding pill indicators.
4. **Responsive Layout:** Utilize CSS Grid and Flexbox to deliver single-row layouts on desktop (1280px+), adapted layouts on tablet, and stacked single-column layouts on mobile (<800px) with the **Popular plan displayed first**.
5. **Accessibility & Standards:** Comply with WCAG 2.1 contrast standards (≥4.5:1), semantic HTML elements, real `<button>` components with `aria-pressed`, `aria-expanded`, and support for `prefers-reduced-motion`.
6. **No External Libraries:** Built purely with Vanilla HTML, CSS, and JavaScript without Bootstrap, Tailwind, React, or jQuery.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Modern CSS variables, CSS Grid, Flexbox, custom ribbons, backdrop blur, `@keyframes`, and media queries.
- **Vanilla JavaScript (ES6+):** DOM manipulation, event listeners, dynamic data-attribute parsing, Indian Rupee (`₹`) number formatting, and modal state management.
- **Fonts:** Google Fonts (*Plus Jakarta Sans* for headings & *Inter* for body typography).

---

## 📂 Project Structure

```text
PricePilot/
│
├── index.html         # Semantic HTML5 markup and plan data attributes
├── style.css          # Design system, CSS Grid, animations, and media queries
├── script.js          # Billing toggle logic, DOM updates, FAQ accordion & modal
└── README.md          # Comprehensive project documentation and test checklist
```

---

## 💡 How the Monthly / Yearly Billing Toggle Works

The pricing values are stored directly inside the HTML markup using `data-monthly` and `data-yearly` attributes:

```html
<span class="price-value" data-monthly="999" data-yearly="9590">999</span>
```

### Dynamic Switch Flow (`script.js`):
1. **Event Trigger:** When a user clicks either the **Monthly** or **Yearly** button (or uses Left/Right arrow keys), the function `setBillingPeriod(period)` is executed.
2. **State & ARIA Updates:**
   - Adds/removes the `.active` class on the clicked button.
   - Updates `aria-pressed="true"` or `aria-pressed="false"`.
   - Slides the glowing background indicator pill across the toggle switch using CSS transform (`translateX(100%)`).
3. **Data Attribute Extraction:**
   - The function selects all `.price-value` elements.
   - It retrieves either the `data-yearly` or `data-monthly` attribute.
   - Formats the raw integer into standard Indian Rupee notation with commas (e.g., `4790` → `4,790`) via `Number.prototype.toLocaleString('en-IN')`.
4. **Label & Savings Calculation:**
   - Switches period labels between `/ month` and `/ year`.
   - Computes annual rupee savings dynamically for yearly billing and displays a celebratory savings tag (e.g., `🎉 You save ₹2,398 / year (~20% off)`).
   - Announces the change to screen readers via a live region (`aria-live="polite"`).

---

## 🎨 CSS Transitions and Transform Effects

- **Pricing Card Lift Effect:**
  ```css
  .pricing-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .pricing-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55), 0 0 25px rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
  }
  ```
- **Featured Plan Emphasis:**
  The **Professional** plan is scaled (`transform: scale(1.03)`) on desktop, surrounded by a purple gradient border and glowing drop shadow.
- **Rotated Ribbon Badges:**
  Crafted with clean CSS transforms (`transform: rotate(45deg)`) inside an overflow-clipped container to create sharp corner ribbons ("MOST POPULAR" and "BEST VALUE").
- **Accessibility (`prefers-reduced-motion`):**
  Users who configure their operating systems for reduced motion automatically have animations and transforms disabled or minimized to prevent vertigo or motion sickness:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .pricing-card:hover {
      transform: none !important;
    }
  }
  ```

---

## 📱 Responsive Layout Details

- **Desktop (1280px and above):** 3 cards displayed side-by-side using CSS Grid (`grid-template-columns: repeat(3, 1fr)`) with the middle card prominently elevated.
- **Laptop (1024px):** Proportional grid layout with tuned padding to prevent line wraps.
- **Tablet & Mobile (<800px):**
  - Stacks cards into a single-column layout.
  - Utilizes CSS Grid ordering:
    ```css
    .card-popular { order: -1; }
    .card-starter { order: 1; }
    .card-enterprise { order: 2; }
    ```
    This ensures mobile users see the **Most Popular** plan first as mandated in the learner requirements.
  - Hamburger navigation toggle replaces the desktop link bar.
  - Prevents horizontal viewport scrolling (`overflow-x: hidden`).
  - Touch targets maintain a minimum dimension of 44×44px for effortless mobile tapping.

---

## 📋 Comprehensive Testing Checklist

| Test Item | Specification | Status |
|---|---|---|
| **Default Period** | Monthly billing selected by default on page load | ✅ Verified |
| **Yearly Switch** | Clicking Yearly updates all 3 prices to yearly rates (₹4,790, ₹9,590, ₹19,190) | ✅ Verified |
| **Monthly Restore** | Clicking Monthly restores original monthly rates (₹499, ₹999, ₹1,999) | ✅ Verified |
| **Period Labels** | Labels switch between `/ month` and `/ year` dynamically | ✅ Verified |
| **Active Toggle Style** | Indicator pill slides smoothly and active button text highlights | ✅ Verified |
| **Badge Ribbons** | "MOST POPULAR" ribbon on Pro, "BEST VALUE" ribbon on Enterprise | ✅ Verified |
| **Hover Lift** | Cards smoothly elevate with `translateY(-6px)` and glowing shadow | ✅ Verified |
| **Accessibility (ARIA)** | `aria-pressed`, `aria-expanded`, and `aria-live` status regions implemented | ✅ Verified |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` disables transforms/animations | ✅ Verified |
| **CTA Buttons** | Each CTA button triggers an interactive demo checkout modal with chosen plan details | ✅ Verified |
| **FAQ Accordion** | Expandable accordions toggle smoothly with `aria-expanded` and rotating arrows | ✅ Verified |
| **Mobile Layout (360px–800px)** | Stacks cards vertically with Popular plan displayed first, no horizontal overflow | ✅ Verified |
| **Desktop Layout (1280px+)** | 3-column grid with Professional plan highlighted and elevated | ✅ Verified |
| **Keyboard Navigation** | Full keyboard tab order and Arrow key toggle navigation between billing buttons | ✅ Verified |

---

## 💻 How to Run Locally

### Method 1: Using VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and choose the `internship_3` directory.
3. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Marketplace if not already installed.
4. Right-click on `index.html` and select **Open with Live Server**.
5. The site will automatically launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
1. Navigate to the project folder in File Explorer.
2. Double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Brave, Safari).

---

## 🌐 GitHub Pages Deployment Guide

1. **Initialize Git & Commit:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete PricePilot responsive pricing website (Task 3)"
   ```
2. **Create a GitHub Repository:**
   - Create a new public repository on [GitHub](https://github.com/new) named `PricePilot` or `internship-task-3`.
3. **Push to GitHub:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```
4. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub (**Settings > Pages**).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and root `/ (root)`, then click **Save**.
   - Within 1–2 minutes, your live URL will be active at:
     `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`

---

## 📜 Educational Disclaimer
All plan prices and features are fictional demonstration values designed for educational assessment (Internship Task 3). No actual charges or payments are processed.

