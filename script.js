let timerInterval;
let originalTime = 10;
let timeLeft = originalTime;
let timerStarted = false;
let timerExpired = false;

function notifyMe() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("Your timer has ended");
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Timer Expired");
                // …
            }
        });
    }
}

function updateTimer() {
    const timerSpan = document.getElementById('timerSpan');
    if (timeLeft >= 0) {
        timerSpan.textContent = formatTime(timeLeft);
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        timerStarted = false;
        timerExpired = true;

        // Send notification when the timer ends
        notifyMe();
    }
}

function startTimer() {
    timerStarted = true;
    timerExpired = false;
    document.getElementById('startButton').textContent = "RESET";
    setTimeout(() => {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = originalTime;
    updateTimer();
    timerStarted = false;
    timerExpired = false;
    document.getElementById('startButton').textContent = "START";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const timerSpan = document.getElementById('timerSpan');
    timerSpan.textContent = formatTime(originalTime);

    // Request notification permission (if needed)
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Notification permissions granted!");
            }
        });
    }
});

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

document.getElementById("logbookButton").addEventListener("click", function () {
    window.location.href = "logbook.html";
});

document.getElementById("routineButton").addEventListener("click", function () {
    window.location.href = "routine.html";
});

document.getElementById("exerciseLibraryButton").addEventListener("click", function () {
    window.location.href = "exerciseLibrary.html";
});
