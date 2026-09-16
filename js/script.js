// ================================
// Expense & Budget Visualizer
// ================================

// Get HTML elements
const transactionForm = document.getElementById("transactionForm");
const itemNameInput = document.getElementById("itemName");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const transactionList = document.getElementById("transactionList");
const totalBalance = document.getElementById("totalBalance");
const sortOption = document.getElementById("sortOption");

// Load transactions from Local Storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Chart variable
let expenseChart;

// Theme
const themeToggle = document.getElementById("themeToggle");

// Spending Limit
const spendingLimitInput = document.getElementById("spendingLimit");
const setLimitBtn = document.getElementById("setLimitBtn");
const limitStatus = document.getElementById("limitStatus");

let spendingLimit = Number(
    localStorage.getItem("spendingLimit")
) || 0;

// ================================
// Format Currency
// ================================

function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(amount);
}


// ================================
// Save Transactions
// ================================

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


// ================================
// Calculate Total
// ================================

function updateTotalBalance() {
    const total = transactions.reduce((sum, transaction) => {
        return sum + transaction.amount;
    }, 0);

    totalBalance.textContent = formatCurrency(total);
}


// ================================
// Display Transactions
// ================================

function displayTransactions() {
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = `
            <p class="empty-message">
                No transactions yet.
            </p>
        `;
        return;
    }

    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("div");

        transactionItem.className = "transaction-item";

        transactionItem.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-name">
                    ${transaction.name}
                </div>

                <span class="transaction-category">
                    ${transaction.category}
                </span>
            </div>

            <div class="transaction-right">
                <span class="transaction-amount">
                    ${formatCurrency(transaction.amount)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                    title="Delete transaction"
                >
                    ×
                </button>
            </div>
        `;

        transactionList.appendChild(transactionItem);
    });
}


// ================================
// Add Transaction
// ================================

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const itemName = itemNameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    // Validation
    if (!itemName || !amount || !category) {
        alert("Please fill in all fields.");
        return;
    }

    if (amount <= 0) {
        alert("Amount must be greater than 0.");
        return;
    }

    // Create new transaction
    const newTransaction = {
        id: Date.now(),
        name: itemName,
        amount: amount,
        category: category
    };

    // Add transaction
    transactions.push(newTransaction);

    // Save to Local Storage
    saveTransactions();

    // Update display
    updateApp();

    // Reset form
    transactionForm.reset();
});


// ================================
// Delete Transaction
// ================================

function deleteTransaction(id) {
    transactions = transactions.filter(
        (transaction) => transaction.id !== id
    );

    saveTransactions();

    updateApp();
}


// ================================
// Sort Transactions
// ================================

function sortTransactions() {
    const sortValue = sortOption.value;

    if (sortValue === "newest") {
        transactions.sort((a, b) => b.id - a.id);
    }

    if (sortValue === "amount-high") {
        transactions.sort((a, b) => b.amount - a.amount);
    }

    if (sortValue === "amount-low") {
        transactions.sort((a, b) => a.amount - b.amount);
    }

    if (sortValue === "category") {
        transactions.sort((a, b) =>
            a.category.localeCompare(b.category)
        );
    }

    displayTransactions();
}

sortOption.addEventListener("change", sortTransactions);


// ================================
// Update Chart
// ================================

function updateChart() {
    const categoryTotals = {
        Food: 0,
        Transport: 0,
        Fun: 0
    };

    transactions.forEach((transaction) => {
        if (categoryTotals[transaction.category] !== undefined) {
            categoryTotals[transaction.category] += transaction.amount;
        }
    });

    const chartData = [
        categoryTotals.Food,
        categoryTotals.Transport,
        categoryTotals.Fun
    ];

    const ctx = document.getElementById("expenseChart");

    // Destroy previous chart
    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: "pie",

        data: {
            labels: [
                "Food",
                "Transport",
                "Fun"
            ],

            datasets: [
                {
                    data: chartData
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}


// ================================
// Update Entire App
// ================================

function updateApp() {
    updateTotalBalance();
    displayTransactions();
    updateChart();
    updateLimitStatus();
}


// ================================
// Initial App Load
// ================================

updateApp();

// ================================
// Spending Limit
// ================================

function updateLimitStatus() {
    if (spendingLimit === 0) {
        limitStatus.textContent = "Not set";
        return;
    }

    limitStatus.textContent = formatCurrency(spendingLimit);

    const total = transactions.reduce((sum, transaction) => {
        return sum + transaction.amount;
    }, 0);

    const balanceCard = document.querySelector(".balance-card");

    if (total > spendingLimit) {
        balanceCard.classList.add("over-limit");
    } else {
        balanceCard.classList.remove("over-limit");
    }
}


setLimitBtn.addEventListener("click", function () {
    const limit = Number(spendingLimitInput.value);

    if (!limit || limit <= 0) {
        alert("Please enter a valid spending limit.");
        return;
    }

    spendingLimit = limit;

    localStorage.setItem(
        "spendingLimit",
        spendingLimit
    );

    spendingLimitInput.value = "";

    updateLimitStatus();
});


// ================================
// Dark / Light Mode
// ================================

let darkMode =
    localStorage.getItem("darkMode") === "true";

function updateTheme() {
    if (darkMode) {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
}

themeToggle.addEventListener("click", function () {
    darkMode = !darkMode;

    localStorage.setItem(
        "darkMode",
        darkMode
    );

    updateTheme();
});


// Initial settings
updateLimitStatus();
updateTheme();