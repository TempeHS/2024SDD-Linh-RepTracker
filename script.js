let timerInterval;
let originalTime = 10;
let timeLeft = originalTime;
let timerStarted = false;
let timerExpired = false;
let audio; // Declare audio globally

const soundPath = './sounds/alarm.mp3';

function updateTimer() {
    const timerSpan = document.getElementById('timerSpan');
    if (timeLeft >= 0) {
        timerSpan.textContent = formatTime(timeLeft);
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        timerStarted = false;
        timerExpired = true;
        // Play a sound when the timer ends
        audio = new Audio(soundPath); // Initialize audio globally
        audio.play();
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
    
    // Stop and reset the alarm sound if it's playing
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
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
