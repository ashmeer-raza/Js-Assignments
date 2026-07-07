const dashboard = document.getElementById("dashboard");
const cards = document.querySelectorAll(".card");
const featureSections = document.querySelectorAll(".feature"); // all feature
const backButtons = document.querySelectorAll("[data-action='back']");

// 1. Todo elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

//Daily Goal
const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const goalProgress = document.getElementById("goalProgress");

//Timer
const timerDisplay = document.getElementById("timerDisplay");
const sessionLabel = document.getElementById("sessionLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

//motivation quoto
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

//D&T
const dateDisplay = document.getElementById("dateDisplay");
const timeDisplay = document.getElementById("timeDisplay");

//Wheather
const weatherContent = document.getElementById("weatherContent");
const getWeatherBtn = document.getElementById("getWeatherBtn");

//BG
const backgroundLabel = document.getElementById("backgroundLabel");

// Theme
const themeToggle = document.getElementById("themeToggle");

function openFeature(name) {
  dashboard.classList.add("hidden");

  const target = document.querySelector(`[data-feature-section="${name}"]`);
  if (target) {
    target.classList.remove("hidden");
  }
}

function goBackHome() {
  featureSections.forEach((section) => section.classList.add("hidden"));
  dashboard.classList.remove("hidden");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const featureName = card.dataset.feature;
    openFeature(featureName);
  });
});

backButtons.forEach((btn) => {
  btn.addEventListener("click", goBackHome);
});

let todos = [];

