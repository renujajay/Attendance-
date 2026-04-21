const students = [
  "Adam Silva",
  "Ben Perera",
  "Chris Fernando",
  "Daniel Jay",
  "Ethan Kumar",
  "Farhan Ali"
];

let presentStudents = [];

const sessionDate = document.getElementById("sessionDate");
const searchBox = document.getElementById("searchBox");
const studentList = document.getElementById("studentList");
const presentList = document.getElementById("presentList");
const showSummaryBtn = document.getElementById("showSummaryBtn");
const summaryBox = document.getElementById("summaryBox");
const status = document.getElementById("status");

const today = new Date().toISOString().split("T")[0];
sessionDate.value = today;

function renderStudentList(filter = "") {
  studentList.innerHTML = "";

  const filteredStudents = students.filter(name =>
    name.toLowerCase().includes(filter.toLowerCase()) &&
    !presentStudents.includes(name)
  );

  filteredStudents.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    li.onclick = () => markPresent(name);
    studentList.appendChild(li);
  });
}

function renderPresentList() {
  presentList.innerHTML = "";

  presentStudents.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    presentList.appendChild(li);
  });
}

function markPresent(name) {
  if (!presentStudents.includes(name)) {
    presentStudents.push(name);
    status.textContent = name + " marked present";
    searchBox.value = "";
    renderStudentList();
    renderPresentList();
  }
}

function showSummary() {
  const date = sessionDate.value || "No date selected";

  let summaryText = "Attendance Date: " + date + "\n\n";
  summaryText += "Present Students:\n";

  if (presentStudents.length === 0) {
    summaryText += "No students marked present yet.";
  } else {
    presentStudents.forEach((name, index) => {
      summaryText += (index + 1) + ". " + name + "\n";
    });
  }

  summaryBox.textContent = summaryText;
}

searchBox.addEventListener("input", () => {
  renderStudentList(searchBox.value);
});

showSummaryBtn.addEventListener("click", showSummary);

renderStudentList();
renderPresentList();