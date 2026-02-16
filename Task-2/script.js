const tableBody = document.querySelector("#studentTable tbody");
const deptFilter = document.getElementById("deptFilter");
const countSection = document.getElementById("countSection");

// Render student table
function renderTable(data) {
    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No data found</td></tr>`;
        return;
    }

    data.forEach(student => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.dept}</td>
                <td>${student.DOB}</td>
            </tr>
        `;
    });
}

// Load all students
function loadStudents() {
    fetch("/students")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                renderTable(data.data);
            } else {
                console.error("Failed to load students");
            }
        })
        .catch(err => console.error("Fetch error:", err));
}

// Sort by name
function sortByName() {
    fetch("/students/sort/name")
        .then(res => res.json())
        .then(data => renderTable(data.data))
        .catch(err => console.error(err));
}

// Sort by DOB
function sortByDate() {
    fetch("/students/sort/dob")
        .then(res => res.json())
        .then(data => renderTable(data.data))
        .catch(err => console.error(err));
}

// Filter by department
deptFilter.addEventListener("change", () => {
    const dept = deptFilter.value;

    if (dept === "all") {
        loadStudents();
        return;
    }

    fetch(`/students/filter/${dept}`)
        .then(res => res.json())
        .then(data => renderTable(data.data))
        .catch(err => console.error(err));
});

// Load student count per department
function loadCount() {
    fetch("/students/count")
        .then(res => res.json())
        .then(data => {
            let output = "<b>Student Count per Department</b><br>";
            data.data.forEach(item => {
                output += `${item.dept}: ${item.total}<br>`;
            });
            countSection.innerHTML = output;
        })
        .catch(err => console.error(err));
}

// Initial load
loadStudents();
loadCount();
