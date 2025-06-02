document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop();

  // Utilities
  const getStudents = () => JSON.parse(localStorage.getItem("students")) || [];
  const setStudents = (students) => localStorage.setItem("students", JSON.stringify(students));

  const getResults = () => JSON.parse(localStorage.getItem("results")) || [];
  const setResults = (results) => localStorage.setItem("results", JSON.stringify(results));

  const getAttendance = () => JSON.parse(localStorage.getItem("attendance")) || [];
  const setAttendance = (attendance) => localStorage.setItem("attendance", JSON.stringify(attendance));

  // ---------------------- Add Student Page ----------------------
  if (currentPage === "add_student.html") {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.elements["name"].value.trim();
      const roll = form.elements["roll"].value.trim();
      const className = form.elements["class"].value.trim();

      if (!name || !roll || !className) {
        alert("Please fill in all fields.");
        return;
      }

      let students = getStudents();

      if (students.some(student => student.roll === roll)) {
        alert("Roll number already exists.");
        return;
      }

      students.push({ name, roll, className });
      setStudents(students);
      alert("Student added successfully.");
      form.reset();
    });
  }

  // ---------------------- View Students Page ----------------------
if (currentPage === "view_students.html") {
  const tbody = document.querySelector("tbody");

  const renderStudents = () => {
    const students = getStudents();
    tbody.innerHTML = "";

    students.forEach((student, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="Name">${student.name}</td>
        <td data-label="Roll No">${student.roll}</td>
        <td data-label="Class">${student.className}</td>
        <td data-label="Actions">
          <button class="delete" data-index="${index}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const students = getStudents();
        students.splice(index, 1);
        setStudents(students);
        renderStudents();
      });
    });

    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const students = getStudents();
        const student = students[index];

        const newName = prompt("Edit Name:", student.name) || student.name;
        const newRoll = prompt("Edit Roll No:", student.roll) || student.roll;
        const newClass = prompt("Edit Class:", student.className) || student.className;

        // Prevent duplicate roll numbers
        const duplicate = students.some((s, i) => s.roll === newRoll && i !== index);
        if (duplicate) {
          alert("Roll number already exists for another student.");
          return;
        }

        students[index] = {
          name: newName.trim(),
          roll: newRoll.trim(),
          className: newClass.trim()
        };

        setStudents(students);
        renderStudents();
      });
    });
  };

  renderStudents();
}


  // ---------------------- Results Page ----------------------
  if (currentPage === "results.html") {
    const tbody = document.querySelector("tbody");

    const renderResults = () => {
      const results = getResults();
      tbody.innerHTML = "";

      results.forEach((result, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td data-label="Roll No">${result.roll}</td>
          <td data-label="Subject">${result.subject}</td>
          <td data-label="Marks">${result.marks}</td>
        `;
        tbody.appendChild(tr);
      });
    };

    renderResults();

    // Optional: You can add form inputs dynamically
    // For now, use browser prompt for simplicity
    document.body.insertAdjacentHTML("beforeend", `
      <button id="addResultBtn" style="margin: 20px;">Add Result</button>
    `);
    document.getElementById("addResultBtn").addEventListener("click", () => {
      const roll = prompt("Enter Roll No:");
      const subject = prompt("Enter Subject:");
      const marks = prompt("Enter Marks:");

      if (roll && subject && marks) {
        const results = getResults();
        results.push({ roll: roll.trim(), subject: subject.trim(), marks: marks.trim() });
        setResults(results);
        renderResults();
      }
    });
  }

  // ---------------------- Attendance Page ----------------------
  if (currentPage === "attendance.html") {
    const tbody = document.querySelector("tbody");

    const renderAttendance = () => {
      const attendance = getAttendance();
      tbody.innerHTML = "";

      attendance.forEach((record, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td data-label="Roll No">${record.roll}</td>
          <td data-label="Date">${record.date}</td>
          <td data-label="Status">${record.status}</td>
        `;
        tbody.appendChild(tr);
      });
    };

    renderAttendance();

    document.body.insertAdjacentHTML("beforeend", `
      <button id="addAttendanceBtn" style="margin: 20px;">Add Attendance</button>
    `);

    document.getElementById("addAttendanceBtn").addEventListener("click", () => {
      const roll = prompt("Enter Roll No:");
      const date = prompt("Enter Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
      const status = prompt("Enter Status (Present/Absent):");

      if (roll && date && status) {
        const attendance = getAttendance();
        attendance.push({ roll: roll.trim(), date: date.trim(), status: status.trim() });
        setAttendance(attendance);
        renderAttendance();
      }
    });
  }
});


