document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableBody = document.querySelector("#studentTable tbody");
  const message = document.getElementById("message");

  // Handle adding a student
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const studentClass = document.getElementById("class").value;

      const student = { name, age, class: studentClass };
      let students = JSON.parse(localStorage.getItem("students")) || [];
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));

      message.textContent = "Student added successfully!";
      form.reset();
    });
  }

  // Handle viewing students
  if (tableBody) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.class}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});
// Function to load and display students
function loadStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  const countSpan = document.getElementById("studentCount");

  if (tableBody) {
    tableBody.innerHTML = ""; // Clear table
    const students = JSON.parse(localStorage.getItem("students")) || [];
    countSpan.textContent = students.length;

    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.class}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// Auto-load students when the view page is loaded
document.addEventListener("DOMContentLoaded", loadStudents);
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const message = document.getElementById("message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const age = document.getElementById("age").value.trim();
      const studentClass = document.getElementById("class").value.trim();

      if (!name || !age || !studentClass) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
      }

      const student = { name, age, class: studentClass };
      let students = JSON.parse(localStorage.getItem("students")) || [];
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));

      message.textContent = "Student added successfully!";
      message.style.color = "green";
      form.reset();
    });
  }
});
function loadStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  const countSpan = document.getElementById("studentCount");

  if (!tableBody || !countSpan) return;

  tableBody.innerHTML = "";
  let students = JSON.parse(localStorage.getItem("students")) || [];

  countSpan.textContent = students.length;

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    // If no date, add it now
    if (!student.dateAdded) {
      student.dateAdded = new Date().toLocaleDateString();
      localStorage.setItem("students", JSON.stringify(students)); // Save update
    }

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.class}</td>
      <td>${student.dateAdded}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Auto-load students on view.html
document.addEventListener("DOMContentLoaded", loadStudents);
function loadStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  const countSpan = document.getElementById("studentCount");

  if (!tableBody || !countSpan) return;

  tableBody.innerHTML = "";
  let students = JSON.parse(localStorage.getItem("students")) || [];

  countSpan.textContent = students.length;

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    // Ensure dateAdded exists
    if (!student.dateAdded) {
      student.dateAdded = new Date().toLocaleDateString();
      localStorage.setItem("students", JSON.stringify(students));
    }

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.class}</td>
      <td>${student.dateAdded}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Attach event listeners to delete buttons
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = this.getAttribute("data-index");
      deleteStudent(parseInt(idx));
    });
  });
}

function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  if (index >= 0 && index < students.length) {
    students.splice(index, 1); // Remove student at index
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents(); // Refresh the list
  }
}

// Auto load on page load
document.addEventListener("DOMContentLoaded", loadStudents);


