// initial vars
var page_counter = 0;
var url = new URL(window.location.href);
const params = url.searchParams.getAll('page')

// using query strings to open exact page in a URL, enabling easier sharing
if (params.length != 0) {
  if (params[0] == 'nav') {
    page_counter = 'nav'
  } else {
    page_counter = Number(params[0])
  }
  navigateToPageCount(page_counter)
} else {
  url.searchParams.set('page', page_counter);
  window.history.pushState(null, '', url.toString());
}

// function to navigate to page based on the current page_counter
function navigateToPageCount(page_counter) {
  const landingTextContainer = document.getElementById('landing-text-container');
  if (page_counter != 'nav') {
    if (page_counter == 0) {
      const next_carouselImage = document.querySelector(`.case-study-${page_counter}-image-container`);
      landingTextContainer.classList.remove('fade-in');
      landingTextContainer.classList.add('hidden');
      url.searchParams.set('page', page_counter);
      window.history.pushState(null, '', url.toString());
      console.log("page counter: ", page_counter);
    
      setTimeout(() => {
        next_carouselImage.classList.add('fade-in');
        next_carouselImage.classList.remove('hidden');
        next_carouselImage.classList.remove('fade-out');
      }, 0.1);

    } else {
      const next_carouselImage = document.querySelector(`#case-study-${page_counter}-image-container`);
      const next_carouselText = document.querySelector(`#case-study-${page_counter}-text-container`);
      landingTextContainer.classList.remove('fade-in');
      landingTextContainer.classList.add('hidden');
      url.searchParams.set('page', page_counter);
      window.history.pushState(null, '', url.toString());
      console.log("page counter: ", page_counter);
    
      setTimeout(() => {
        next_carouselImage.classList.add('fade-in');
        next_carouselText.classList.add('fade-in');
        next_carouselImage.classList.remove('hidden');
        next_carouselText.classList.remove('hidden');
        next_carouselImage.classList.remove('fade-out');
        next_carouselText.classList.remove('fade-out');
      }, 0.1);
      
    }

  } else {
    const landingTextContainer = document.getElementById('landing-text-container');
    const contents_container = document.getElementById('contents-text-container');
    const prevButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const navButton = document.getElementById('nav-button');
    landingTextContainer.classList.remove('fade-in');
    landingTextContainer.classList.add('hidden');
  
    setTimeout(() => {
      contents_container.classList.remove('hidden');
      contents_container.classList.add('fade-in');
      contents_container.classList.remove('fade-out');
      prevButton.classList.remove('fade-in');
      prevButton.classList.add('fade-out');
      nextButton.classList.remove('fade-in');
      nextButton.classList.add('fade-out');
      navButton.classList.remove('fade-in');
      navButton.classList.add('fade-out');
      
      url.searchParams.set('page', page_counter);
      window.history.pushState(null, '', url.toString());
      console.log("page counter: ", page_counter)
    }, 0.1);
  }
}

// Function to fetch and render a Markdown file
async function loadMarkdown_full(filePath, elementId) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      document.getElementById(elementId).innerHTML = marked.parse(text);
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      document.getElementById(elementId).innerHTML = "<p>Sorry, the content couldn't be loaded.</p>";
    }
  }

async function loadMarkdown_title(filePath, elementId) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error (`HTTP error! status: ${response.status}`);
    }
    const text = await response.text()

    const lines = text.split('\n');
    let firstLine = '';
    for (let line of lines) {
      if (line.trim() !== '') {
        firstLine = line;
        break;
      }
    }

    document.getElementById(elementId).innerHTML = marked.parse(firstLine);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    document.getElementById(elementId).innerHTML = "<p>Sorry, the content couldn't be loaded.</p>";
  }
}


const nextButton = document.getElementById('next-button');
if (nextButton) {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      nextButton.click();
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  console.log('Added keydown event listener for right arrow key.');
} else {
  console.error('Button with id "next-button" not found.');
} 

