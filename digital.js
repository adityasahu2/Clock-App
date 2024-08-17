function startDigitalClock() {
    const now = new Date()
    let s = now.getSeconds()
    let m = now.getMinutes()
    let h = now.getHours()
    if (s < 10) s = "0" + s
    if (m < 10) m = "0" + m
    if (h < 10) h = "0" + h
    digitalSecond.textContent = s
    digitalMinute.textContent = m
    digitalHour.textContent = h
    setTimeout(startDigitalClock, 1000)
}

startDigitalClock()