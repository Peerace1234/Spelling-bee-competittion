const WORDS = {
  easy: [
    {
      word: "apple",
      def: "A round fruit, typically red, green, or yellow",
      origin: "Old English",
    },
    {
      word: "bridge",
      def: "A structure built to span a physical obstacle",
      origin: "Old English",
    },
    {
      word: "castle",
      def: "A large medieval building or fortress",
      origin: "Latin castellum",
    },
    {
      word: "dragon",
      def: "A mythical fire-breathing reptilian creature",
      origin: "Greek drakon",
    },
    {
      word: "engine",
      def: "A machine that converts energy into motion",
      origin: "Latin ingenium",
    },
    {
      word: "forest",
      def: "A large area covered in trees and underbrush",
      origin: "Latin foresta",
    },
    {
      word: "garden",
      def: "A piece of ground for growing flowers or vegetables",
      origin: "Old French gardin",
    },
    {
      word: "harbor",
      def: "A place on the coast for ships to dock",
      origin: "Old English herebeorg",
    },
    {
      word: "island",
      def: "A landmass surrounded entirely by water",
      origin: "Old English igland",
    },
    {
      word: "jungle",
      def: "Dense vegetation in a tropical rainforest",
      origin: "Sanskrit jangala",
    },
    {
      word: "kernel",
      def: "The central part of a seed or the core of a nut",
      origin: "Old English cyrnel",
    },
    {
      word: "ladder",
      def: "A structure used for climbing up and down",
      origin: "Old English hlaeder",
    },
    {
      word: "marble",
      def: "A hard crystalline metamorphic limestone",
      origin: "Latin marmor",
    },
    {
      word: "napkin",
      def: "A square piece of cloth used to wipe the mouth",
      origin: "French nappe",
    },
    {
      word: "oyster",
      def: "A bivalve marine mollusk, often eaten as food",
      origin: "Greek ostreon",
    },
  ],
  medium: [
    {
      word: "abandon",
      def: "To leave permanently; to give up completely",
      origin: "Old French",
    },
    {
      word: "bizarre",
      def: "Very strange or unusual in appearance or style",
      origin: "French from Basque",
    },
    {
      word: "ceiling",
      def: "The upper interior surface of a room",
      origin: "Middle English celing",
    },
    {
      word: "deceive",
      def: "To cause someone to believe something false",
      origin: "Latin decipere",
    },
    {
      word: "elegant",
      def: "Pleasingly graceful and stylish in appearance",
      origin: "Latin elegans",
    },
    {
      word: "fascinate",
      def: "To attract and hold the attention of",
      origin: "Latin fascinare",
    },
    {
      word: "grateful",
      def: "Feeling or showing appreciation for kindness",
      origin: "Latin gratus",
    },
    {
      word: "hygiene",
      def: "Conditions or practices conducive to health",
      origin: "Greek hygieine",
    },
    {
      word: "immense",
      def: "Extremely large or great, enormous in scale",
      origin: "Latin immensus",
    },
    {
      word: "jealous",
      def: "Feeling resentful toward someone's success",
      origin: "Greek zelos",
    },
    {
      word: "knowledge",
      def: "Facts and information acquired through experience",
      origin: "Old English cnawan",
    },
    {
      word: "leisure",
      def: "Time when one is not working; free time",
      origin: "Old French leisir",
    },
    {
      word: "mischief",
      def: "Playful misbehavior; tendency to cause trouble",
      origin: "Old French meschief",
    },
    {
      word: "nuisance",
      def: "A person or thing causing inconvenience or annoyance",
      origin: "Latin nocere",
    },
    {
      word: "obstacle",
      def: "A thing that blocks one's way or prevents progress",
      origin: "Latin obstaculum",
    },
  ],
  hard: [
    {
      word: "abhorrence",
      def: "A feeling of repulsion; strong dislike",
      origin: "Latin abhorrere",
    },
    {
      word: "bureaucracy",
      def: "A system of government with complex official procedures",
      origin: "French bureau",
    },
    {
      word: "cacophonous",
      def: "Involving or producing a harsh discordant mixture of sounds",
      origin: "Greek kakophonos",
    },
    {
      word: "desiccate",
      def: "To remove moisture from; to dry out completely",
      origin: "Latin desiccare",
    },
    {
      word: "ephemeral",
      def: "Lasting for a very short time; transitory",
      origin: "Greek ephemeros",
    },
    {
      word: "facetious",
      def: "Treating serious matters with inappropriate humor",
      origin: "Latin facetus",
    },
    {
      word: "gregarious",
      def: "Fond of company; sociable; liking to be in crowds",
      origin: "Latin gregarius",
    },
    {
      word: "hypocrite",
      def: "A person who pretends to have virtues they lack",
      origin: "Greek hypokrites",
    },
    {
      word: "idiosyncratic",
      def: "Peculiar to an individual; having unusual characteristics",
      origin: "Greek idios",
    },
    {
      word: "juxtaposition",
      def: "The placing of two things close together for contrast",
      origin: "Latin juxta",
    },
    {
      word: "kaleidoscope",
      def: "A tube with mirrors producing changing symmetrical patterns",
      origin: "Greek kalos",
    },
    {
      word: "labyrinthine",
      def: "Resembling a labyrinth; twisted and complex",
      origin: "Greek labyrinthos",
    },
    {
      word: "melancholy",
      def: "A feeling of pensive sadness; deep gloom",
      origin: "Greek melas khole",
    },
    {
      word: "nonchalance",
      def: "The state of being calm and relaxed; casual indifference",
      origin: "French non chaloir",
    },
    {
      word: "obsequious",
      def: "Excessively obedient or attentive; servile",
      origin: "Latin obsequium",
    },
  ],
};

