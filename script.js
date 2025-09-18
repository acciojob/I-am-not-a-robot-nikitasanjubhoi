//your code here
// Image class list from CSS
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];
let selectedElements = [];

const imageContainer = document.getElementById("image-container");
const h = document.getElementById("h");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

// Utility: Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Step 1: Generate 6 images (5 unique, 1 duplicate)
function generateImages() {
  const randomIndex = Math.floor(Math.random() * imageClasses.length);
  const duplicateClass = imageClasses[randomIndex];

  const images = [...imageClasses, duplicateClass]; // 5 unique + 1 duplicate
  const shuffledImages = shuffle(images);

  imageContainer.innerHTML = ""; // Clear old images

  shuffledImages.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.setAttribute("data-class", imgClass);
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

// Step 2: Handle image click
function handleImageClick(img) {
  const imgClass = img.getAttribute("data-class");

  if (selectedElements.includes(img)) {
    // If already selected, deselect it
    img.classList.remove("selected");
    selectedImages = selectedImages.filter(cls => cls !== imgClass);
    selectedElements = selectedElements.filter(el => el !== img);
  } else {
    if (selectedImages.length >= 2) return; // Only allow 2 selections

    img.classList.add("selected");
    selectedImages.push(imgClass);
    selectedElements.push(img);
  }

  // Show/hide buttons based on selection count
  resetBtn.style.display = selectedImages.length > 0 ? "inline-block" : "none";
  verifyBtn.style.display = selectedImages.length === 2 ? "inline-block" : "none";
}

// Step 3: Reset functionality
resetBtn.addEventListener("click", () => {
  selectedImages = [];
  selectedElements.forEach(el => el.classList.remove("selected"));
  selectedElements = [];
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

// Step 4: Verify functionality
verifyBtn.addEventListener("click", () => {
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = "none";
});

// Initialize on page load
generateImages();

