const deviceSelect = document.getElementById('device');
const bookContainer = document.getElementById('book');
const titlePage = document.getElementById('title-page');
const startBtn = document.getElementById('start-btn');
const pageContent = document.getElementById('page-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 0;

// Function to show page content based on device and current page
function showPage() {
  const device = deviceSelect.value;

  if (device === 'mobile') {
    // On mobile show only 1 page at a time
    pageContent.textContent = storyPages[currentPage];
  } else {
    // For tablet and computer, show 2 pages side by side
    const page1 = storyPages[currentPage] || '';
    const page2 = storyPages[currentPage + 1] || '';
    pageContent.innerHTML = `<div class="page-half">${page1}</div><div class="page-half">${page2}</div>`;
  }
}

// Event Listeners

startBtn.addEventListener('click', () => {
  titlePage.classList.add('hidden');
  bookContainer.classList.remove('hidden');
  currentPage = 0;
  showPage();
});

deviceSelect.addEventListener('change', () => {
  currentPage = 0;
  showPage();
});

prevBtn.addEventListener('click', () => {
  const device = deviceSelect.value;
  if (device === 'mobile') {
    if (currentPage > 0) {
      currentPage--;
      showPage();
    }
  } else {
    if (currentPage > 1) {
      currentPage -= 2;
      showPage();
    } else if (currentPage === 1) {
      currentPage = 0;
      showPage();
    }
  }
});

nextBtn.addEventListener('click', () => {
  const device = deviceSelect.value;
  if (device === 'mobile') {
    if (currentPage < storyPages.length - 1) {
      currentPage++;
      showPage();
    }
  } else {
    if (currentPage + 2 < storyPages.length) {
      currentPage += 2;
      showPage();
    } else if (currentPage + 1 < storyPages.length) {
      currentPage++;
      showPage();
    }
  }
});