let state = {
  phase: "idle",
  currentWord: null,
  timer: null,
  timeLeft: 30,
  totalTime: 30,
  correct: 0,
  streak: 0,
  total: 0,
  history: [],
  recognition: null,
  lastHeard: "",
  inputMode: "voice",
  usedWords: new Set(),
  level: "medium",
};

function getEl(id) {
  return document.getElementById(id);
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognitionActive = false;

function initRecognition() {
  if (!SpeechRecognition) {
    getEl("noSupportWarning").style.display = "block";
    getEl("inputMode").value = "type";
    state.inputMode = "type";
    return;
  }
  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;
  state.recognition.interimResults = true;
  state.recognition.lang = "en-US";
  state.recognition.onresult = (e) => {
    let t = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      t += e.results[i][0].transcript;
    }
    const cleaned = t.trim().replace(/\s+/g, "").toUpperCase();
    state.lastHeard = cleaned;
    getEl("attemptDisplay").textContent = cleaned || "—";
  };
  state.recognition.onend = () => {
    recognitionActive = false;
    getEl("micIndicator").classList.remove("active");
    getEl("voiceBtn").classList.remove("listening");
    if (state.phase === "active" && state.lastHeard) {
      checkAnswer(state.lastHeard);
    }
  };
  state.recognition.onerror = (e) => {
    recognitionActive = false;
    getEl("micIndicator").classList.remove("active");
    getEl("voiceBtn").classList.remove("listening");
  };
}

function pickWord() {
  const pool = WORDS[state.level];
  const available = pool.filter((w) => !state.usedWords.has(w.word));
  if (available.length === 0) {
    state.usedWords.clear();
    return pickWord();
  }
  return available[Math.floor(Math.random() * available.length)];
}

function startRound() {
  state.level = getEl("levelSelect").value;
  state.inputMode = getEl("inputMode").value;
  state.totalTime = parseInt(getEl("timerSetting").value) || 30;
  state.timeLeft = state.totalTime;
  state.currentWord = pickWord();
  state.usedWords.add(state.currentWord.word);
  state.lastHeard = "";
  state.phase = "active";

  renderWord();
  renderTimer();
  getEl("timerSection").style.display = "block";
  getEl("resultBanner").className = "result-banner";
  getEl("resultBanner").style.display = "none";

  if (state.inputMode === "voice") {
    getEl("voiceSection").style.display = "block";
    getEl("typeSection").style.display = "none";
    getEl("attemptDisplay").textContent = "—";
  } else {
    getEl("voiceSection").style.display = "none";
    getEl("typeSection").style.display = "block";
    getEl("manualInput").value = "";
    getEl("manualInput").focus();
  }

  getEl("startBtn").textContent = "Next Word";
  getEl("skipBtn").disabled = false;

  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeft--;
    renderTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      timeUp();
    }
  }, 1000);
}

