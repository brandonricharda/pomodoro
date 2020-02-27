function getIntervals() {
    workIntervalInput = prompt("How many minutes long should the work interval be?");
    restIntervalInput = prompt("How many minutes long should the rest interval be?");
    workInt = parseInt(workIntervalInput);
    restInt = parseInt(restIntervalInput);
    calculatePomodoro(workInt, restInt);
}

function calculatePomodoro(work, rest) {
    workIntervalSec = (work * 60);
    restIntervalSec = (rest * 60);
    runPomodoro(workIntervalSec, restIntervalSec);
}

function runPomodoro(work, rest) {
    setInterval(checkWorkInterval, 1000);
    setInterval(checkRestInterval, 1000);
    let workTime = work;
    let restTime = rest;
    let mode = "work";
    function checkWorkInterval() {
        if (mode == "work") {
            if (workTime >= 0) {
                console.log(workTime);
                workTime--;
            } else {
                mode = "rest";
                workTime = work;
            }
        }
    }
    function checkRestInterval() {
        if (mode == "rest") {
            if (restTime >= 0) {
                console.log(restTime);
                restTime--;
            } else {
                mode = "work";
                restTime = rest;
            }
        }
    }
}

getIntervals() 