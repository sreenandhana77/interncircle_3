/**
 * ==============================================================================
 * PricePilot – Simple Plans, Smarter Choices
 * Script for Internship Task 3 (Full Stack Web Development Internship)
 * ==============================================================================
 * 
 * Features implemented:
 * 1. Dynamic Monthly/Yearly Billing Toggle with data-attributes
 * 2. Animated price transitions and currency formatting (₹ INR)
 * 3. Accessible ARIA states (aria-pressed, aria-expanded, aria-live)
 * 4. FAQ Accordion with smooth height transitions
 * 5. Responsive Mobile Navigation menu
 * 6. Interactive Plan Confirmation Modal & Toast notifications
 * 7. Header scroll shadow detection & smooth in-page navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. DOM Element Selectors
  // ----------------------------------------------------------------------------
  const billingMonthlyBtn = document.getElementById('billingMonthlyBtn');
  const billingYearlyBtn = document.getElementById('billingYearlyBtn');
  const toggleWrapper = document.querySelector('.billing-toggle-wrapper');
  const discountBadge = document.getElementById('discountBadge');
  const billingStatusAnnouncer = document.getElementById('billingPeriodStatus');
  const priceElements = document.querySelectorAll('.price-value');
  const periodLabels = document.querySelectorAll('.billing-period-label');
  const savingsNotes = document.querySelectorAll('.card-savings-note');

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Mobile Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  const siteHeader = document.getElementById('header');

  // Interactive Plan Modal & CTAs
  const planModal = document.getElementById('planModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContinueBtn = document.getElementById('modalContinueBtn');
  const modalPlanTitle = document.getElementById('modalPlanTitle');
  const modalBillingCycle = document.getElementById('modalBillingCycle');
  const modalPrice = document.getElementById('modalPrice');
  const cardActionButtons = document.querySelectorAll('.card-btn');
  const toastContainer = document.getElementById('toastContainer');
  const currentYearSpan = document.getElementById('currentYear');

  // Set dynamic copyright year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Current billing state: 'monthly' (default) or 'yearly'
  let currentBillingPeriod = 'monthly';

  // ----------------------------------------------------------------------------
  // 2. Helper Functions
  // ----------------------------------------------------------------------------

  /**
   * Formats raw numerical price strings into standard Indian Rupee notation (e.g. 4790 -> 4,790).
   * @param {string|number} value - The numerical price to format
   * @returns {string} Formatted number with comma separators
   */
  function formatCurrencyINR(value) {
    const num = Number(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-IN');
  }

  /**
   * Displays a temporary, accessible toast notification on screen.
   * @param {string} message - Message to display
   */
  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 20 20" fill="#34D399" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove toast after 3.5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  // ----------------------------------------------------------------------------
  // 3. Billing Period Toggle Logic (Core Requirement)
  // ----------------------------------------------------------------------------

  /**
   * Switches the active billing frequency between 'monthly' and 'yearly'.
   * 
   * As specified in the learner requirements:
   * 1. Selects all pricing elements
   * 2. Reads the appropriate HTML data-attribute (data-monthly / data-yearly)
   * 3. Updates displayed prices dynamically without hardcoding values in JS
   * 4. Updates billing labels (/ month or / year)
   * 5. Updates the active button styling & visual toggle indicator
   * 6. Updates aria-pressed accessibility attributes
   * 7. Updates yearly savings notes and screen reader announcements
   * 
   * @param {'monthly'|'yearly'} period - The target billing frequency
   */
  function setBillingPeriod(period) {
    currentBillingPeriod = period;
    const isYearly = period === 'yearly';

    // 1. Update Toggle Buttons Styling & ARIA States
    if (billingMonthlyBtn && billingYearlyBtn && toggleWrapper) {
      if (isYearly) {
        billingMonthlyBtn.classList.remove('active');
        billingMonthlyBtn.setAttribute('aria-pressed', 'false');

        billingYearlyBtn.classList.add('active');
        billingYearlyBtn.setAttribute('aria-pressed', 'true');

        toggleWrapper.classList.add('yearly-active');
      } else {
        billingYearlyBtn.classList.remove('active');
        billingYearlyBtn.setAttribute('aria-pressed', 'false');

        billingMonthlyBtn.classList.add('active');
        billingMonthlyBtn.setAttribute('aria-pressed', 'true');

        toggleWrapper.classList.remove('yearly-active');
      }
    }

    // 2. Highlight discount badge if yearly is active
    if (discountBadge) {
      if (isYearly) {
        discountBadge.classList.add('highlight');
      } else {
        discountBadge.classList.remove('highlight');
      }
    }

    // 3. Read HTML data-attributes & Update Prices Dynamically
    priceElements.forEach((priceEl) => {
      // Add slight fade/slide transition class
      priceEl.classList.add('updating');

      setTimeout(() => {
        // Read directly from HTML5 data-attributes
        const targetPrice = isYearly 
          ? priceEl.getAttribute('data-yearly') 
          : priceEl.getAttribute('data-monthly');

        if (targetPrice) {
          priceEl.textContent = formatCurrencyINR(targetPrice);
        }

        priceEl.classList.remove('updating');
      }, 150);
    });

    // 4. Update Billing Period Labels
    periodLabels.forEach((label) => {
      label.textContent = isYearly ? '/ year' : '/ month';
    });

    // 5. Update Plan Savings Notes
    savingsNotes.forEach((note) => {
      const card = note.closest('.pricing-card');
      if (!card) return;

      const priceEl = card.querySelector('.price-value');
      if (!priceEl) return;

      const monthlyPrice = Number(priceEl.getAttribute('data-monthly'));
      const yearlyPrice = Number(priceEl.getAttribute('data-yearly'));

      if (isYearly && monthlyPrice && yearlyPrice) {
        // Calculate exact rupees saved over 12 months
        const fullYearMonthlyEquivalent = monthlyPrice * 12;
        const totalSaved = fullYearMonthlyEquivalent - yearlyPrice;
        note.innerHTML = `<span class="savings-text">🎉 You save ₹${formatCurrencyINR(totalSaved)} / year (~20% off)</span>`;
      } else {
        note.innerHTML = `<span class="savings-text">&nbsp;</span>`;
      }
    });

    // 6. Update Screen Reader Live Region
    if (billingStatusAnnouncer) {
      billingStatusAnnouncer.textContent = `Billing period changed to ${isYearly ? 'Yearly. Save 20 percent.' : 'Monthly.'}`;
    }
  }

  // Expose function globally for automated testing or console inspection
  window.setBillingPeriod = setBillingPeriod;

  // ----------------------------------------------------------------------------
  // 4. Event Listeners for Billing Toggle
  // ----------------------------------------------------------------------------
  if (billingMonthlyBtn) {
    billingMonthlyBtn.addEventListener('click', () => {
      setBillingPeriod('monthly');
      showToast('Switched to Monthly billing');
    });
  }

  if (billingYearlyBtn) {
    billingYearlyBtn.addEventListener('click', () => {
      setBillingPeriod('yearly');
      showToast('Switched to Yearly billing — 20% savings applied!');
    });
  }

  // Keyboard Navigation: Arrow Left/Right to toggle between billing options
  [billingMonthlyBtn, billingYearlyBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setBillingPeriod('yearly');
        billingYearlyBtn.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setBillingPeriod('monthly');
        billingMonthlyBtn.focus();
      }
    });
  });

  // ----------------------------------------------------------------------------
  // 5. FAQ Accordion Functionality
  // ----------------------------------------------------------------------------
  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answerElement = document.getElementById(answerId);
      const parentItem = button.closest('.faq-item');

      // Close all other accordion items for clean single-expanded view
      faqQuestions.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherButton.getAttribute('aria-controls');
          const otherAnswerElement = document.getElementById(otherAnswerId);
          const otherParent = otherButton.closest('.faq-item');

          if (otherAnswerElement) {
            otherAnswerElement.hidden = true;
            otherAnswerElement.style.maxHeight = null;
          }
          if (otherParent) {
            otherParent.classList.remove('active');
          }
        }
      });

      // Toggle current accordion item
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        if (answerElement) {
          answerElement.style.maxHeight = null;
          answerElement.hidden = true;
        }
        if (parentItem) {
          parentItem.classList.remove('active');
        }
      } else {
        button.setAttribute('aria-expanded', 'true');
        if (answerElement) {
          answerElement.hidden = false;
          answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
        }
        if (parentItem) {
          parentItem.classList.add('active');
        }
      }
    });
  });

  // ----------------------------------------------------------------------------
  // 6. Mobile Navigation Menu Toggle
  // ----------------------------------------------------------------------------
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 7. Interactive Plan Selection Confirmation Modal (Meaningful Demo Behavior)
  // ----------------------------------------------------------------------------
  function openPlanModal(planName) {
    if (!planModal) return;

    // Determine current plan pricing details from DOM
    let planPrice = '₹499 / month';
    const card = Array.from(document.querySelectorAll('.pricing-card')).find((c) => {
      const heading = c.querySelector('.plan-name');
      return heading && heading.textContent.trim().toLowerCase() === planName.toLowerCase();
    });

    if (card) {
      const priceVal = card.querySelector('.price-value');
      const label = card.querySelector('.billing-period-label');
      if (priceVal && label) {
        planPrice = `₹${priceVal.textContent.trim()} ${label.textContent.trim()}`;
      }
    }

    if (modalPlanTitle) modalPlanTitle.textContent = `${planName} Plan`;
    if (modalBillingCycle) modalBillingCycle.textContent = currentBillingPeriod === 'yearly' ? 'Yearly (20% Off)' : 'Monthly';
    if (modalPrice) modalPrice.textContent = planPrice;

    planModal.classList.add('open');
    planModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Move focus to close button
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closePlanModal() {
    if (!planModal) return;
    planModal.classList.remove('open');
    planModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Hook up card CTA buttons
  cardActionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan') || 'Custom';
      openPlanModal(planName);
    });
  });

  // Modal Close Events
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closePlanModal);
  }

  if (modalContinueBtn) {
    modalContinueBtn.addEventListener('click', () => {
      closePlanModal();
      showToast('Demo checkout simulated! Thank you for testing PricePilot.');
    });
  }

  // Close modal when clicking outside the modal box
  if (planModal) {
    planModal.addEventListener('click', (e) => {
      if (e.target === planModal) {
        closePlanModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && planModal && planModal.classList.contains('open')) {
      closePlanModal();
    }
  });

  // ----------------------------------------------------------------------------
  // 8. Sticky Header Scroll Indicator
  // ----------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // ----------------------------------------------------------------------------
  // 9. Initial Load Setup
  // ----------------------------------------------------------------------------
  // Initialize with monthly billing as required
  setBillingPeriod('monthly');
});

