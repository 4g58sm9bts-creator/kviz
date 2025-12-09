// -------------------- POČETNA (default) PITANJA --------------------

const defaultQuestions = {
  5: [
    { q: "Koji je rod imenice 'jedrilica'?", a: ["muški", "ženski", "srednji"], c: 1 },
    { q: "Riječ 'pjevanje' je:", a: ["imenica", "glagol", "pridjev"], c: 0 },
    { q: "Koja je riječ glagol?", a: ["knjiga", "trčati", "kuća"], c: 1 },
    { q: "Koja je imenica vlastita?", a: ["pas", "Rijeka", "voda"], c: 1 },
    { q: "Riječ 'lijepo' je:", a: ["pridjev", "prilog", "glagol"], c: 1 },
    { q: "Množina imenice 'oko' glasi:", a: ["okci", "oci", "oka"], c: 1 },
    { q: "Suprotnost riječi 'visok' je:", a: ["nizak", "malen", "tanak"], c: 0 },
    { q: "Kojoj vrsti riječi pripada 'na'?", a: ["prijedlog", "zamjenica", "veznik"], c: 0 },
    { q: "Koliko glasova ima riječ 'more'?", a: ["3", "4", "5"], c: 1 },
    { q: "Koja rečenica je ispravna?", a: ["Idem školi.", "Idem u školu.", "Idem škola."], c: 1 },
    { q: "Što određuje padež?", a: ["odnos riječi u rečenici", "vrijeme glagola", "rod imenice"], c: 0 }
  ],

  6: [
    { q: "Koja je posvojna zamjenica?", a: ["moj", "ja", "ono"], c: 0 },
    { q: "Odredi vrstu broja: 'peti'", a: ["glavni", "redni", "neodređeni"], c: 1 },
    { q: "Što označuje prilog?", a: ["osobu", "okolnost radnje", "stanje"], c: 1 },
    { q: "Koja je riječ glagolski oblik?", a: ["pisanje", "pisao sam", "pisac"], c: 1 },
    { q: "Antonim od 'spor' je:", a: ["tih", "brz", "malen"], c: 1 },
    { q: "Što je predikat?", a: ["opis imenice", "glagol u rečenici", "veznik"], c: 1 },
    { q: "Koja je upitna zamjenica?", a: ["tko", "naš", "netko"], c: 0 },
    { q: "Komparativ od 'dobar' je:", a: ["dobriji", "bolji", "boljši"], c: 1 },
    { q: "Koji glagol je povratan?", a: ["prati se", "prati", "prala"], c: 0 },
    { q: "Koja je rečenica potvrdna?", a: ["Ne volim to.", "Volim to.", "Zašto to voliš?"], c: 1 }
  ],

  7: [
    { q: "Koja je složena rečenica?", a: ["Sunce sja.", "Došao sam kad je zasjalo sunce.", "Sunce i mjesec."], c: 1 },
    { q: "Što je objekt?", a: ["tko vrši radnju", "koga/što", "opis glagola"], c: 1 },
    { q: "Veznik 'ali' je:", a: ["sastavni", "suprotni", "rastavni"], c: 1 },
    { q: "Predikat je:", a: ["glagol u rečenici", "opis imenice", "veznik"], c: 0 },
    { q: "'Idem gdje želiš' – koja je to rečenica?", a: ["mjesna", "namjerna", "uzročna"], c: 0 },
    { q: "Glagolski prilog sadašnji je:", a: ["trčeći", "trčao", "trčanje"], c: 0 },
    { q: "Riječ 'iako' uvodi:", a: ["dopusnu rečenicu", "mjesnu", "vremensku"], c: 0 },
    { q: "Dopuni: 'Bio sam doma, ___ je padala kiša.'", a: ["da", "jer", "kad"], c: 2 },
    { q: "Vrsta zavisne: 'Znam tko si.'", a: ["objektna", "subjektna", "uzročna"], c: 0 },
    { q: "'Ako dođeš, idemo van.' – koja je vrsta?", a: ["vremenska", "pogodbena", "posljedična"], c: 1 }
  ],

  8: [
    { q: "Koji je rastavni veznik?", a: ["i", "ili", "ali"], c: 1 },
    { q: "'Uči, pa ćeš uspjeti' je:", a: ["sastavna", "suprotna", "isključna"], c: 0 },
    { q: "Primjer suprotne rečenice:", a: ["Dođi ili idi.", "Pokušao sam, ali nisam uspio.", "Dođi i sjedni."], c: 1 },
    { q: "Koji veznik izriče isključenje?", a: ["nego", "ili", "samo"], c: 2 },
    { q: "Koja rečenica izriče posljedicu?", a: ["Pada kiša, pa ostajemo doma.", "Volim ga, ali me ljuti.", "Uči ili idi."], c: 0 },
    { q: "Sastavna rečenica spaja:", a: ["suprotne radnje", "ovisne dijelove", "nadovezujuće radnje"], c: 2 },
    { q: "Odaberi isključnu rečenicu:", a: ["Dođi i sjedni.", "Dođi, ili idi.", "Pokušao sam, ali nisam uspio."], c: 1 },
    { q: "Koji veznik NIJE nezavisnosložni?", a: ["i", "jer", "ali"], c: 1 },
    { q: "'Pohitali su, te su brzo stigli.' je:", a: ["sastavna", "suprotna", "rastavna"], c: 0 },
    { q: "Koja je ispravno nezavisnosložena?", a: ["Ne znam koji si.", "Ustao sam rano i otišao u školu.", "Volim te jer si dobar."], c: 1 }
  ]
};

