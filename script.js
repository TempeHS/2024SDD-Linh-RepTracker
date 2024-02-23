let timerInterval;
let originalTime = 10;
let timeLeft = originalTime;
let timerStarted = false;
let timerExpired = false;

function updateTimer() {
    const timerSpan = document.getElementById('timerSpan');
    if (timeLeft >= 0) {
        timerSpan.textContent = formatTime(timeLeft);
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        timerStarted = false;
        timerExpired = true;
    }
}

function startTimer() {
    timerStarted = true;
    timerExpired = false; // Reset the timer expired flag
    document.getElementById('startButton').textContent = "RESET";
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = originalTime;
    updateTimer();
    timerStarted = false;
    timerExpired = false; // Reset the timer expired flag
    document.getElementById('startButton').textContent = "START";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById('startButton').addEventListener('click', () => {
    if (timerExpired) {
        resetTimer(); // If timer expired, reset it
    } else {
        if (!timerStarted) {
            startTimer();
        } else {
            resetTimer();
        }
    }
});

document.getElementById("addMinute").addEventListener("click", function () {
    originalTime += 60; // Add 60 seconds (1 minute)
    if (!timerStarted) {
        timeLeft = originalTime;
        updateTimer();
    }
});

document.getElementById("subtractMinute").addEventListener("click", function () {
    if (originalTime >= 60) { // Ensure time doesn't go negative
        originalTime -= 60; // Subtract 60 seconds (1 minute)
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
