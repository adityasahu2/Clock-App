let stopwatchInterval;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;

// Function to update the stopwatch display
function updateStopwatchDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    watchHour.textContent = hours;
    watchMinute.textContent = minutes;
    watchSecond.textContent = seconds;
}

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime; // Resume from where it left off
    stopwatchInterval = requestAnimationFrame(updateStopwatch);
    isRunning = true;
}

// Function to stop the stopwatch
function stopStopwatch() {
    cancelAnimationFrame(stopwatchInterval);
    isRunning = false;
}

// Stopwatch update function using requestAnimationFrame
function updateStopwatch() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        updateStopwatchDisplay();
        stopwatchInterval = requestAnimationFrame(updateStopwatch);
    }
}

// Event listener for Play/Pause button
stopwatchPlayBtn.addEventListener("change", function () {
    if (this.checked) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

// Event listener for Reset button
stopwatchResetBtn.addEventListener("click", function () {
    stopStopwatch();
    elapsedTime = 0;
    updateStopwatchDisplay();
    stopwatchPlayBtn.checked = false;
});

// Initialize stopwatch display
updateStopwatchDisplay();