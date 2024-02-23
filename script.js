document.getElementById("logbookButton").addEventListener("click", function () {
    window.location.href = "logbook.html";
});

document.getElementById("routineButton").addEventListener("click", function () {
    window.location.href = "routine.html";
});

document.getElementById("exerciseLibraryButton").addEventListener("click", function () {
    window.location.href = "exerciseLibrary.html";
});

let timerInterval;
let originalTime = 10; 
let timeLeft = originalTime;
let timerStarted = false;

function updateTimer() {
    const timerSpan = document.getElementById('timerSpan');
    if (timeLeft >= 0) { 
        timerSpan.textContent = formatTime(timeLeft);
        timeLeft--; 
    } else {
        clearInterval(timerInterval);
        timerStarted = false;
    }
}

function startTimer() {
    timerStarted = true;
    if (!timerInterval) { 
        document.getElementById('startButton').textContent = "RESET";
    }
    setTimeout(() => {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }, 1000); // Delay execution by 1 second
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = originalTime;
    updateTimer();
    document.getElementById('startButton').textContent = "START";
    timerStarted = false; 
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!timerStarted) {
        startTimer();
    } else {
        resetTimer();
    }
});

document.getElementById("addMinute").addEventListener("click", function() {
    originalTime += 60; // Add 60 seconds (1 minute)
    if (!timerStarted) {
        timeLeft = originalTime;
        updateTimer();
    }
});

document.getElementById("subtractMinute").addEventListener("click", function() {
    if (originalTime >= 60) { // Ensure time doesn't go negative
        originalTime -= 60; // Subtract 60 seconds (1 minute)
        if (!timerStarted) {
            timeLeft = originalTime;
            updateTimer();
        }
    }
});
