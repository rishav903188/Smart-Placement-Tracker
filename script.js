let applications = JSON.parse(localStorage.getItem("apps")) || [];

const form = document.getElementById("appForm");
const appList = document.getElementById("appList");

function saveToStorage() {
  localStorage.setItem("apps", JSON.stringify(applications));
}

function renderList() {
  appList.innerHTML = "";

  applications.forEach((app, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td>${app.stage}</td>
      <td>${app.result}</td>
      <td>${app.date}</td>
      <td><button onclick="deleteApp(${index})">Delete</button></td>
    `;

    appList.appendChild(row);
  });

  updateSummary();
}

function deleteApp(index) {
  applications.splice(index, 1);
  saveToStorage();
  renderList();
}

function updateSummary() {
  document.getElementById("total").innerText = applications.length;
  document.getElementById("offers").innerText = applications.filter(
    (app) => app.stage === "Offer",
  ).length;
  document.getElementById("rejections").innerText = applications.filter(
    (app) => app.result === "Rejected",
  ).length;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newApp = {
    company: company.value,
    role: role.value,
    stage: stage.value,
    result: result.value,
    date: date.value,
  };

  applications.push(newApp);
  saveToStorage();
  renderList();
  form.reset();
});

renderList();
