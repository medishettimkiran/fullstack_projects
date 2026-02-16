document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        dob: document.getElementById("dob").value,
        dept: document.getElementById("dept").value,
        number: document.getElementById("number").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value
    };

    fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        document.getElementById("form").reset();
    })
    .catch(() => alert("Error"));
});