function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    todos = JSON.parse(saved);
  }
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    if (todo.important) li.classList.add("important");

    li.dataset.index = index;

    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <button class="important-btn" title="Mark important">⭐</button>
      <button class="complete-btn" title="Mark complete">✔️</button>
      <button class="delete-btn" title="Delete">🗑️</button>
    `;

    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({
    text: text,
    completed: false,
    important: false,
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
}

todoList.addEventListener("click", (event) => {
  const li = event.target.closest(".todo-item");
  if (!li) return;

  const index = Number(li.dataset.index);

  if (event.target.classList.contains("delete-btn")) {
    todos.splice(index, 1);
  } else if (event.target.classList.contains("complete-btn")) {
    todos[index].completed = !todos[index].completed;
  } else if (event.target.classList.contains("important-btn")) {
    todos[index].important = !todos[index].important;
  } else {
    return;
  }

  saveTodos();
  renderTodos();
});

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

loadTodos();

const plannerSlots = document.getElementById("plannerSlots");
let plannerData = {};

function loadPlanner() {
  const saved = localStorage.getItem("plannerData");
  if (saved) plannerData = JSON.parse(saved);
  renderPlanner();
}

function savePlanner() {
  localStorage.setItem("plannerData", JSON.stringify(plannerData));
}

function renderPlanner() {
  plannerSlots.innerHTML = "";
  const currentHour = new Date().getHours();

  for (let hour = 6; hour <= 23; hour++) {
    const row = document.createElement("div");
    row.className = "planner-slot";
    if (hour === currentHour) row.classList.add("current-hour");

    const label = document.createElement("span");
    label.className = "planner-slot-time";
    label.textContent = formatHour(hour);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Add a note...";
    input.value = plannerData[hour] || "";
    input.dataset.hour = hour;

    row.appendChild(label);
    row.appendChild(input);
    plannerSlots.appendChild(row);
  }
}

function formatHour(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

let plannerSaveTimeout;
plannerSlots.addEventListener("input", (event) => {
  const hour = event.target.dataset.hour;
  if (!hour) return;

  plannerData[hour] = event.target.value;

  clearTimeout(plannerSaveTimeout);
  plannerSaveTimeout = setTimeout(savePlanner, 400);
});

loadPlanner();

// Daily Goal
let goals = [];

function loadGoals() {
  const saved = localStorage.getItem("goals");
  if (saved) goals = JSON.parse(saved);
  renderGoals();
}

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (goal.completed) li.classList.add("completed");
    li.dataset.index = index;

    li.innerHTML = `
      <span class="todo-text">${goal.text}</span>
      <button class="complete-btn" title="Mark complete">✔️</button>
      <button class="delete-btn" title="Delete">🗑️</button>
    `;

    goalList.appendChild(li);
  });

  updateGoalProgress();
}

function updateGoalProgress() {
  const completedCount = goals.filter((g) => g.completed).length;
  goalProgress.textContent = `${completedCount} of ${goals.length} completed`;
}

function addGoal() {
  const text = goalInput.value.trim();
  if (text === "") return;

  goals.push({ text: text, completed: false });
  goalInput.value = "";
  saveGoals();
  renderGoals();
}

goalList.addEventListener("click", (event) => {
  const li = event.target.closest(".todo-item");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (event.target.classList.contains("delete-btn")) {
    goals.splice(index, 1);
  } else if (event.target.classList.contains("complete-btn")) {
    goals[index].completed = !goals[index].completed;
  } else {
    return;
  }

  saveGoals();
  renderGoals();
});

addGoalBtn.addEventListener("click", addGoal);
goalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addGoal();
});

loadGoals();

// POMODORO TIMER
const WORK_DURATION = 25 * 60;
let secondsLeft = WORK_DURATION;
let timerInterval = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // padStart adds a leading zero: "5" -> "05"
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(secondsLeft);
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      sessionLabel.textContent = "Session complete! 🎉";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  secondsLeft = WORK_DURATION;
  sessionLabel.textContent = "Work Session";
  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();

async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent =
      '"The only way to do great work is to love what you do."';
    quoteAuthor.textContent = "— Steve Jobs (offline fallback)";
  }
}

newQuoteBtn.addEventListener("click", fetchQuote);

// WEATHER WIDGET (Fetch API + Geolocation)
async function fetchWeather(lat, lon) {
  weatherContent.innerHTML = "<p>Loading weather...</p>";

  try {
    // Open-Meteo: free weather API, no key needed
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather request failed");

    const data = await response.json();
    const current = data.current;

    weatherContent.innerHTML = `
      <p class="weather-main">${Math.round(current.temperature_2m)}°C</p>
      <p class="weather-details">Humidity: ${current.relative_humidity_2m}%</p>
      <p class="weather-details">Wind: ${current.wind_speed_10m} km/h</p>
      <button id="getWeatherBtn">Refresh</button>
    `;
    document
      .getElementById("getWeatherBtn")
      .addEventListener("click", getWeather);
  } catch (error) {
    weatherContent.innerHTML = `
      <p>Couldn't load weather right now.</p>
      <button id="getWeatherBtn">Try Again</button>
    `;
    document
      .getElementById("getWeatherBtn")
      .addEventListener("click", getWeather);
  }
}

function getWeather() {
  if (!navigator.geolocation) {
    weatherContent.innerHTML =
      "<p>Geolocation isn't supported by your browser.</p>";
    return;
  }

  weatherContent.innerHTML = "<p>Requesting your location...</p>";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    () => {
      weatherContent.innerHTML = `
        <p>Location access denied. Can't show local weather.</p>
        <button id="getWeatherBtn">Try Again</button>
      `;
      document
        .getElementById("getWeatherBtn")
        .addEventListener("click", getWeather);
    },
  );
}

getWeatherBtn.addEventListener("click", getWeather);

//DATE & TIME DISPLAY
function updateDateTime() {
  const now = new Date();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateDisplay.textContent = now.toLocaleDateString(undefined, dateOptions);

  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  timeDisplay.textContent = now.toLocaleTimeString(undefined, timeOptions);
}

updateDateTime();
setInterval(updateDateTime, 1000);

//  DYNAMIC BACKGROUND
const BACKGROUND_CLASSES = [
  "bg-morning",
  "bg-afternoon",
  "bg-evening",
  "bg-night",
];

function getBackgroundCategory(hour) {
  if (hour >= 5 && hour < 12)
    return { className: "bg-morning", label: "Morning" };
  if (hour >= 12 && hour < 17)
    return { className: "bg-afternoon", label: "Afternoon" };
  if (hour >= 17 && hour < 21)
    return { className: "bg-evening", label: "Evening" };
  return { className: "bg-night", label: "Night" }; // covers 21-23 and 0-4, no gaps
}

function applyDynamicBackground() {
  const hour = new Date().getHours();
  const category = getBackgroundCategory(hour);

  document.body.classList.remove(...BACKGROUND_CLASSES);
  document.body.classList.add(category.className);

  if (backgroundLabel) {
    backgroundLabel.textContent = `Current mood: ${category.label}`;
  }
}

applyDynamicBackground();
setInterval(applyDynamicBackground, 60 * 1000); // re-check every minute

// THEME SWITCH (Light/Dark)

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.checked = isDark;
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark");
}

themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

loadTheme();
