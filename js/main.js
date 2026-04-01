// Centralised configuration for case studies
const CASE_STUDIES = [
  {
    id: 1,
    type: 'pdf',
    src: 'https://theodi.cdn.ngo/media/documents/ODI_Report_-_Trust_and_transparency_in_privacy-enhancing_technologies.pdf#toolbar=1&zoom=50',
    markdown: 'case_studies/casestudy1.md',
    caption: 'PDF viewer'
  },
  {
    id: 2,
    type: 'pdf',
    src: 'https://theodi.cdn.ngo/media/documents/UK_government_as_data_provider_for_AI.pdf#toolbar=1&zoom=50',
    markdown: 'case_studies/casestudy2.md',
    caption: 'PDF viewer'
  },
  {
    id: 3,
    type: 'image',
    src: 'images/case_study_images/casestudy3.png',
    markdown: 'case_studies/casestudy3.md'
  },
  {
    id: 4,
    type: 'image',
    src: 'images/case_study_images/casestudy4.png',
    markdown: 'case_studies/casestudy4.md'
  },
  {
    id: 5,
    type: 'image',
    src: 'images/case_study_images/casestudy5.png',
    markdown: 'case_studies/casestudy5.md'
  },
  {
    id: 6,
    type: 'image',
    src: 'images/case_study_images/casestudy6.png',
    markdown: 'case_studies/casestudy6.md'
  },
  {
    id: 7,
    type: 'image',
    src: 'images/case_study_images/casestudy7.png',
    markdown: 'case_studies/casestudy7.md'
  },
  {
    id: 8,
    type: 'image',
    src: 'images/case_study_images/casestudy1.avif', // Placeholder
    markdown: 'case_studies/casestudy8.md',
    caption: 'CitizenQuery-UK'
  },
  {
    id: 9,
    type: 'image',
    src: 'images/case_study_images/casestudy2.avif', // Placeholder
    markdown: 'case_studies/casestudy9.md',
    caption: 'AI-Ready Data'
  },
  {
    id: 10,
    type: 'image',
    src: 'images/case_study_images/casestudy3.png', // Placeholder
    markdown: 'case_studies/casestudy10.md',
    caption: 'Croissant Standard'
  }
];

// State Management
let currentPage = 0; 
const url = new URL(window.location.href);

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  renderDynamicContainers();
  initFromURL();
  setupEventListeners();
  loadAllMarkdown();
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

// --- Rendering ---

function renderDynamicContainers() {
  const gridContainer = document.querySelector('.grid-container');
  const contentsContainer = document.getElementById('contents-text-container');
  
  CASE_STUDIES.forEach(study => {
    // 1. Create Image Container
    const imgContainer = document.createElement('div');
    imgContainer.id = `case-study-${study.id}-image-container`;
    imgContainer.className = 'grid-item column-2-4 carousel-image-container hidden';
    
    let mediaHTML = '';
    if (study.type === 'pdf') {
      mediaHTML = `<div class="carousel-image"><iframe class="pdf" src="${study.src}"></iframe></div>`;
    } else {
      mediaHTML = `<div class="carousel-image"><img src="${study.src}" alt="Case Study ${study.id}"></div>`;
    }
    
    imgContainer.innerHTML = (study.caption ? `<figcaption>${study.caption}</figcaption>` : '') + mediaHTML;
    gridContainer.appendChild(imgContainer);

    // 2. Create Text Container
    const textContainer = document.createElement('div');
    textContainer.id = `case-study-${study.id}-text-container`;
    textContainer.className = 'grid-item column-5-8 carousel-text-container hidden';
    textContainer.innerHTML = `<div id="case-study-${study.id}-text" class="scrollable-text" data-markdown="${study.markdown}"></div>`;
    gridContainer.appendChild(textContainer);

    // 3. Create Contents Entry
    const contentEntry = document.createElement('div');
    contentEntry.id = `contents-case-study-${study.id}`;
    contentEntry.className = 'contents-entry';
    contentEntry.setAttribute('data-markdown', study.markdown);
    contentEntry.addEventListener('click', () => navigateToPage(study.id));
    contentsContainer.appendChild(contentEntry);
  });
}

async function loadAllMarkdown() {
  const landingText = document.getElementById('landing-text');
  if (landingText) {
    loadMarkdownFile(`writeups/${landingText.getAttribute('data-markdown')}`, 'landing-text', true);
  }

  CASE_STUDIES.forEach(study => {
    loadMarkdownFile(`writeups/${study.markdown}`, `case-study-${study.id}-text`, true);
    loadMarkdownFile(`writeups/${study.markdown}`, `contents-case-study-${study.id}`, false);
  });
}

async function loadMarkdownFile(filePath, elementId, isFull) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    const element = document.getElementById(elementId);
    
    if (isFull) {
      element.innerHTML = marked.parse(text);
    } else {
      const firstLine = text.split('\n').find(line => line.trim() !== '') || '';
      element.innerHTML = marked.parse(firstLine);
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
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
    let next = (typeof currentPage === 'number' ? currentPage + 1 : 1);
    if (next > CASE_STUDIES.length) next = 0;
    navigateToPage(next);
  });

  document.getElementById('previous-button').addEventListener('click', () => {
    if (currentPage === 'nav') return;
    let prev = (typeof currentPage === 'number' ? currentPage - 1 : CASE_STUDIES.length);
    if (prev < 0) prev = CASE_STUDIES.length;
    navigateToPage(prev);
  });

  document.getElementById('nav-button').addEventListener('click', () => navigateToPage('nav'));
  
  document.getElementById('index-page-button').addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage(0);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') document.getElementById('next-button').click();
    if (e.key === 'ArrowLeft') document.getElementById('previous-button').click();
  });
}
