const storyPages = [
  // Your story pages here, split into smaller chunks (2-3 sentences per page)
  // For example:
  "It all started when I was just laying on my bed, I was so bored, my friends were all busy, the others were doing school activities while others were just playing.",
  "I was really bored and I thought I could talk to a new person or a new friend, I always thought having new friends was a good idea.",
  "I then asked my friend named Ahron if he had some friends that I could talk to, I also told him I wanted to talk to a girl haha.",
  "Well, he told me about this girl, her name was Ciara. Of course I started searching for her social, then I finally found it.",
  // ...continue splitting the whole story like this, each item in array is a page for phone mode
];

let currentPage = 0;
let deviceType = null; // 'phone' or 'tablet'

const bookContainer = document.getElementById("bookContainer");
const pagesContainer = document.getElementById("pages");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

function renderPages() {
  pagesContainer.innerHTML = "";
  
  if (deviceType === "phone") {
    // Show 1 page at a time
    const pageDiv = document.createElement("div");
    pageDiv.className = "page single";
    pageDiv.textContent = storyPages[currentPage];
    pagesContainer.appendChild(pageDiv);
  } else if (deviceType === "tablet") {
    // Show 2 pages side by side
    // Left page (currentPage), Right page (currentPage + 1)
    
    const leftPage = document.createElement("div");
    leftPage.className = "page left";
    leftPage.textContent = storyPages[currentPage] || "";
    
    const rightPage = document.createElement("div");
    rightPage.className = "page right";
    rightPage.textContent = storyPages[currentPage + 1] || "";
    
    pagesContainer.appendChild(leftPage);
    pagesContainer.appendChild(rightPage);
  }
  
  // Disable prev/next buttons at bounds
  btnPrev.disabled = currentPage <= 0;
  
  // For next button, max page depends on device type
  if (deviceType === "phone") {
    btnNext.disabled = currentPage >= storyPages.length - 1;
  } else if (deviceType === "tablet") {
    btnNext.disabled = currentPage >= storyPages.length - 2; // since we show 2 pages
  }
}

btnPrev.onclick = () => {
  if (deviceType === "phone") {
    if (currentPage > 0) currentPage--;
  } else if (deviceType === "tablet") {
    if (currentPage > 1) currentPage -= 2;
    else currentPage = 0;
  }
  renderPages();
};

btnNext.onclick = () => {
  if (deviceType === "phone") {
    if (currentPage < storyPages.length - 1) currentPage++;
  } else if (deviceType === "tablet") {
    if (currentPage < storyPages.length - 2) currentPage += 2;
  }
  renderPages();
};

// Device selection buttons
document.getElementById("btnPhone").onclick = () => {
  deviceType = "phone";
  currentPage = 0;
  renderPages();
};

document.getElementById("btnTablet").onclick = () => {
  deviceType = "tablet";
  currentPage = 0;
  renderPages();
};

// Night/day toggle
const toggleNight = document.getElementById("toggleNight");
toggleNight.onchange = () => {
  if (toggleNight.checked) {
    document.body.classList.add("night");
  } else {
    document.body.classList.remove("night");
  }
  // Keep font color black always, override night mode font color
  // We'll handle this in CSS by forcing font color black in pages container
};
