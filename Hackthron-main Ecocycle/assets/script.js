// Simulated user data and rewards
const userData = {
    phone: "1234567890",
    pin: "1234",
    balance: 0,
    badge: "Newbie",
    activities: [] // Store user activities
};
const trashRewards = { polythene: 10, can: 20, bottle: 15, iron: 30 };
const conversionRate = 0.5; // 1 point = 0.5 Naira

// Restore User Data from Local Storage on Login
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("phone").value;
    const pin = document.getElementById("pin").value;

    if (phone === userData.phone && pin === userData.pin) {
        // Restore data from localStorage if available
        const savedData = JSON.parse(localStorage.getItem("userData"));
        if (savedData) {
            Object.assign(userData, savedData);
        }
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        updateDashboard();
        displayActivities();
    } else {
        alert("Invalid login credentials");
    }
});

// Update Dashboard
function updateDashboard() {
    const nairaAmount = (userData.balance * conversionRate).toFixed(2);
    document.getElementById("balance").innerText = `${userData.balance} Points (${nairaAmount} Naira)`;
    document.getElementById("badge").innerText = userData.badge;
}

// Display User Activities
function displayActivities() {
    const activitiesList = document.getElementById("activities");
    activitiesList.innerHTML = userData.activities.map(activity => `<li>${activity}</li>`).join("");
}

// Handle Trash Disposal
document.getElementById("trash-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("type").value;
    const weight = parseFloat(document.getElementById("weight").value);

    if (weight > 0) {
        const reward = weight * trashRewards[type];
        userData.balance += reward;

        if (userData.balance > 100) userData.badge = "Recycler Pro";
        if (userData.balance > 500) userData.badge = "Eco Warrior";

        const activity = `Disposed ${weight}kg of ${type} and earned ${reward} points.`;
        userData.activities.push(activity);

        alert(`You earned ${reward} points!`);
        saveUserData();
        updateDashboard();
        displayActivities();

        // Refresh and clear inputs
        document.getElementById("trash-form").reset();
    } else {
        alert("Please enter a valid weight.");
    }
});

// Handle Withdrawal
document.getElementById("withdraw-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const account = document.getElementById("account").value || userData.phone;

    if (amount > 0 && amount <= userData.balance * conversionRate) {
        const equivalentPoints = amount / conversionRate;
        userData.balance -= equivalentPoints;

        const activity = `Withdrew ${amount} Naira to account ${account}.`;
        userData.activities.push(activity);

        alert(`Payment of ${amount} Naira sent to ${account}`);
        saveUserData();
        updateDashboard();
        displayActivities();

        // Refresh and clear inputs
        document.getElementById("withdraw-form").reset();
    } else {
        alert("Invalid withdrawal amount.");
    }
});

// Save User Data to Local Storage
function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Logout and Clear Session
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("userData");
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});























// // Simulated user data and rewards
// const userData = { phone: "1234567890", pin: "1234", balance: 0, badge: "Newbie" };
// const trashRewards = { polythene: 10, can: 20, bottle: 15, iron: 30 };
// const conversionRate = 0.5; // 1 point = 0.5 Naira

// // Handle Login
// document.getElementById("login-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const phone = document.getElementById("phone").value;
//     const pin = document.getElementById("pin").value;

//     if (phone === userData.phone && pin === userData.pin) {
//         document.getElementById("login-section").style.display = "none";
//         document.getElementById("dashboard").style.display = "block";
//         updateDashboard();
//     } else {
//         alert("Invalid login credentials");
//     }
// });

// // Update Dashboard
// function updateDashboard() {
//     const nairaAmount = (userData.balance * conversionRate).toFixed(2);
//     document.getElementById("balance").innerText = `${userData.balance} Points (${nairaAmount} Naira)`;
//     document.getElementById("badge").innerText = userData.badge;
// }

// // Handle Trash Disposal
// document.getElementById("trash-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const type = document.getElementById("type").value;
//     const weight = parseFloat(document.getElementById("weight").value);

//     if (weight > 0) {
//         const reward = weight * trashRewards[type];
//         userData.balance += reward;

//         if (userData.balance > 100) userData.badge = "Recycler Pro";
//         if (userData.balance > 500) userData.badge = "Eco Warrior";

//         alert(`You earned ${reward} points!`);
//         updateDashboard();
//     } else {
//         alert("Please enter a valid weight.");
//     }
// });

// // Handle Withdrawal
// document.getElementById("withdraw-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const amount = parseFloat(document.getElementById("amount").value);
//     const account = document.getElementById("account").value || userData.phone;

//     if (amount > 0 && amount <= userData.balance * conversionRate) {
//         const equivalentPoints = amount / conversionRate;
//         userData.balance -= equivalentPoints;
//         alert(`Payment of ${amount} Naira sent to ${account}`);
//         updateDashboard();
//     } else {
//         alert("Invalid withdrawal amount.");
//     }
// });
