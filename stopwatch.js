let hr = 0, min = 0, sec = 0

function startStopwatch() {
    stopwatch = setInterval(() => {
        if (sec >= 0) {
            sec++
            if (sec < 10) sec = "0" + sec
            watchSecond.textContent = sec
            if (sec == 60) {
                sec = "00"
                min++
                if (min < 10) min = "0" + min
                watchMinute.textContent = min
                if (min == 60) {
                    min = "00"
                    hr++
                    if (hr < 10) hr = "0" + hr
                    watchHour.textContent = hr
                }
            }
        }
    }, 1000)
}

function stopStopwatch() {
    clearInterval(stopwatch)
}

function resetStopwatch() {
    stopwatchPlayBtn.checked = false
    clearInterval(stopwatch)
    hr = "00"
    min = "00"
    sec = "00"
    watchHour.textContent = hr
    watchMinute.textContent = min
    watchSecond.textContent = sec
}

analogBtn.addEventListener('click', () => {
    open(analogClock)
    startAnalogClock()
})

digitalBtn.addEventListener('click', () => {
    open(digitalClock)
    startDigitalClock()
})

stopwatchBtn.addEventListener('click', () => {
    open(stopwatchClock)
    stopwatchPlayBtn.addEventListener('click', () => {
        if (stopwatchPlayBtn.checked) {
            startStopwatch()
        }
        else {
            stopStopwatch()
        }
    })

    stopwatchResetBtn.addEventListener('click', () => {
        resetStopwatch()
    })
})