// function for the 'next' button
function initializeNextButton() {
  const nextButton = document.getElementById('next-button');
  
  if (nextButton) { 
    nextButton.addEventListener('click', () => {
      const landingTextContainer = document.getElementById('landing-text-container');
      const current_carouselImage = document.querySelector(`#case-study-${page_counter}-image-container`);
      const current_carouselText = document.querySelector(`#case-study-${page_counter}-text-container`);
      const next_carouselImage = document.querySelector(`#case-study-${page_counter+1}-image-container`);
      const next_carouselText = document.querySelector(`#case-study-${page_counter+1}-text-container`);
      
      
      setTimeout(() => {
        if (page_counter != 0) {
          if (page_counter != 15) {
            current_carouselImage.classList.remove('fade-in');
            current_carouselText.classList.remove('fade-in');
            current_carouselImage.classList.add('fade-out');
            current_carouselText.classList.add('fade-out');
            next_carouselImage.classList.add('fade-in');
            next_carouselText.classList.add('fade-in');
            next_carouselImage.classList.remove('hidden');
            next_carouselText.classList.remove('hidden');
            next_carouselImage.classList.remove('fade-out');
            next_carouselText.classList.remove('fade-out');
            page_counter += 1;
          } else {
            current_carouselImage.classList.remove('fade-in');
            current_carouselText.classList.remove('fade-in');
            current_carouselImage.classList.add('fade-out');
            current_carouselText.classList.add('fade-out');
            landingTextContainer.classList.add('fade-in');
            landingTextContainer.classList.remove('hidden');
            landingTextContainer.classList.remove('fade-out');
            page_counter = 0;
          }
        } else {
          landingTextContainer.classList.add('fade-out');
          landingTextContainer.classList.remove('fade-in');
          landingTextContainer.classList.add('hidden');
          next_carouselImage.classList.add('fade-in');
          next_carouselText.classList.add('fade-in');
          next_carouselImage.classList.remove('hidden');
          next_carouselText.classList.remove('hidden');
          next_carouselImage.classList.remove('fade-out');
          next_carouselText.classList.remove('fade-out');
          page_counter += 1;
        }
        url.searchParams.set('page', page_counter);
        window.history.pushState(null, '', url.toString());
        console.log("page counter: ", page_counter)
      }, 1);
    })
  }
}

// function for the 'previous' button
const prevButton = document.getElementById('previous-button');
if (prevButton) {
const handleKeyDown = (event) => {
  if (event.key === 'ArrowLeft') {
    prevButton.click();
  }
};
document.addEventListener('keydown', handleKeyDown);
console.log('Added keydown event listener for right arrow key.');
} else {
console.error('Button with id "previous-button" not found.');
} 

