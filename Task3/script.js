alert("script.js connected");
console.log("✅ script.js loaded");

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.innerText = "";

  if (username === "" || password === "") {
    error.innerText = "Please fill all fields";
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.success) {
      alert("Login Successful ");
    } else {
      error.innerText = data.message;
    }
  })
  .catch(err => {
    console.error(err);
    error.innerText = "Server Error";
  });
}
