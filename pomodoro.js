let pause = false;
let resetButtonClicked = false;
let currentWork = 0;
let currentRest = 0;

function initialize() {
    let timeSetButton = document.querySelector("#time-set");
    let pauseButton = document.querySelector("#time-pause");
    let resumeButton = document.querySelector("#time-resume");
    let resetButton = document.querySelector("#time-reset");
    timeSetButton.addEventListener('click', () => {getIntervals()});
    pauseButton.addEventListener('click', () => {activatePause()});
    resumeButton.addEventListener('click', () => {resume()});
    resetButton.addEventListener('click', () => {activateReset()});
}

function getIntervals() {
    workIntervalInput = prompt("How many minutes long should the WORK interval be?");
    restIntervalInput = prompt("How many minutes long should the REST interval be?");
    if (workIntervalInput.indexOf(".") != -1 || restIntervalInput.indexOf(".") != -1) {
        alert("Please enter a number with no decimal points.");
    } else {
        workInt = parseInt(workIntervalInput);
        restInt = parseInt(restIntervalInput);
        calculatePomodoro(workInt, restInt);
    }
}

function calculatePomodoro(work, rest) {
    workIntervalSec = (work * 60);
    currentWork = workIntervalSec;
    restIntervalSec = (rest * 60);
    currentRest = restIntervalSec;
    runPomodoro(workIntervalSec, restIntervalSec);
}

function activatePause() {
    pause = true;
    let modeSelector = document.querySelector("#mode-identifier");
    modeSelector.textContent = "Paused";
}

function resume() {
    pause = false;
}

function activateReset() {
    resetButtonClicked = true;
}

function runPomodoro(work, rest) {
    let workInterval = setInterval(checkWorkInterval, 1000);
    let restInterval = setInterval(checkRestInterval, 1000);
    let workTime = work;
    let restTime = rest;
    let mode = "Work";
    let cycles = 0;
    let clock = document.querySelector("#clock");
    let modeSelector = document.querySelector("#mode-identifier");
    let cycleCounter = document.querySelector("#cycle-count");
    function checkWorkInterval() {
        if (mode == "Work") {
            if (workTime >= 0 && !pause && !resetButtonClicked) {
                let result = new Date(workTime * 1000).toISOString().substr(14, 5);
                clock.textContent = result;
                modeSelector.textContent = mode;
                cycleCounter.textContent = "Cycles Run: " + cycles;
                workTime--;
            } else if (workTime < 0 && !pause && !resetButtonClicked) {
                mode = "Rest";
                cycles++;
                workTime = work;
            } else if (resetButtonClicked) {
                clearInterval(workInterval);
                clearInterval(restInterval);
                runPomodoro(currentWork, currentRest);
                resetButtonClicked = false;
            }
        }
    }
    function checkRestInterval() {
        if (mode == "Rest") {
            if (restTime >= 0 && !pause && !resetButtonClicked) {
                let result = new Date(restTime * 1000).toISOString().substr(14, 5);
                clock.textContent = result;
                modeSelector.textContent = mode;
                cycleCounter.textContent = "Cycles Run: " + cycles;
                restTime--;
            } else if (workTime <0 && !pause && !resetButtonClicked) {
                mode = "Work";
                cycles++;
                restTime = rest;
            } else if (resetButtonClicked) {
                clearInterval(workInterval);
                clearInterval(restInterval);
                runPomodoro(currentWork, currentRest);
                resetButtonClicked = false;
            }
        }
    }
}

initialize();