function initializePrevButton() {
  const prevButton = document.getElementById('previous-button');
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const landingTextContainer = document.getElementById('landing-text-container');
      const current_carouselImage = document.querySelector(`#case-study-${page_counter}-image-container`);
      const current_carouselText = document.querySelector(`#case-study-${page_counter}-text-container`);
      const prev_carouselImage = document.querySelector(`#case-study-${page_counter-1}-image-container`);
      const prev_carouselText = document.querySelector(`#case-study-${page_counter-1}-text-container`);
      const _15_carouselImage = document.querySelector(`#case-study-15-image-container`);
      const _15_carouselText = document.querySelector(`#case-study-15-text-container`);
      
      
      setTimeout(() => {
        if (page_counter != 0) {
          if (page_counter != 1) {
            current_carouselImage.classList.remove('fade-in');
            current_carouselText.classList.remove('fade-in');
            current_carouselImage.classList.add('fade-out');
            current_carouselText.classList.add('fade-out');
            prev_carouselImage.classList.add('fade-in');
            prev_carouselText.classList.add('fade-in');
            prev_carouselImage.classList.remove('hidden');
            prev_carouselText.classList.remove('hidden');
            prev_carouselImage.classList.remove('fade-out');
            prev_carouselText.classList.remove('fade-out');
            page_counter -= 1;
          } else {
            current_carouselImage.classList.remove('fade-in');
            current_carouselText.classList.remove('fade-in');
            current_carouselImage.classList.add('fade-out');
            current_carouselText.classList.add('fade-out');
            landingTextContainer.classList.add('fade-in');
            landingTextContainer.classList.remove('hidden');
            landingTextContainer.classList.remove('fade-out');
            page_counter = 0;
          }
        } else {
          landingTextContainer.classList.add('fade-out');
          landingTextContainer.classList.remove('fade-in');
          landingTextContainer.classList.add('hidden');
          _15_carouselImage.classList.add('fade-in');
          _15_carouselText.classList.add('fade-in');
          _15_carouselImage.classList.remove('hidden');
          _15_carouselText.classList.remove('hidden');
          _15_carouselImage.classList.remove('fade-out');
          _15_carouselText.classList.remove('fade-out');
          page_counter = 15;
        }
        url.searchParams.set('page', page_counter);
        window.history.pushState(null, '', url.toString());
        console.log("page counter: ", page_counter)
      }, 1);
    })
  }
}
   
// functions for 'navigation' button
function initializeNavButton() {
  const navButton = document.getElementById('nav-button');
  
  if (navButton) {
    navButton.addEventListener('click', () => {
      const landingTextContainer = document.getElementById('landing-text-container');
      const current_carouselImage = document.querySelector(`#case-study-${page_counter}-image-container`);
      const current_carouselText = document.querySelector(`#case-study-${page_counter}-text-container`);
      const contents_container = document.getElementById('contents-text-container')
      const prevButton = document.getElementById('previous-button')
      const nextButton = document.getElementById('next-button')

      
      setTimeout(() => {
        if (page_counter != 'nav') {
            if (page_counter == 0) {
              landingTextContainer.classList.remove('fade-in');
              landingTextContainer.classList.add('fade-out');
            } else {
              current_carouselImage.classList.remove('fade-in');
              current_carouselText.classList.remove('fade-in');
              current_carouselImage.classList.add('fade-out');
              current_carouselText.classList.add('fade-out');
            }
            contents_container.classList.remove('hidden');
            contents_container.classList.add('fade-in');
            contents_container.classList.remove('fade-out');
            prevButton.classList.remove('fade-in');
            prevButton.classList.add('fade-out');
            nextButton.classList.remove('fade-in');
            nextButton.classList.add('fade-out');
            navButton.classList.remove('fade-in');
            navButton.classList.add('fade-out');
            page_counter ='nav';
        } else {
          
        }
        url.searchParams.set('page', page_counter);
        window.history.pushState(null, '', url.toString());
        console.log("page counter: ", page_counter)
      }, 1);
    })
  }
}

function initializeSingleNavButton(num) {
  const pageButton = document.getElementById(`contents-case-study-${num}`)
  const navButton = document.getElementById('nav-button');
  const prevButton = document.getElementById('previous-button')
  const nextButton = document.getElementById('next-button')


  if (pageButton) {
    pageButton.addEventListener('click', () => {
      const carouselImage =  document.querySelector(`#case-study-${num}-image-container`);
      const carouselText =  document.querySelector(`#case-study-${num}-text-container`);
      const navPage = document.getElementById('contents-text-container');
      setTimeout(() => {
        navPage.classList.remove('fade-in');
        navPage.classList.add('fade-out');
        navPage.classList.add('hidden');

        carouselImage.classList.remove('fade-out');
        carouselText.classList.remove('fade-out');
        carouselImage.classList.add('fade-in');
        carouselText.classList.add('fade-in');

        navButton.classList.remove('fade-out');
        navButton.classList.add('fade-in');
        nextButton.classList.remove('fade-out');
        nextButton.classList.add('fade-in');
        prevButton.classList.remove('fade-out');
        prevButton.classList.add('fade-in');

        navButton.classList.remove('fade-in');


        page_counter = num;
        url.searchParams.set('page', page_counter);
        window.history.pushState(null, '', url.toString());
        console.log("page counter: ", page_counter)

      }, 1)

    })

  }
}

