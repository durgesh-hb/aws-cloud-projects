/* lakshith-enterprise/js/main.js */
/* Global initialization, mobile menu toggle, scroll events */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize initial bulk calculation state if calculator module is present
  if (typeof calculatePrice === 'function') {
    calculatePrice();
  }

  // Initialize navigation click highlighting & active scroll tracking
  initNavigation();
});

/**
 * Initializes navigation click handlers and scroll-spy for active menu coloring.
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  /**
   * Sets the active menu item highlight by target section ID
   * @param {string} targetId - ID of the section to set active
   */
  function setActiveNav(targetId) {
    if (!targetId) return;
    navLinks.forEach(link => {
      const section = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      if (section === targetId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Handle direct clicks on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Immediately set active menu color on click
          setActiveNav(targetId);

          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, href);
          }

          // Close mobile menu if open
          toggleMobileMenu(false);
        }
      }
    });
  });

  // Handle secondary section anchor links across the page (e.g. CTA buttons)
  document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();
          setActiveNav(targetId);
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          if (history.pushState) history.pushState(null, null, href);
        }
      }
    });
  });

  // ScrollSpy: highlight active menu item as user scrolls through sections
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Highlight initial active nav based on URL hash if present
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    setActiveNav(initialHash);
  }
}

/**
 * Toggles mobile menu drawer visibility
 * @param {boolean} [forceState] Optional explicit state (true = open, false = close)
 */
function toggleMobileMenu(forceState) {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  if (!mobileMenu) return;

  const isHidden = mobileMenu.classList.contains('hidden');
  const shouldShow = typeof forceState === 'boolean' ? forceState : isHidden;

  if (shouldShow) {
    mobileMenu.classList.remove('hidden');
    if (menuIcon) menuIcon.textContent = 'close';
  } else {
    mobileMenu.classList.add('hidden');
    if (menuIcon) menuIcon.textContent = 'menu';
  }
}

/**
 * Opens the Quote Sample Request Modal
 * @param {string} productName - The title of the product sample being requested
 */
function openQuoteModal(productName) {
  const modalTitle = document.getElementById('modal-product-title');
  const quoteModal = document.getElementById('quote-modal');
  if (modalTitle) {
    modalTitle.innerText = 'Request Sample: ' + productName;
  }
  if (quoteModal) {
    quoteModal.classList.remove('hidden');
  }
}

/**
 * Closes the Quote Sample Request Modal
 */
function closeQuoteModal() {
  const quoteModal = document.getElementById('quote-modal');
  if (quoteModal) {
    quoteModal.classList.add('hidden');
  }
}

