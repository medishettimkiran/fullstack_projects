function loadOrders() {
  fetch("/orders")
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}

function highestOrder() {
  fetch("/highest-order")
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").textContent =
        "Highest Order Value: ₹" + data.highestOrder;
    })
    .catch(err => console.error(err));
}

function activeCustomer() {
  fetch("/active-customer")
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").textContent =
        `Most Active Customer: ${data.name} (${data.totalOrders} orders)`;
    })
    .catch(err => console.error(err));
}
