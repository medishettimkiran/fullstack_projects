// Get elements
const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const feedbackInput = document.getElementById("feedback");
const message = document.getElementById("message");

let doubleClick = false;

// Reusable validation functions
function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNotEmpty(text) {
    return text.trim() !== "";
}

// Validate inputs on keypress
[nameInput, emailInput, feedbackInput].forEach(input => {
    input.addEventListener("keypress", () => {
        if (input === nameInput) input.style.borderColor = isValidName(input.value) ? "#4CAF50" : "red";
        if (input === emailInput) input.style.borderColor = isValidEmail(input.value) ? "#4CAF50" : "red";
        if (input === feedbackInput) input.style.borderColor = isNotEmpty(input.value) ? "#4CAF50" : "red";
    });
});

// Detect double-click on button
document.getElementById("submitBtn").addEventListener("dblclick", () => {
    doubleClick = true;
});

// Handle form submit
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default page reload

    if (!doubleClick) {
        message.textContent = "Double-click the button to submit!";
        message.style.color = "orange";
        return;
    }

    // Validate all fields
    if (!isValidName(nameInput.value)) {
        message.textContent = "Please enter a valid name (letters only).";
        message.style.color = "red";
        return;
    }
    if (!isValidEmail(emailInput.value)) {
        message.textContent = "Please enter a valid email.";
        message.style.color = "red";
        return;
    }
    if (!isNotEmpty(feedbackInput.value)) {
        message.textContent = "Feedback cannot be empty.";
        message.style.color = "red";
        return;
    }

    // All valid
    message.textContent = "Thank you for your feedback! ";
    message.style.color = "green";

    form.reset();
    [nameInput, emailInput, feedbackInput].forEach(i => i.style.borderColor = "#ccc");

    doubleClick = false; // Reset double-click flag
});
