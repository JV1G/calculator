// Calculator screen
const screenTop = document.querySelector('.screen-top');
const screenBottom = document.querySelector('.screen-bottom');

// Calculator buttons
const calcButtons = document.querySelector('.calc-btns');

// Add event listener
calcButtons.addEventListener('click', (event) => {
    if (event.target.matches('.btn-number')) {
        handleValue(event.target.dataset.value);
    } else if (event.target.matches('.btn-operation')) {
        handleOperation(event.target.dataset.operation);
    } else if (event.target.matches('.btn-utility')) {
        handleUtility(event.target.dataset.function);
    }
});

// Define variables
let a = null;
let b = null;
let opChar = null;
let result = null;
let currText = '';
let oldText = '';
let operationSet = false;
let resultExists = false;

// Handle numbers and '.'
function handleValue(val) {

    if(!operationSet && !resultExists) {
        currText += val;
        a = parseFloat(currText);
        screenBottom.textContent = a;
    } else if (operationSet) {
        oldText = currText;
        currText += val;
        b = parseFloat(currText);
        screenBottom.textContent = b;
    }

}

// Handle operations
function handleOperation(op) {
    operationSet = true;
    currText = '';

    if (operationSet && a !== null && opChar !== null && b !== null) {
        computeResult();
        screenBottom.textContent = result;
        screenTop.textContent = `${a} ${opChar} ${b} = ${result}`;  // Show the entire operation with the result
        reset();
        a = parseFloat(screenBottom.textContent);
        return;
    }

    if(a !== null) {
        switch(op) {
            case 'add':
                screenTop.textContent = a + ' + ';
                opChar = op;
                break;
            case 'subtract':
                screenTop.textContent = a + ' - ';
                opChar = op;
                break;
            case 'multiply':
                screenTop.textContent = a + ' * ';
                opChar = op;
                break;
            case 'divide':
                screenTop.textContent = a + ' / ';
                opChar = op;
                break;
            case 'equals':
                if (a !== null && b !== null) {
                    computeResult();
                    screenTop.textContent = `${a} ${opChar} ${b} = ${result}`;  // Show the entire operation with the result
                    screenBottom.textContent = result;
                    reset();
                    a = parseFloat(screenBottom.textContent);
                    return;
                }
                break;
            default:
                console.error("Invalid operation:", op);
        }
    }
}

// Calculate the result
function computeResult() {
    switch(opChar) {
        case 'add':
            result = a + b;
            opChar = '+';
            break;
        case 'subtract':
            result = a - b;
            opChar = '-';
            break;
        case 'multiply':
            result = a * b;
            opChar = '*';
            break;
        case 'divide':
            if(b === 0) { // Checking for division by zero
                console.error("Division by zero is not allowed.");
                result = "Error";  
                screenTop.textContent = "Error: Division by zero"; 
                errorHandler();
            } else {
                result = a / b;
                opChar = '/';
            }
            break;
        default:
            console.error("Invalid operation:", opChar);
            return;
    }
}

// Handle utility functions
function handleUtility(fun) {
    if(fun === 'clear') {
        clear();
    }
    if(fun === 'backspace') {
        backspace();
    }
}

// Clear utility function
function clear() {
    reset();
    screenTop.textContent = '';
    screenBottom.textContent = '0';
}

// Backspace (delete) utility function
function backspace() {
    if(screenBottom.textContent === '0') {
        return;
    }

    currText = currText.slice(0, -1);

    if(currText === '') currText = '0';

    if(!operationSet) {
        a = parseFloat(currText);
    } else {
        b = parseFloat(currText);
    }

    screenBottom.textContent = currText;
}

// Reset variables function
function reset() {
    a = null;
    b = null;
    opChar = null;
    currText = '';
    oldText = '';
    result = null;
    operationSet = false;
}