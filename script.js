// Sample story content by Maestro Riez
const pages = [
  "About the Author: Maestro Riez is a passionate pianist and storyteller who weaves emotions into words.",
  "Chapter 1: I saw you smile for the first time in class today. It felt like spring bloomed early.",
  "Chapter 2: I kept finding excuses to sit closer, just to hear your laugh again.",
  "Chapter 3: The teacher caught me staring. I didn't even realize I was smiling.",
  "Chapter 4: You dropped your pen and I picked it up. You said 'thanks' and my heart raced.",
  "Chapter 5: Our hands brushed. Maybe you felt the spark too.",
  "Chapter 6: I found out your name from the seating chart. I whispered it to myself all day.",
  "Chapter 7: You sat beside me during lunch. My sandwich was untouched. My eyes weren't.",
  "Chapter 8: We walked home together. Just once. But I replayed it a hundred times.",
  "Chapter 9: You texted me. Just a meme. But it felt like poetry.",
  "Chapter 10: You said 'good morning' before I could. That made my whole week.",
  "Chapter 11: Our friends tease us. But we both just smile.",
  "Chapter 12: You gave me your hoodie when I was cold. It's my favorite thing now.",
  "Chapter 13: I heard your favorite song. It’s now mine too.",
  "Chapter 14: We studied together. I couldn’t focus. But I never wanted it to end.",
  "Chapter 15: I asked you to come to the concert. You did. You cheered.",
  "Chapter 16: You said you were proud of me. No one's ever said that before.",
  "Chapter 17: I think I'm falling for you. But I'm scared.",
  "Chapter 18: I wrote this story. For you. My first love.",
  "The End: But maybe it’s just the beginning..."
];

let currentPage = 0;
let isMobile = window.innerWidth < 768;

function renderPages() {
  const leftPage = document.querySelector(".left-page");
  const rightPage = document.querySelector(".right-page");

  if (isMobile) {
    leftPage.innerText = pages[currentPage] || "";
    rightPage.innerText = "";
  } else {
    leftPage.innerText = pages[currentPage] || "";
    rightPage.innerText = pages[currentPage + 1] || "";
  }
}

function nextPage() {
  const increment = isMobile ? 1 : 2;
  if (currentPage + increment < pages.length) {
    currentPage += increment;
    renderPages();
  }
}

function prevPage() {
  const decrement = isMobile ? 1 : 2;
  if (currentPage - decrement >= 0) {
    currentPage -= decrement;
    renderPages();
  }
}

function pickDevice(device) {
  const deviceOptions = document.querySelectorAll(".device-option");
  deviceOptions.forEach(option => option.classList.remove("active"));
  document.querySelector(`.device-option[data-device="${device}"]`).classList.add("active");

  if (device === "mobile") {
    isMobile = true;
  } else {
    isMobile = false;
  }

  currentPage = 0;
  renderPages();
}

// Responsive handling
window.addEventListener("resize", () => {
  const wasMobile = isMobile;
  isMobile = window.innerWidth < 768;
  if (wasMobile !== isMobile) {
    currentPage = 0;
    renderPages();
  }
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prevBtn").addEventListener("click", prevPage);
  document.getElementById("nextBtn").addEventListener("click", nextPage);

  const deviceOptions = document.querySelectorAll(".device-option");
  deviceOptions.forEach(option => {
    option.addEventListener("click", () => {
      const device = option.getAttribute("data-device");
      pickDevice(device);
    });
  });

  renderPages();
});
