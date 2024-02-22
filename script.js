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
let timeLeft = 10; 
let timerStarted = false;

function updateTimer() {
    const circleButton = document.getElementById('startButton');
    circleButton.textContent = formatTime(timeLeft);
}

function startTimer() {
    // Update button text immediately before starting the timer
    updateTimer();
    timerStarted = true; // Indicate that the timer has started
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!timerStarted) { 
        startTimer();
        
        document.getElementById('startButton').removeEventListener('click', startTimer);
    }
});
