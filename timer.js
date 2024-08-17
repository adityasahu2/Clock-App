for (let i = 0; i < 60; i++) {
    let span = document.createElement("span")
    if (i < 10) span.textContent = "0" + i
    else span.textContent = i
    span.style.display = "block"
    setHr.appendChild(span)
    setMin.appendChild(span.cloneNode(true))
    setSec.appendChild(span.cloneNode(true))
    if (i == 59) {
        let first = document.createElement("span")
        first.className = "is-clone"
        first.textContent = "00"
        setHr.appendChild(first)
        setMin.appendChild(first.cloneNode(true))
        setSec.appendChild(first.cloneNode(true))
        let last = document.createElement("span")
        last.className = "is-clone"
        last.textContent = "59"
        setHr.appendChild(last)
        setMin.appendChild(last.cloneNode(true))
        setSec.appendChild(last.cloneNode(true))
    }
}

var disableScroll = false,
    scrollHeight = 0,
    scrollPos = 0,
    clonesHeight = 0

function getScrollPos(context) {
    return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(context, pos) {
    context.scrollTop = pos;
}

function getClonesHeight(clones) {
    clonesHeight = 0;
    for (i = 0; i < clones.length; i += 1) {
        clonesHeight = clonesHeight + clones[i].offsetHeight;
    }
    return clonesHeight;
}

function reCalc(context, clones) {
    scrollPos = getScrollPos(context);
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight(clones);
    if (scrollPos <= 0) {
        setScrollPos(context, 1); // Scroll 1 pixel to allow upwards scrolling
    }
}

function scrollUpdate(context, clones) {
    if (!disableScroll) {
        scrollPos = getScrollPos(context);
        if (clonesHeight + scrollPos >= scrollHeight) {
            // Scroll to the top when you’ve reached the bottom
            setScrollPos(context, 1); // Scroll down 1 pixel to allow upwards scrolling
            disableScroll = true;
        } else if (scrollPos <= 0) {
            // Scroll to the bottom when you reach the top
            setScrollPos(context, scrollHeight - clonesHeight);
            disableScroll = true;
        }
    }

    if (disableScroll) {
        // Disable scroll-jumping for a short time to avoid flickering
        window.setTimeout(function () {
            disableScroll = false;
        }, 40);
    }
}

function init(contextId) {
    var context = document.getElementById(contextId);
    var clones = context.querySelectorAll('.is-clone');

    reCalc(context, clones);
    context.addEventListener('scroll', function () {
        window.requestAnimationFrame(function () {
            scrollUpdate(context, clones);
        });
    }, false);

    window.addEventListener('resize', function () {
        window.requestAnimationFrame(function () {
            reCalc(context, clones);
        });
    }, false);
}

// Call init for 3 different contexts
init('set-hr');
init('set-min');
init('set-sec');


let hr, min, sec;

function sethr(num) {
    hr = num
}

function setmin(num) {
    min = num
}

function setsec(num) {
    sec = num
}
// Function to observe the spans in view
function observeInView(context, func) {
    const spans = context.querySelectorAll('span');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                func(entry.target.textContent)
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        root: context, // Use the container as the root for observation
        threshold: 0.5 // Adjust this threshold to detect when the span is mostly in view
    });

    spans.forEach(span => {
        observer.observe(span);
    });
}
observeInView(setHr, sethr);
observeInView(setMin, setmin);
observeInView(setSec, setsec);

let timer

function startTimer() {
    document.getElementById("time").style.display = "flex"
    document.getElementById("set-time").style.display = "none"
    timerHour.textContent = hr
    timerMinute.textContent = min
    timerSecond.textContent = sec
    timer = setInterval(() => {
        if (sec > 0) {
            sec--
            if (sec < 10) sec = "0" + sec
            timerSecond.textContent = sec
        }
        else if (sec == 0 && min > 0) {
            sec = 59
            timerSecond.textContent = sec
            min--
            if (min < 10) min = "0" + min
            timerMinute.textContent = min
        }
        else if (sec == 0 && min == 0 && hr > 0) {
            sec = 59
            timerSecond.textContent = sec
            min = 59
            timerMinute.textContent = min
            hr--
            if (hr < 10) hr = "0" + hr
            timerHour.textContent = hr
        }
        else {
            clearInterval(timer)
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer)
}

function resetTimer() {
    timerPlayBtn.checked = false
    document.getElementById("time").style.display = "none"
    document.getElementById("set-time").style.display = "flex"
    setHr.firstElementChild.scrollIntoView()
    setMin.firstElementChild.scrollIntoView()
    setSec.firstElementChild.scrollIntoView()
    clearInterval(timer)
}

timerPlayBtn.addEventListener('click', () => {
    if (timerPlayBtn.checked) {
        startTimer()
    }
    else {
        stopTimer()
    }
})

timerResetBtn.addEventListener('click', () => {
    resetTimer()
})