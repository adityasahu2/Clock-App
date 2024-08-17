function startAnalogClock() {
    const now = new Date()
    let s = now.getSeconds()
    let m = now.getMinutes()
    let h = now.getHours()
    let sdeg = s * 6
    let mdeg = m * 6 + s * 0.1
    let hdeg = h * 30 + m * 0.5
    secondHand.style.transform = `rotate(${sdeg}deg)`
    minuteHand.style.transform = `rotate(${mdeg}deg)`
    hourHand.style.transform = `rotate(${hdeg}deg)`
    setTimeout(startAnalogClock, 1000)
}

startAnalogClock()