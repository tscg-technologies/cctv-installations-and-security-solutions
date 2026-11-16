/**
 * SECUREVISION — CCTV Installation & Security Solutions (Fictional Demo)
 * Pure Vanilla JavaScript (ES6+) | Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header & Back-to-Top Visibility + Active Section Scroll Spy
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = document.querySelectorAll('main section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 24);
    }

    if (backToTopBtn) {
      if (scrollY > 480) {
        backToTopBtn.removeAttribute('hidden');
      } else {
        backToTopBtn.setAttribute('hidden', '');
      }
    }

    // Active section highlight in navigation
    let currentSectionId = 'home';
    trackedSections.forEach((sec) => {
      const top = sec.offsetTop - 130;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else if (
        ['#home', '#about', '#services', '#solutions', '#projects', '#contact'].includes(href)
      ) {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Responsive Mobile Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');

  const closeMobileMenu = () => {
    if (!hamburgerBtn || !mainNav) return;
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  };

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    // Close menu when clicking any link inside nav
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  // 4. Interactive Hero 4-Channel Surveillance Feed Switcher
  const channelButtons = document.querySelectorAll('.channel-btn');
  const heroFeedImg = document.getElementById('hero-main-feed-img');
  const activeCamTitle = document.getElementById('active-cam-title');

  channelButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const newImg = btn.getAttribute('data-img');
      const newLabel = btn.getAttribute('data-label');

      channelButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (heroFeedImg && newImg) {
        heroFeedImg.style.opacity = '0.35';
        setTimeout(() => {
          heroFeedImg.setAttribute('src', newImg);
          heroFeedImg.style.opacity = '1';
        }, 120);
      }

      if (activeCamTitle && newLabel) {
        activeCamTitle.textContent = newLabel;
      }
    });
  });

  // 5. Scroll Reveal Animations via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 6. Animated Trust Statistics Counter
  const statCounters = document.querySelectorAll('.stat-counter');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statCounters.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statCounters.forEach((counter) => statsObserver.observe(counter));
  }

  // 7. Project Gallery Category Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 8. Interactive FAQ Accordion (Single-Open Behavior)
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((questionBtn) => {
    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
      const currentAnswer = questionBtn.nextElementSibling;

      // Close all FAQ items first
      faqQuestions.forEach((otherBtn) => {
        otherBtn.setAttribute('aria-expanded', 'false');
        const otherAnswer = otherBtn.nextElementSibling;
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      // Open clicked item if it wasn't already open
      if (!isExpanded && currentAnswer) {
        questionBtn.setAttribute('aria-expanded', 'true');
        currentAnswer.style.maxHeight = `${currentAnswer.scrollHeight + 24}px`;
      }
    });
  });

  // 9. Interactive Service, Industry & Package CTA Pre-filling for Consultation Form
  const propertySelect = document.getElementById('propertyType');
  const cameraSelect = document.getElementById('cameraCount');
  const serviceSelect = document.getElementById('serviceRequired');
  const messageTextarea = document.getElementById('additionalMessage');
  const selectedBanner = document.getElementById('selected-package-banner');
  const selectedBannerText = document.getElementById('selected-package-text');
  const clearPackageBtn = document.getElementById('clear-package-btn');

  const showSelectedBanner = (label) => {
    if (selectedBanner && selectedBannerText) {
      selectedBannerText.textContent = label;
      selectedBanner.removeAttribute('hidden');
    }
  };

  if (clearPackageBtn && selectedBanner) {
    clearPackageBtn.addEventListener('click', () => {
      selectedBanner.setAttribute('hidden', '');
    });
  }

  // Package Buttons
  document.querySelectorAll('.package-select-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-package');
      const camCount = btn.getAttribute('data-cameras');
      const propType = btn.getAttribute('data-property');

      if (cameraSelect && camCount) cameraSelect.value = camCount;
      if (propertySelect && propType) propertySelect.value = propType;
      if (serviceSelect) serviceSelect.value = 'New CCTV Installation';
      if (pkgName) {
        showSelectedBanner(pkgName);
        if (messageTextarea) {
          messageTextarea.value = `Interested in ${pkgName}. Please share an illustrative site assessment estimate.`;
        }
      }
    });
  });

  // Service Card Links
  document.querySelectorAll('.service-card__link').forEach((link) => {
    link.addEventListener('click', () => {
      const srv = link.getAttribute('data-service');
      const prop = link.getAttribute('data-property');
      if (serviceSelect && srv) serviceSelect.value = srv;
      if (propertySelect && prop) propertySelect.value = prop;
      if (srv) showSelectedBanner(`Service: ${srv}`);
    });
  });

  // Industry Card Links
  document.querySelectorAll('.industry-card__cta').forEach((link) => {
    link.addEventListener('click', () => {
      const prop = link.getAttribute('data-property');
      if (propertySelect && prop) propertySelect.value = prop;
      if (serviceSelect) serviceSelect.value = 'New CCTV Installation';
      if (prop) showSelectedBanner(`Industry Solution: ${prop}`);
    });
  });

  // 10. Free Security Consultation Form Frontend Validation & Demo Submission
  const consultationForm = document.getElementById('consultation-form');
  const formSuccessBox = document.getElementById('form-success-box');
  const formSuccessSummary = document.getElementById('form-success-summary');
  const resetFormBtn = document.getElementById('reset-form-btn');

  const setFieldError = (fieldId, errorMsg) => {
    const input = document.getElementById(fieldId);
    const errSpan = document.getElementById(`error-${fieldId}`);
    if (input) {
      input.classList.toggle('input-error', Boolean(errorMsg));
    }
    if (errSpan) {
      errSpan.textContent = errorMsg || '';
    }
  };

  if (consultationForm) {
    // Clear error on user input
    consultationForm.querySelectorAll('input, select').forEach((el) => {
      el.addEventListener('input', () => setFieldError(el.id, ''));
      el.addEventListener('change', () => setFieldError(el.id, ''));
    });

    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fullName = document.getElementById('fullName').value.trim();
      const mobileNumber = document.getElementById('mobileNumber').value.trim();
      const emailAddress = document.getElementById('emailAddress').value.trim();
      const city = document.getElementById('city').value.trim();
      const propertyType = document.getElementById('propertyType').value;
      const cameraCount = document.getElementById('cameraCount').value;
      const serviceRequired = document.getElementById('serviceRequired').value;
      const contactTime = document.getElementById('contactTime').value;

      if (fullName.length < 2) {
        setFieldError('fullName', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else {
        setFieldError('fullName', '');
      }

      // Accept Indian mobile formats e.g. +91 99999 00000 or 10 digits
      const cleanedPhone = mobileNumber.replace(/[\s\-()]/g, '');
      if (!/^(\+91)?[6-9]\d{9}$/.test(cleanedPhone) && cleanedPhone !== '+919999900000' && cleanedPhone !== '9999900000') {
        setFieldError('mobileNumber', 'Enter a valid 10-digit Indian mobile number (e.g., +91 99999 00000).');
        isValid = false;
      } else {
        setFieldError('mobileNumber', '');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
        setFieldError('emailAddress', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setFieldError('emailAddress', '');
      }

      if (city.length < 2) {
        setFieldError('city', 'Please enter your city or locality.');
        isValid = false;
      } else {
        setFieldError('city', '');
      }

      if (!propertyType) {
        setFieldError('propertyType', 'Please select a property type.');
        isValid = false;
      } else {
        setFieldError('propertyType', '');
      }

      if (!cameraCount) {
        setFieldError('cameraCount', 'Please select the number of cameras required.');
        isValid = false;
      } else {
        setFieldError('cameraCount', '');
      }

      if (!serviceRequired) {
        setFieldError('serviceRequired', 'Please select a service.');
        isValid = false;
      } else {
        setFieldError('serviceRequired', '');
      }

      if (!contactTime) {
        setFieldError('contactTime', 'Please choose a preferred contact time.');
        isValid = false;
      } else {
        setFieldError('contactTime', '');
      }

      if (!isValid) return;

      // Show Frontend Demo Success Box
      if (formSuccessSummary) {
        formSuccessSummary.textContent = `Sample request recorded for ${fullName} (${city}) — ${serviceRequired} (${cameraCount}) for ${propertyType}, preferred window: ${contactTime}.`;
      }
      consultationForm.setAttribute('hidden', '');
      if (formSuccessBox) {
        formSuccessBox.removeAttribute('hidden');
      }
    });
  }

  if (resetFormBtn && consultationForm && formSuccessBox) {
    resetFormBtn.addEventListener('click', () => {
      consultationForm.reset();
      if (selectedBanner) selectedBanner.setAttribute('hidden', '');
      formSuccessBox.setAttribute('hidden', '');
      consultationForm.removeAttribute('hidden');
    });
  }

  // 11. Interactive Demo Toast for Non-Functional WhatsApp & Social Placeholders
  const demoToast = document.getElementById('demo-toast');
  const demoToastTitle = document.getElementById('demo-toast-title');
  const demoToastMsg = document.getElementById('demo-toast-msg');
  const demoToastClose = document.getElementById('demo-toast-close');
  let toastTimeout = null;

  const showDemoToast = (title, message) => {
    if (!demoToast) return;
    if (demoToastTitle) demoToastTitle.textContent = title;
    if (demoToastMsg) demoToastMsg.textContent = message;
    demoToast.removeAttribute('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      demoToast.setAttribute('hidden', '');
    }, 5200);
  };

  if (demoToastClose && demoToast) {
    demoToastClose.addEventListener('click', () => {
      demoToast.setAttribute('hidden', '');
    });
  }

  document.querySelectorAll('.whatsapp-trigger-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      showDemoToast(
        'WhatsApp Demo Placeholder',
        'This WhatsApp button is an intentional non-functional placeholder (+91 99999 00000) until a real business number is configured.'
      );
    });
  });

  document.querySelectorAll('.social-placeholder-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.getAttribute('data-social') || 'Social Media Placeholder';
      showDemoToast(
        label,
        'This social link is a fictional demonstration placeholder on the SECUREVISION portfolio site.'
      );
    });
  });
});
