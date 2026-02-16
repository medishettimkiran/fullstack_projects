const userSelect = document.getElementById("userSelect");
const merchantSelect = document.getElementById("merchantSelect");
const userBalances = document.getElementById("userBalances");
const merchantBalances = document.getElementById("merchantBalances");
const payBtn = document.getElementById("payBtn");
const messageDiv = document.getElementById("message");


async function loadData() {
    const users = await fetch("/users").then(res => res.json());
    const merchants = await fetch("/merchants").then(res => res.json());

    userSelect.innerHTML = "";
    users.forEach(u => userSelect.innerHTML += `<option value="${u.id}">${u.name} (Balance: ${u.balance})</option>`);

    merchantSelect.innerHTML = "";
    merchants.forEach(m => merchantSelect.innerHTML += `<option value="${m.id}">${m.name} (Balance: ${m.balance})</option>`);

    userBalances.innerHTML = users.map(u => `<li>${u.name}: ${u.balance}</li>`).join("");
    merchantBalances.innerHTML = merchants.map(m => `<li>${m.name}: ${m.balance}</li>`).join("");
}

// Make payment
payBtn.addEventListener("click", async () => {
    const userId = userSelect.value;
    const merchantId = merchantSelect.value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        messageDiv.textContent = "Enter a valid amount!";
        messageDiv.style.color = "red";
        return;
    }

    const res = await fetch("/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, merchantId, amount })
    });

    const data = await res.json();
    messageDiv.textContent = data.message;
    messageDiv.style.color = res.ok ? "green" : "red";

    loadData(); 
});

loadData();
