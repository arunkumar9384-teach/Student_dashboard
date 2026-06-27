// ==========================
// Student Management Dashboard
// ==========================

// Get students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Load students only on Dashboard page
if (document.getElementById("studentTable")) {
    displayStudents();
}

// ==========================
// Save Student
// ==========================
function saveStudent() {

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (
        name === "" ||
        age === "" ||
        gender === "" ||
        course === "" ||
        email === "" ||
        phone === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    const student = {
        id: Date.now(),
        name,
        age,
        gender,
        course,
        email,
        phone
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added Successfully!");

    // Redirect to Dashboard
    window.location.href = "index.html";
}

// ==========================
// Display Students
// ==========================
function displayStudents() {

    const table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    students.forEach((student, index) => {

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

    updateCards();
}

// ==========================
// Delete Student
// ==========================
function deleteStudent(id) {

    if (confirm("Delete this student?")) {

        students = students.filter(student => student.id !== id);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

    }

}

// ==========================
// Edit Student
// ==========================
function editStudent(id) {

    const student = students.find(student => student.id === id);

    if (!student) return;

    localStorage.setItem("editStudent", JSON.stringify(student));

    window.location.href = "add-student.html";

}

// ==========================
// Load Student for Editing
// ==========================
window.onload = function () {

    const editData = JSON.parse(localStorage.getItem("editStudent"));

    if (
        editData &&
        document.getElementById("name")
    ) {

        document.getElementById("name").value = editData.name;
        document.getElementById("age").value = editData.age;
        document.getElementById("gender").value = editData.gender;
        document.getElementById("course").value = editData.course;
        document.getElementById("email").value = editData.email;
        document.getElementById("phone").value = editData.phone;

        document.querySelector("button").innerHTML =
            "<i class='fa-solid fa-pen'></i> Update Student";

        document.querySelector("button").onclick = function () {
            updateStudent(editData.id);
        };

    }

};

// ==========================
// Update Student
// ==========================
function updateStudent(id) {

    students = students.map(student => {

        if (student.id === id) {

            return {

                id,

                name: document.getElementById("name").value,

                age: document.getElementById("age").value,

                gender: document.getElementById("gender").value,

                course: document.getElementById("course").value,

                email: document.getElementById("email").value,

                phone: document.getElementById("phone").value

            };

        }

        return student;

    });

    localStorage.setItem("students", JSON.stringify(students));

    localStorage.removeItem("editStudent");

    alert("Student Updated Successfully!");

    window.location.href = "index.html";

}

// ==========================
// Search Student
// ==========================
function searchStudent() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

}

// ==========================
// Dashboard Cards
// ==========================
function updateCards() {

    document.getElementById("totalStudents").innerText = students.length;

    let male = 0;
    let female = 0;

    students.forEach(student => {

        if (student.gender === "Male")
            male++;

        if (student.gender === "Female")
            female++;

    });

    document.getElementById("maleCount").innerText = male;
    document.getElementById("femaleCount").innerText = female;

}