// -------------------- POČETNA (default) PITANJA --------------------
// Možeš ih kasnije proširiti

const defaultQuestions = {
  5: [
    { q: "Koji je rod imenice 'jedrilica'?", a: ["muški", "ženski", "srednji"], c: 1 },
    { q: "Riječ 'pjevanje' je:", a: ["imenica", "glagol", "pridjev"], c: 0 }
  ],
  6: [
    { q: "Koja je zamjenica?", a: ["on", "kuća", "trčati"], c: 0 },
    { q: "Glagolsko vrijeme 'pisao sam' je:", a: ["perfekt", "aorist", "prezent"], c: 0 }
  ],
  7: [
    { q: "Što je priložna oznaka?", a: ["određuje glagol", "opisuje imenicu", "zamjenjuje imenicu"], c: 0 }
  ],
  8: [
    {
      q: "Što je nezavisnosložena rečenica?",
      a: [
        "Rečenica sastavljena od više samostalnih surečenica",
        "Rečenica u kojoj jedna ovisi o drugoj",
        "Jednostavna rečenica s jednim predikatom"
      ],
      c: 0
    },
    {
      q: "Koji su sastavni veznici?",
      a: ["i, pa, te", "ali, nego, no", "ako, iako, premda"],
      c: 0
    }
  ]
};

// -------------------- POMOĆNE FUNKCIJE --------------------

function loadTeacherQuestions() {
  try {
    return JSON.parse(localStorage.getItem("teacherQuestions") || "{}");
  } catch {
    return {};
  }
}

function getQuestionsForGrade(grade) {
  const teacher = loadTeacherQuestions()[grade] || [];
  const base = defaultQuestions[grade] || [];
  const all = [...base, ...teacher];
  return shuffleArray(all);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function calculateSchoolGrade(percent) {
  if (percent >= 90) return 5;
  if (percent >= 75) return 4;
  if (percent >= 60) return 3;
  if (percent >= 40) return 2;
  return 1;
}

// -------------------- STANJE KVIZA --------------------

let currentGrade = null;
let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

// -------------------- INICIJALIZACIJA --------------------

document.addEventListener("DOMContentLoaded", () => {
  const gradeButtons = document.querySelectorAll(".grade-btn");
  gradeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const grade = parseInt(btn.dataset.grade, 10);
      startQuiz(grade);
    });
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    nextQuestion();
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    if (currentGrade) {
      startQuiz(currentGrade);
    }
  });

  document.getElementById("change-grade-btn").addEventListener("click", () => {
    showSection("select");
  });
});

// -------------------- PRIKAZ SEKCIJA --------------------

function showSection(which) {
  const selectLevel = document.getElementById("select-level");
  const quiz = document.getElementById("quiz");
  const end = document.getElementById("end");

  selectLevel.classList.add("hidden");
  quiz.classList.add("hidden");
  end.classList.add("hidden");

  if (which === "select") {
    document.getElementById("title").textContent = "Odaberi razred";
    selectLevel.classList.remove("hidden");
  } else if (which === "quiz") {
    quiz.classList.remove("hidden");
  } else if (which === "end") {
    end.classList.remove("hidden");
  }
}

// -------------------- KVIZ --------------------

function startQuiz(grade) {
  currentGrade = grade;
  questions = getQuestionsForGrade(grade);
  currentIndex = 0;
  score = 0;

  document.getElementById("title").textContent = `Razred: ${grade}.`;
  document.getElementById("grade-label").textContent = `${grade}. razred`;
  showSection("quiz");
  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const qObj = questions[currentIndex];
  if (!qObj) {
    endQuiz();
    return;
  }

  const total = questions.length;
  document.getElementById("question-counter").textContent = `Pitanje ${currentIndex + 1} / ${total}`;
  document.getElementById("question").textContent = qObj.q;
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").classList.add("hidden");

  const progress = ((currentIndex) / total) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  qObj.a.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn answer-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleAnswer(idx, btn));
    answersDiv.appendChild(btn);
  });
}

function handleAnswer(index, btnElement) {
  if (answered) return;
  answered = true;

  const qObj = questions[currentIndex];

  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((b, i) => {
    if (i === qObj.c) b.classList.add("correct");
    if (i === index && i !== qObj.c) b.classList.add("wrong");
    b.disabled = true;
  });

  if (index === qObj.c) {
    score++;
    const fb = document.getElementById("feedback");
    fb.textContent = "Točno! ✔";
    fb.style.color = "var(--success)";
  } else {
    const fb = document.getElementById("feedback");
    fb.textContent = "Netočno. ❌";
    fb.style.color = "var(--danger)";
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function endQuiz() {
  showSection("end");

  const total = questions.length || 1;
  const percent = Math.round((score / total) * 100);
  const ocjena = calculateSchoolGrade(percent);

  document.getElementById(
    "result"
  ).textContent = `Točnih odgovora: ${score} od ${total} (${percent}%).`;
  document.getElementById(
    "grade-result"
  ).textContent = `Školska ocjena: ${ocjena}`;
}