// function for button on title in the header
function initializeIndexButton() {
  const indexButton = document.getElementById('index-page-button')

  if (indexButton) {
    indexButton.addEventListener('click', () => {
      const landingTextContainer = document.getElementById('landing-text-container');
      if (page_counter != 'nav') {
        if (page_counter != 0) {
          const current_carouselImage = document.querySelector(`#case-study-${page_counter}-image-container`);
          const current_carouselText = document.querySelector(`#case-study-${page_counter}-text-container`);

          setTimeout(() => {
            current_carouselImage.classList.remove('fade-in');
            current_carouselText.classList.remove('fade-in');
            current_carouselImage.classList.add('fade-out');
            current_carouselText.classList.add('fade-out');
            landingTextContainer.classList.remove('fade-out');
            landingTextContainer.classList.add('fade-in');
            landingTextContainer.classList.remove('hidden')
            page_counter = 0
            url.searchParams.set('page', page_counter);
            window.history.pushState(null, '', url.toString());
            console.log("page counter: ", page_counter)



          }, 1);

        }

      } else {
        const navPage = document.getElementById('contents-text-container');
        const navButton = document.getElementById('nav-button');
        const prevButton = document.getElementById('previous-button')
        const nextButton = document.getElementById('next-button')
        setTimeout(() => {
          navPage.classList.remove('fade-in');
          navPage.classList.add('fade-out');
          landingTextContainer.classList.remove('fade-out');
          landingTextContainer.classList.add('fade-in');
          landingTextContainer.classList.remove('hidden');
          navButton.classList.remove('fade-out');
          navButton.classList.add('fade-in');
          nextButton.classList.remove('fade-out');
          nextButton.classList.add('fade-in');
          prevButton.classList.remove('fade-out');
          prevButton.classList.add('fade-in');
          page_counter = 0
          url.searchParams.set('page', page_counter);
          window.history.pushState(null, '', url.toString());
          console.log("page counter: ", page_counter)
          

        }, 1);
      }
    })
  }
}

// scroll listener, deprecated
function initializeScrollListeners() {
  const scrollableTexts = document.querySelectorAll('.scrollable-text');
  
  scrollableTexts.forEach((scrollableText) => {
    const parentContainer = scrollableText.parentElement; // .scrollable-container
          
    scrollableText.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableText;
      
      if (scrollTop + clientHeight >= scrollHeight - 5) { // Buffer of 5px
        parentContainer.classList.add('at-bottom');
      } else {
        parentContainer.classList.remove('at-bottom');
      }
    });
    
    // Initialize the state on page load
    scrollableText.dispatchEvent(new Event('scroll'));
  });
}

// compile
document.addEventListener("DOMContentLoaded", () => {
  const scrollableTexts = document.querySelectorAll('.scrollable-text');
  scrollableTexts.forEach((scrollableText) => {
    const markdownFile = `writeups/${scrollableText.getAttribute('data-markdown')}`;
    loadMarkdown_full(markdownFile, scrollableText.id);
  });

  const contentsEntries = document.querySelectorAll('.contents-entry');
  contentsEntries.forEach((entry) => {
    const markdownFile = `writeups/${entry.getAttribute('data-markdown')}`;
    loadMarkdown_title(markdownFile, entry.id)
  })

  initializeScrollListeners();
  initializeNextButton();
  initializePrevButton();
  initializeNavButton();
  initializeIndexButton();
  for (let index = 0; index < 16; index++) {
    initializeSingleNavButton(index)
    
  };
});