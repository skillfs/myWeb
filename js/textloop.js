// script.js
const textContainer = document.getElementById("text-loop");
const words = ["Supawit Kongboon","Computer Science NU"]; // Add more words here
let wordIndex = 0;
let loopIndex = 0;
let loopDelay = 150; // Adjust this value to change the speed
let isDeleting = false;

function loopText() {
  const currentWord = words[wordIndex];
  const displayText = currentWord.substring(0, loopIndex) + "_";

  textContainer.textContent = displayText;

  if (!isDeleting) {
    loopIndex++;

    if (loopIndex > currentWord.length) {
      isDeleting = true;
      loopIndex = currentWord.length; // Adjusted this line
      loopDelay = 300; // Delay when deleting
    }
  } else {
    loopIndex--;

    if (loopIndex < 0) {
      isDeleting = false;
      loopIndex = 0;
      wordIndex = (wordIndex + 1) % words.length; // Move to the next word
      loopDelay = 200; // Delay when typing
    }
  }

  if (isDeleting && loopIndex === 0) {
    // Switch to typing mode immediately when deletion is complete
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Move to the next word
    loopDelay = 100; // Delay when typing
  }

  setTimeout(loopText, loopDelay);
}

loopText();
