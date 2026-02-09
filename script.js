let applications = JSON.parse(localStorage.getItem("applications")) || [];
let editId = null;

const form = document.getElementById("applicationForm");
const applicationList = document.getElementById("applicationList");

function saveToStorage() {
  localStorage.setItem("applications", JSON.stringify(applications));
}

function renderApplications() {
  applicationList.innerHTML = "";

  applications.forEach((app) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td>
                <button onclick="editApplication(${app.id})">Edit</button>
                <button onclick="deleteApplication(${app.id})">Delete</button>
            </td>
        `;

    applicationList.appendChild(row);
  });

  updateSummary();
}

function updateSummary() {
  document.getElementById("totalCount").innerText = applications.length;

  document.getElementById("interviewCount").innerText = applications.filter(
    (app) => app.stage === "Interview",
  ).length;

  document.getElementById("offerCount").innerText = applications.filter(
    (app) => app.stage === "Offer",
  ).length;

  document.getElementById("rejectionCount").innerText = applications.filter(
    (app) => app.result === "Rejected",
  ).length;
}

function deleteApplication(id) {
  applications = applications.filter((app) => app.id !== id);
  saveToStorage();
  renderApplications();
}

function editApplication(id) {
  const app = applications.find((app) => app.id === id);

  document.getElementById("company").value = app.company;
  document.getElementById("role").value = app.role;
  document.getElementById("stage").value = app.stage;
  document.getElementById("result").value = app.result;
  document.getElementById("date").value = app.date;

  editId = id;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const stage = document.getElementById("stage").value;
  const result = document.getElementById("result").value;
  const date = document.getElementById("date").value;

  if (editId) {
    applications = applications.map((app) =>
      app.id === editId
        ? { id: editId, company, role, stage, result, date }
        : app,
    );
    editId = null;
  } else {
    applications.push({
      id: Date.now(),
      company,
      role,
      stage,
      result,
      date,
    });
  }

  saveToStorage();
  renderApplications();
  form.reset();
});

renderApplications();
