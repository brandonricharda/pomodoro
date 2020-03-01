let pause = false;

function initialize() {
    let timeSetButton = document.querySelector("#time-set");
    let pauseButton = document.querySelector("#time-pause");
    timeSetButton.addEventListener('click', () => {getIntervals()});
    pauseButton.addEventListener('click', () => {activatePause()});
}

function getIntervals() {
    workIntervalInput = prompt("How many minutes long should the WORK interval be?");
    restIntervalInput = prompt("How many minutes long should the REST interval be?");
    workInt = parseInt(workIntervalInput);
    restInt = parseInt(restIntervalInput);
    calculatePomodoro(workInt, restInt);
}

function calculatePomodoro(work, rest) {
    workIntervalSec = (work * 60);
    restIntervalSec = (rest * 60);
    runPomodoro(workIntervalSec, restIntervalSec);
}

function activatePause() {
    pause = true;
}

function runPomodoro(work, rest) {
    setInterval(checkWorkInterval, 1000);
    setInterval(checkRestInterval, 1000);
    let workTime = work;
    let restTime = rest;
    let mode = "Work";
    let cycles = 0;
    let clock = document.querySelector("#clock");
    let modeSelector = document.querySelector("#mode-identifier");
    let cycleCounter = document.querySelector("#cycle-count");
    function checkWorkInterval() {
        if (mode == "Work") {
            if (workTime >= 0 && !pause) {
                let result = new Date(workTime * 1000).toISOString().substr(14, 5);
                clock.textContent = result;
                modeSelector.textContent = mode;
                cycleCounter.textContent = "Cycles Run: " + cycles;
                workTime--;
            } else if (workTime < 0 && !pause) {
                mode = "Rest";
                cycles++
                workTime = work;
            }
        }
    }
    function checkRestInterval() {
        if (mode == "Rest") {
            if (restTime >= 0) {
                let result = new Date(restTime * 1000).toISOString().substr(14, 5);
                clock.textContent = result;
                modeSelector.textContent = mode;
                cycleCounter.textContent = "Cycles Run: " + cycles;
                restTime--;
            } else {
                mode = "Work";
                cycles++
                restTime = rest;
            }
        }
    }
}

initialize();