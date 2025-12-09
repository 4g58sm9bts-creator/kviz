// Isti defaultQuestions kao u script.js – za pregled konteksta (ali ovdje ih ne mijenjamo)

const defaultQuestionsAdmin = {
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

function loadTeacherQuestions() {
  try {
    return JSON.parse(localStorage.getItem("teacherQuestions") || "{}");
  } catch {
    return {};
  }
}

function saveTeacherQuestions(obj) {
  localStorage.setItem("teacherQuestions", JSON.stringify(obj));
}

// stanje za uređivanje
let editing = {
  grade: null,
  index: null // index unutar teacherQuestions[grade]
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form");
  const filterSelect = document.getElementById("filter-grade");
  const resetBtn = document.getElementById("reset-btn");

  form.addEventListener("submit", onFormSubmit);
  filterSelect.addEventListener("change", renderQuestionsList);
  resetBtn.addEventListener("click", clearForm);

  // inicijalni prikaz
  renderQuestionsList();
});

// ---------------- FORM ----------------

function onFormSubmit(event) {
  event.preventDefault();

  const grade = document.getElementById("form-grade").value;
  const questionText = document.getElementById("form-question").value.trim();
  const a1 = document.getElementById("form-a1").value.trim();
  const a2 = document.getElementById("form-a2").value.trim();
  const a3 = document.getElementById("form-a3").value.trim();
  const correct = parseInt(document.getElementById("form-correct").value, 10);
  const msg = document.getElementById("form-message");

  if (!questionText || !a1 || !a2 || !a3) {
    msg.textContent = "Molimo ispunite sva polja.";
    msg.style.color = "var(--danger)";
    return;
  }

  const newQ = {
    q: questionText,
    a: [a1, a2, a3],
    c: correct
  };

  const teacherQuestions = loadTeacherQuestions();
  if (!teacherQuestions[grade]) teacherQuestions[grade] = [];

  if (editing.grade === grade && editing.index !== null) {
    // uređivanje postojećeg
    teacherQuestions[grade][editing.index] = newQ;
    msg.textContent = "Pitanje je ažurirano.";
  } else {
    // novo pitanje
    teacherQuestions[grade].push(newQ);
    msg.textContent = "Pitanje je dodano.";
  }

  msg.style.color = "var(--success)";

  saveTeacherQuestions(teacherQuestions);
  clearForm();
  renderQuestionsList();
}

function clearForm() {
  document.getElementById("form-question").value = "";
  document.getElementById("form-a1").value = "";
  document.getElementById("form-a2").value = "";
  document.getElementById("form-a3").value = "";
  document.getElementById("form-correct").value = "0";
  editing.grade = null;
  editing.index = null;
  const msg = document.getElementById("form-message");
  msg.textContent = "";
}

// ---------------- LISTA PITANJA ----------------

function renderQuestionsList() {
  const grade = document.getElementById("filter-grade").value;
  const container = document.getElementById("questions-list");
  const teacherQuestions = loadTeacherQuestions();

  container.innerHTML = "";

  const list = teacherQuestions[grade] || [];

  if (list.length === 0) {
    container.textContent = "Još nema dodanih pitanja za ovaj razred.";
    return;
  }

  list.forEach((q, index) => {
    const item = document.createElement("div");
    item.className = "question-item";

    const header = document.createElement("div");
    header.className = "question-header";

    const title = document.createElement("div");
    title.className = "question-text";
    title.textContent = q.q;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `${grade}. razred`;

    header.appendChild(title);
    header.appendChild(badge);

    const answers = document.createElement("div");
    answers.className = "answers-small";
    answers.innerHTML = `
      1) ${q.a[0]} ${q.c === 0 ? "✔" : ""}<br>
      2) ${q.a[1]} ${q.c === 1 ? "✔" : ""}<br>
      3) ${q.a[2]} ${q.c === 2 ? "✔" : ""}
    `;

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-xs btn-outline";
    editBtn.textContent = "Uredi";
    editBtn.addEventListener("click", () => loadQuestionIntoForm(grade, index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-xs btn-danger";
    deleteBtn.textContent = "Obriši";
    deleteBtn.addEventListener("click", () => deleteQuestion(grade, index));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(header);
    item.appendChild(answers);
    item.appendChild(actions);

    container.appendChild(item);
  });
}

function loadQuestionIntoForm(grade, index) {
  const teacherQuestions = loadTeacherQuestions();
  const q = teacherQuestions[grade][index];
  if (!q) return;

  document.getElementById("form-grade").value = grade;
  document.getElementById("form-question").value = q.q;
  document.getElementById("form-a1").value = q.a[0] || "";
  document.getElementById("form-a2").value = q.a[1] || "";
  document.getElementById("form-a3").value = q.a[2] || "";
  document.getElementById("form-correct").value = String(q.c);

  editing.grade = grade;
  editing.index = index;

  const msg = document.getElementById("form-message");
  msg.textContent = "Uređujete odabrano pitanje.";
  msg.style.color = "var(--muted)";
}

function deleteQuestion(grade, index) {
  if (!confirm("Sigurno želiš obrisati ovo pitanje?")) return;

  const teacherQuestions = loadTeacherQuestions();
  if (!teacherQuestions[grade]) return;

  teacherQuestions[grade].splice(index, 1);
  saveTeacherQuestions(teacherQuestions);
  renderQuestionsList();

  const msg = document.getElementById("form-message");
  msg.textContent = "Pitanje je obrisano.";
  msg.style.color = "var(--danger)";
}
