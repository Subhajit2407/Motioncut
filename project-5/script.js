// Grab elements
const characterFace = document.getElementById("characterFace");
const moodButtons = document.querySelectorAll(".mood-btn");
const dateDisplay = document.getElementById("dateDisplay");
const moodHistoryList = document.getElementById("moodHistoryList");
const refreshHistoryBtn = document.getElementById("refreshHistory");

// Update date display dynamically
const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
dateDisplay.textContent = today.toLocaleDateString('en-US', options);

// Function to load mood history from localStorage
function loadMoodHistory() {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moodHistoryList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.date} - ${item.mood}`;
    moodHistoryList.appendChild(li);
  });
}

// Function to save mood to history
function saveMood(mood) {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const timestamp = new Date();
  const formattedTime = timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const formattedDate = timestamp.toLocaleDateString('en-US', options);
  history.unshift({ mood, date: `${formattedDate} ${formattedTime}` });
  // Optionally limit history length
  if (history.length > 10) history.pop();
  localStorage.setItem("moodHistory", JSON.stringify(history));
  loadMoodHistory();
}

// Load history on page load
loadMoodHistory();

// Refresh button event
refreshHistoryBtn.addEventListener("click", () => {
  loadMoodHistory();
});

// Listen for mood button clicks
moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove any existing mood or expression classes
    characterFace.classList.remove(
      "mood-anxiety", "mood-distracted", "mood-joy", "mood-surprised", "mood-stupid", "mood-calm",
      "expression-anxiety", "expression-distracted", "expression-joy", "expression-surprised", "expression-stupid", "expression-calm"
    );

    // Get the mood from the button's data attribute
    const mood = button.getAttribute("data-mood");

    // Add the corresponding background and expression classes
    characterFace.classList.add(`mood-${mood}`, `expression-${mood}`);

    // Save the mood with a timestamp
    saveMood(mood);
  });
});
