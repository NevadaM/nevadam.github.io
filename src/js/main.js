// State Management
let currentPage = 0; 
const url = new URL(window.location.href);

// TOTAL_PAGES is injected into window by Eleventy in index.njk

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initFromURL();
  setupEventListeners();
});

function initFromURL() {
  const params = url.searchParams.get('page');
  if (params === 'nav') {
    currentPage = 'nav';
  } else if (params !== null) {
    currentPage = parseInt(params, 10);
  }
  navigateToPage(currentPage, false);
}

// --- Navigation Logic ---
function navigateToPage(page, updateHistory = true) {
  const landing = document.getElementById('landing-text-container');
  const contents = document.getElementById('contents-text-container');
  const navBtn = document.getElementById('nav-button');
  const prevBtn = document.getElementById('previous-button');
  const nextBtn = document.getElementById('next-button');

  // Identify target elements for the new page
  let targets = [];
  if (page === 0) {
    targets = [landing, navBtn, prevBtn, nextBtn];
  } else if (page === 'nav') {
    targets = [contents];
  } else {
    targets = [
      document.getElementById(`case-study-${page}-image-container`),
      document.getElementById(`case-study-${page}-text-container`),
      navBtn, prevBtn, nextBtn
    ];
  }

  // Get all elements that could be visible
  const allElements = [
    landing, contents, navBtn, prevBtn, nextBtn,
    ...document.querySelectorAll('.carousel-image-container, .carousel-text-container')
  ];

  // Apply transitions
  allElements.forEach(el => {
    if (!el) return;
    if (targets.includes(el)) {
      el.classList.remove('hidden', 'fade-out');
      el.classList.add('fade-in');
    } else {
      el.classList.remove('fade-in');
      el.classList.add('fade-out');
    }
  });

  currentPage = page;
  if (updateHistory) {
    url.searchParams.set('page', currentPage);
    window.history.pushState(null, '', url.toString());
  }
}

function setupEventListeners() {
  document.getElementById('next-button').addEventListener('click', () => {
    if (currentPage === 'nav') return;
    const currentIndex = window.PAGE_ORDER.indexOf(currentPage);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= window.PAGE_ORDER.length) nextIndex = 0;
    navigateToPage(window.PAGE_ORDER[nextIndex]);
  });

  document.getElementById('previous-button').addEventListener('click', () => {
    if (currentPage === 'nav') return;
    const currentIndex = window.PAGE_ORDER.indexOf(currentPage);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = window.PAGE_ORDER.length - 1;
    navigateToPage(window.PAGE_ORDER[prevIndex]);
  });

  document.getElementById('nav-button').addEventListener('click', () => navigateToPage('nav'));
  
  const indexBtn = document.getElementById('index-page-button');
  if(indexBtn) {
    indexBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage(0);
    });
  }

  // Add click listeners to dynamically created contents entries
  document.querySelectorAll('.contents-entry').forEach(entry => {
      entry.addEventListener('click', (e) => {
          const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
          navigateToPage(id);
      });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') document.getElementById('next-button').click();
    if (e.key === 'ArrowLeft') document.getElementById('previous-button').click();
  });
}
