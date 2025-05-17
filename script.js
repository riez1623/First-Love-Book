// script.js

// Globals
let currentPage = 0;
let deviceType = null; // 'phone' or 'tablet'
const story = window.storyPages || []; // storyPages array must be in story.js

// DOM Elements
const readButton = document.getElementById('read-button');
const deviceSelection = document.getElementById('device-selection');
const phoneBtn = document.getElementById('phone-btn');
const tabletBtn = document.getElementById('tablet-btn');
const book = document.getElementById('book');
const leftPage = document.getElementById('left-page');
const rightPage = document.getElementById('right-page');
const singlePage = document.getElementById('single-page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const nightToggle = document.getElementById('night-toggle');
const body = document.body;

// Helper: Request fullscreen
function openFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) { /* Safari */
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) { /* IE11 */
    el.msRequestFullscreen();
  }
}

// Show pages based on device type & currentPage index
function renderPages() {
  if (!deviceType) return;

  if (deviceType === 'phone') {
    // Show single page with one page content
    singlePage.style.display = 'block';
    leftPage.style.display = 'none';
    rightPage.style.display = 'none';

    // Clamp currentPage
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= story.length) currentPage = story.length - 1;

    singlePage.textContent = story[currentPage];
  } else if (deviceType === 'tablet') {
    // Show two pages side by side
    singlePage.style.display = 'none';
    leftPage.style.display = 'block';
    rightPage.style.display = 'block';

    // Clamp currentPage for even number (left page always even index)
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= story.length) currentPage = story.length - (story.length % 2 === 0 ? 2 : 1);
    if (currentPage % 2 !== 0) currentPage--; // force even index for left page

    leftPage.textContent = story[currentPage] || "";
    rightPage.textContent = story[currentPage + 1] || "";
  }

  updateNavButtons();
}

// Update Prev/Next button states (disable if at start/end)
function updateNavButtons() {
  if (deviceType === 'phone') {
    prevBtn.disabled = currentPage <= 0;
    nextBtn.disabled = currentPage >= story.length - 1;
  } else if (deviceType === 'tablet') {
    prevBtn.disabled = currentPage <= 0;
    nextBtn.disabled = currentPage >= story.length - (story.length % 2 === 0 ? 2 : 1);
  }
}

// Navigation button handlers
prevBtn.addEventListener('click', () => {
  if (deviceType === 'phone') {
    if (currentPage > 0) currentPage--;
  } else {
    if (currentPage > 0) currentPage -= 2;
  }
  renderPages();
});

nextBtn.addEventListener('click', () => {
  if (deviceType === 'phone') {
    if (currentPage < story.length - 1) currentPage++;
  } else {
    if (currentPage < story.length - 2) currentPage += 2;
  }
  renderPages();
});

// Night/day toggle handler
nightToggle.addEventListener('change', () => {
  if (nightToggle.checked) {
    body.classList.add('night-mode');
  } else {
    body.classList.remove('night-mode');
  }
});

// Device selection buttons
phoneBtn.addEventListener('click', () => {
  deviceType = 'phone';
  deviceSelection.style.display = 'none';
  book.style.display = 'block';
  currentPage = 0;
  renderPages();
});

tabletBtn.addEventListener('click', () => {
  deviceType = 'tablet';
  deviceSelection.style.display = 'none';
  book.style.display = 'block';
  currentPage = 0;
  renderPages();
});

// Read button click
readButton.addEventListener('click', () => {
  // Go fullscreen
  openFullscreen();

  // Hide title screen elements (assuming they have IDs)
  document.getElementById('title-screen').style.display = 'none';

  // Show device selection screen
  deviceSelection.style.display = 'block';
});

// Initial setup (hide book and device selection)
window.addEventListener('load', () => {
  book.style.display = 'none';
  deviceSelection.style.display = 'none';
});
