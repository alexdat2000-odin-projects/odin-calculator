let display;
let now = 0;
let input = "0";
let op = null;

function updateDisplay() {
    if (input.length > 9) {
        input = "Error";
    }
    display.textContent = input;
}

function clearDisplay() {
    now = 0;
    input = "0";
    op = null;
}

function backspace() {
    if (input.length >= 2) {
        input = input.substring(0, input.length - 1);
    } else {
        input = "0";
    }
}

function neg() {
    input = (Number(input) * -1).toString();
}


function press(number) {
    const BUFFER_VALUES = ["0", "+", "-", "*", "/"];
    console.log(number);
    if (BUFFER_VALUES.includes(input)) {
        input = number.toString();
    } else {
        input += number.toString();
    }
}

function operation(c) {
    calc();
    now = Number(input);
    op = c;
    input = c;
}

function dot() {
    if (!input.includes(".")) {
        input += ".";
    }
}

function calc() {
    if (op === "+") {
        now += Number(input);
    } else if (op === "-") {
        now -= Number(input);
    } else if (op === "*") {
        now *= Number(input);
    } else if (op === "/") {
        now /= Number(input);
    } else {
        return;
    }

    if (isNaN(now) || now === Infinity || now === -Infinity) {
        input = "Error";
        return;
    }
    input = Math.round(now * 1000) / 1000;
    op = null;
}

function keyboard(event) {
    if (input === "Error") {
        clearDisplay();
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.key)) {
        press(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        operation(event.key);
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "=" || event.key === "Enter") {
        calc();
    } else if (event.key === "C" || event.key === "c") {
        clearDisplay();
    } else if (event.key === "_") {
        neg();
    } else if (event.key === ".") {
        dot();
    }
    updateDisplay();
}

function init() {
    display = document.querySelector("#display");

    const bodyElement = document.querySelector("#body");
    bodyElement.addEventListener("click", updateDisplay);
    bodyElement.addEventListener("click", () => {
        if (input === "Error") {
            clearDisplay();
        }
    }, true);

    document.addEventListener('keydown', keyboard);
}

document.addEventListener("DOMContentLoaded", init);