// -------------------- KONSTANTE ZA LOCALSTORAGE --------------------

const LS_RESULTS_KEY = "quizResults"; // svi rezultati (za leaderboard)

// -------------------- FUNKCIJE ZA REZULTATE --------------------

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
  return shuffleArray([...base, ...teacher]);
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

function saveResultToLeaderboard(name, grade, score, total) {
  const percent = Math.round((score / total) * 100);
  const result = {
    name,
    grade,
    score,
    total,
    percent,
    timestamp: Date.now()
  };

  let results = [];
  try {
    results = JSON.parse(localStorage.getItem(LS_RESULTS_KEY)) || [];
  } catch {
    results = [];
  }

  results.push(result);

  // po želji možemo ograničiti na npr. zadnjih 200
  if (results.length > 200) {
    results = results.slice(results.length - 200);
  }

  localStorage.setItem(LS_RESULTS_KEY, JSON.stringify(results));
}

// -------------------- STANJE KVIZA --------------------

let currentGrade = null;
let currentPlayerName = "";
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
      startQuizWithName(grade);
    });
  });

  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("restart-btn").addEventListener("click", () => startQuiz(currentGrade));
  document.getElementById("change-grade-btn").addEventListener("click", () => showSection("select"));
});

// -------------------- FUNKCIJE ZA SEKCIJE --------------------

function showSection(which) {
  document.getElementById("select-level").classList.add("hidden");
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("end").classList.add("hidden");

  if (which === "select") document.getElementById("select-level").classList.remove("hidden");
  if (which === "quiz") document.getElementById("quiz").classList.remove("hidden");
  if (which === "end") document.getElementById("end").classList.remove("hidden");

  if (which === "select") {
    document.getElementById("title").textContent = "Početak";
  }
}

// -------------------- KVIZ – START S IMENOM --------------------

function startQuizWithName(grade) {
  const nameInput = document.getElementById("player-name");
  const name = (nameInput.value || "").trim();

  if (!name || name.length < 2) {
    alert("Molim te upiši svoje ime (barem 2 slova) prije početka kviza.");
    nameInput.focus();
    return;
  }

  currentPlayerName = name;
  startQuiz(grade);
}

// -------------------- KVIZ GLAVNI --------------------

function startQuiz(grade) {
  currentGrade = grade;
  questions = getQuestionsForGrade(grade);
  currentIndex = 0;
  score = 0;

  document.getElementById("title").textContent = `Razred: ${grade}.`;
  document.getElementById("grade-label").textContent = `${grade}. razred`;
  document.getElementById("player-label").textContent = `Igrač: ${currentPlayerName}`;

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

  const progress = (currentIndex / total) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  qObj.a.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn answer-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleAnswer(idx));
    answersDiv.appendChild(btn);
  });
}

function handleAnswer(index) {
  if (answered) return;
  answered = true;

  const qObj = questions[currentIndex];
  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach((b, i) => {
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

  document.getElementById("result").textContent = `Točnih odgovora: ${score} / ${total} (${percent}%).`;
  document.getElementById("grade-result").textContent = `Školska ocjena: ${ocjena}`;

  // spremi rezultat za leaderboard
  if (currentPlayerName && currentGrade) {
    saveResultToLeaderboard(currentPlayerName, currentGrade, score, total);
  }
}