function renderWord() {
  const w = state.currentWord;
  const totalWords = WORDS[state.level].length;
  getEl("wordDisplay").innerHTML = `
    <div class="word-category">${state.level.toUpperCase()} · SPELL THIS WORD</div>
    <div class="word-text">${w.word.toUpperCase()}</div>
    <div class="word-definition">"${w.def}"</div>
    <div class="word-origin">Etymology: ${w.origin}</div>
  `;
}

const circumference = 2 * Math.PI * 52;
function renderTimer() {
  const ring = getEl("progressRing");
  const frac = state.timeLeft / state.totalTime;
  ring.style.strokeDashoffset = circumference * (1 - frac);
  const pct = state.timeLeft / state.totalTime;
  ring.style.stroke =
    pct > 0.5 ? "#f5c842" : pct > 0.25 ? "#ef9f27" : "#e24b4a";
  getEl("timerDisplay").textContent = state.timeLeft;
  getEl("timerDisplay").style.color = pct > 0.25 ? "#f5c842" : "#e24b4a";
}

function timeUp() {
  state.phase = "revealed";
  const attempt =
    state.inputMode === "type"
      ? getEl("manualInput").value.trim().toUpperCase()
      : state.lastHeard;
  addHistory(state.currentWord.word, attempt, false, true);
  showResult(false, state.currentWord.word, attempt, true);
  updateScores(false);
  getEl("skipBtn").disabled = true;
  if (state.inputMode === "voice" && recognitionActive) {
    state.recognition.stop();
  }
}

function checkAnswer(attempt) {
  if (state.phase !== "active") return;
  clearInterval(state.timer);
  state.phase = "revealed";
  const correct =
    attempt.toLowerCase() === state.currentWord.word.toLowerCase();
  addHistory(state.currentWord.word, attempt, correct, false);
  showResult(correct, state.currentWord.word, attempt, false);
  updateScores(correct);
  getEl("skipBtn").disabled = true;
  if (correct) launchConfetti();
}

function showResult(correct, word, attempt, timeout) {
  const b = getEl("resultBanner");
  const t = getEl("resultTitle");
  const s = getEl("resultSpelling");
  const d = getEl("resultDetail");
  if (timeout) {
    b.className = "result-banner wrong";
    t.textContent = "⏰ Time's up!";
    s.textContent = word.toUpperCase();
    d.textContent = attempt ? `You spelled: ${attempt}` : "No answer given";
  } else if (correct) {
    b.className = "result-banner correct";
    t.textContent = "✓ Correct!";
    s.textContent = word.toUpperCase();
    d.textContent = `Perfect spelling in ${state.totalTime - state.timeLeft}s`;
  } else {
    b.className = "result-banner wrong";
    t.textContent = "✗ Incorrect";
    s.textContent = `Correct: ${word.toUpperCase()}`;
    d.textContent = attempt ? `You spelled: ${attempt}` : "No answer heard";
  }
  b.style.display = "flex";
}

function updateScores(correct) {
  if (correct) {
    state.correct++;
    state.streak++;
  } else {
    state.streak = 0;
  }
  state.total++;
  getEl("scoreCorrect").textContent = state.correct;
  getEl("scoreStreak").textContent = state.streak;
  getEl("scoreTotal").textContent = state.total;
}

function addHistory(word, attempt, correct, timeout) {
  const entry = { word, attempt, correct, timeout, time: new Date() };
  state.history.unshift(entry);
  renderHistory();
}

function renderHistory() {
  const h = getEl("historyList");
  if (!state.history.length) {
    h.innerHTML =
      '<div style="font-size:13px;color:#444;text-align:center;padding:1rem;">No history yet</div>';
    return;
  }
  h.innerHTML = state.history
    .slice(0, 15)
    .map((e) => {
      const cls = e.correct ? "ok" : e.timeout ? "skip" : "fail";
      const tag = e.correct ? "✓" : e.timeout ? "⏰" : "✗";
      return `<div class="history-item">
      <span class="history-dot ${cls}"></span>
      <span class="history-word">${e.word.toUpperCase()}</span>
      <span class="history-attempt">${e.attempt || "—"}</span>
      <span style="font-size:11px;color:${cls === "ok" ? "#1d9e75" : cls === "fail" ? "#e24b4a" : "#555"}">${tag}</span>
    </div>`;
    })
    .join("");
}

