document.getElementById("logbookButton").addEventListener("click", function () {
    window.location.href = "logbook.html";
});

document.getElementById("routineButton").addEventListener("click", function () {
    window.location.href = "routine.html";
});

document.getElementById("exerciseLibraryButton").addEventListener("click", function () {
    window.location.href = "exerciseLibrary.html";
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

let timerInterval;
let timeLeft = 10; 

function updateTimer() {
    const circleButton = document.getElementById('startButton');
    circleButton.textContent = formatTime(timeLeft);
}

function startTimer() {
    
    updateTimer();
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
    startTimer();
});