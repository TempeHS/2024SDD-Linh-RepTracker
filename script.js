// Define global variables
let timerInterval; // Used to store the interval ID for the timer
let originalTime = 10; // Initial time value for the timer
let timeLeft = originalTime; // Current time left on the timer
let timerStarted = false; // Flag to track if the timer is running
let timerExpired = false; // Flag to track if the timer has expired

// Function to display a notification
function notifyMe() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // If notification permissions have been granted, create a notification
        const notification = new Notification("Your timer has ended");
    } else if (Notification.permission !== "denied") {
        // Request permission from the user to show notifications
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                // If the user grants permission, create a notification
                const notification = new Notification("Timer Expired");
            }
        });
    }
}

// Function to update the timer display
function updateTimer() {
    const timerSpan = document.getElementById('timerSpan');
    if (timeLeft >= 0) {
        // Update the timer display with the remaining time
        timerSpan.textContent = formatTime(timeLeft);
        timeLeft--;
    } else {
        // If time has run out, stop the timer and show a notification
        clearInterval(timerInterval);
        timerStarted = false;
        timerExpired = true;
        notifyMe(); // Send notification when the timer ends
    }
}

// Function to start the timer
function startTimer() {
    timerStarted = true;
    timerExpired = false;
    document.getElementById('startButton').textContent = "RESET";
    setTimeout(() => {
        // Start the timer interval and update the timer display every second
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = originalTime;
    updateTimer();
    timerStarted = false;
    timerExpired = false;
    document.getElementById('startButton').textContent = "START";
}

// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const timerSpan = document.getElementById('timerSpan');
    timerSpan.textContent = formatTime(originalTime);

    // Request notification permission if needed
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            // If permission is granted, create a notification
            if (permission === "granted") {
                const notification = new Notification("Notification permissions granted!");
            }
        });
    }
});

// Event listener for the start/reset button click
document.getElementById('startButton').addEventListener('click', () => {
    if (timerExpired) {
        resetTimer();
    } else {
        if (!timerStarted) {
            startTimer();
        } else {
            resetTimer();
        }
    }
});

// Event listeners for adjusting the timer duration
document.getElementById("addMinute").addEventListener("click", function () {
    originalTime += 60;
    if (!timerStarted) {
        timeLeft = originalTime;
        updateTimer();
    }
});

document.getElementById("subtractMinute").addEventListener("click", function () {
    if (originalTime >= 60) {
        originalTime -= 60;
        if (!timerStarted) {
            timeLeft = originalTime;
            updateTimer();
        }
    }
});

document.getElementById("addSecond").addEventListener("click", function () {
    originalTime += 1;
    if (!timerStarted) {
        timeLeft = originalTime;
        updateTimer();
    }
});

document.getElementById("subtractSecond").addEventListener("click", function () {
    if (originalTime > 0) {
        originalTime -= 1;
        if (!timerStarted) {
            timeLeft = originalTime;
            updateTimer();
        }
    }
});

// Event listeners for navigation buttons
document.getElementById("logbookButton").addEventListener("click", function () {
    window.location.href = "logbook.html";
});

document.getElementById("routineButton").addEventListener("click", function () {
    window.location.href = "routine.html";
});

document.getElementById("exerciseLibraryButton").addEventListener("click", function () {
    window.location.href = "exerciseLibrary.html";
});

document.getElementById("documentationButton").addEventListener("click", function () {
    window.location.href = "documentation.html";
});