function populateWordBank() {
  const level = getEl("levelSelect").value;
  getEl("wordBankDisplay").innerHTML = WORDS[level]
    .map((w) => `<span style="margin-right:16px;color:#555">${w.word}</span>`)
    .join("");
}

function skipWord() {
  if (state.phase !== "active") return;
  clearInterval(state.timer);
  state.phase = "revealed";
  addHistory(state.currentWord.word, "—", false, false);
  const b = getEl("resultBanner");
  b.className = "result-banner wrong";
  getEl("resultTitle").textContent = "Skipped";
  getEl("resultSpelling").textContent = state.currentWord.word.toUpperCase();
  getEl("resultDetail").textContent = "Word skipped";
  b.style.display = "flex";
  state.streak = 0;
  state.total++;
  getEl("scoreStreak").textContent = state.streak;
  getEl("scoreTotal").textContent = state.total;
  getEl("skipBtn").disabled = true;
  if (state.inputMode === "voice" && recognitionActive)
    state.recognition.stop();
}

function resetAll() {
  clearInterval(state.timer);
  state.phase = "idle";
  state.correct = 0;
  state.streak = 0;
  state.total = 0;
  state.history = [];
  state.usedWords.clear();
  state.lastHeard = "";
  getEl("scoreCorrect").textContent = 0;
  getEl("scoreStreak").textContent = 0;
  getEl("scoreTotal").textContent = 0;
  getEl("wordDisplay").innerHTML =
    '<div class="idle-message">Press "Start Round" to begin</div>';
  getEl("timerSection").style.display = "none";
  getEl("voiceSection").style.display = "none";
  getEl("typeSection").style.display = "none";
  getEl("resultBanner").className = "result-banner";
  getEl("resultBanner").style.display = "none";
  getEl("startBtn").textContent = "Start Round";
  getEl("skipBtn").disabled = true;
  renderHistory();
  if (recognitionActive && state.recognition) state.recognition.stop();
}

function launchConfetti() {
  const c = getEl("confettiContainer");
  const colors = ["#f5c842", "#1d9e75", "#f0ead6", "#5DCAA5", "#ffd44d"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = Math.random() * 100 + "%";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = 1.5 + Math.random() * 2 + "s";
    p.style.animationDelay = Math.random() * 0.5 + "s";
    p.style.width = p.style.height = 6 + Math.random() * 8 + "px";
    c.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((t, i) => {
    t.classList.toggle("active", ["history", "words"][i] === name);
  });
  document.querySelectorAll(".tab-content").forEach((t) => {
    t.classList.toggle("active", t.id === "tab-" + name);
  });
  if (name === "words") populateWordBank();
}

getEl("startBtn").addEventListener("click", startRound);
getEl("skipBtn").addEventListener("click", skipWord);
getEl("resetBtn").addEventListener("click", resetAll);

getEl("voiceBtn").addEventListener("click", () => {
  if (state.phase !== "active") return;
  if (recognitionActive) {
    state.recognition.stop();
    return;
  }
  state.lastHeard = "";
  getEl("attemptDisplay").textContent = "—";
  recognitionActive = true;
  getEl("micIndicator").classList.add("active");
  getEl("voiceBtn").classList.add("listening");
  state.recognition.start();
});

getEl("submitBtn").addEventListener("click", () => {
  const val = getEl("manualInput").value.trim().toUpperCase();
  if (val) checkAnswer(val);
});

getEl("manualInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = getEl("manualInput").value.trim().toUpperCase();
    if (val && state.phase === "active") checkAnswer(val);
  }
});

getEl("levelSelect").addEventListener("change", () => {
  state.level = getEl("levelSelect").value;
  populateWordBank();
});

getEl("inputMode").addEventListener("change", () => {
  state.inputMode = getEl("inputMode").value;
});

initRecognition();
populateWordBank();
