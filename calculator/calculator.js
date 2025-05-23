// Create a basic calculator that can perform addition, subtraction, multiplication, and division.
// Add history functionality to track all operations.

const history = [];

function add(a, b) {
    const result = a + b;
    history.push({ a, b, operation: 'add', result });
    return result;
}
function subtract(a, b) {
    const result = a - b;
    history.push({ a, b, operation: 'subtract', result });
    return result;
}
function multiply(a, b) {
    const result = a * b;
    history.push({ a, b, operation: 'multiply', result });
    return result;
}
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    const result = a / b;
    history.push({ a, b, operation: 'divide', result });
    return result;
}

// Add modulus function
function modulus(a, b) {
    if (b === 0) {
        throw new Error("Cannot perform modulus by zero");
    }
    const result = a % b;
    history.push({ a, b, operation: 'modulus', result });
    return result;
}

function calculator(a, b, operation) {
    switch (operation) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        case 'modulus':
            return modulus(a, b);
        default:
            throw new Error("Invalid operation");
    }
}

/**
 * Perform multiple calculations in sequence.
 * @param {Array} operations - Array of objects: { a, b, operation }
 * @returns {Array} Array of results for each calculation
 */
function calculateMultiple(operations) {
    return operations.map(op => {
        return {
            ...op,
            result: calculator(op.a, op.b, op.operation)
        };
    });
}

// Function to get the history of operations
function getHistory() {
    return history;
}

// Function to clear the history
function clearHistory() {
    history.length = 0;
}

// Calculator UI logic moved from calculator.html

let current = '0';
let a = null;
let b = null;
let operation = null;
let waitingForOperand = false;

function updateDisplay() {
    document.getElementById('display').value = current;
    updateInputField();
}

// Show the current calculation in the input field (e.g., "753 + " or "753 + 951")
function updateInputField() {
    const inputField = document.getElementById('input-history');
    if (a !== null && operation !== null && !waitingForOperand) {
        // User is entering the second parameter
        const opSymbol = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            modulus: '%'
        }[operation] || operation;
        inputField.value = `${a} ${opSymbol} ${current}`;
    } else if (a !== null && operation !== null && waitingForOperand) {
        // User just selected an operation, waiting for second parameter
        const opSymbol = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            modulus: '%'
        }[operation] || operation;
        inputField.value = `${a} ${opSymbol} `;
    } else {
        // Default: show last 3 calculations
        updateInputHistory();
    }
}

function pressNumber(num) {
    if (waitingForOperand) {
        current = '' + num;
        waitingForOperand = false;
    } else {
        if (current === '0') {
            current = '' + num;
        } else {
            current += num;
        }
    }
    updateDisplay();
}

function pressDot() {
    if (waitingForOperand) {
        current = '0.';
        waitingForOperand = false;
    } else if (!current.includes('.')) {
        current += '.';
    }
    updateDisplay();
}

function setOperation(op) {
    if (operation && !waitingForOperand) {
        calculateResult();
    }
    a = parseFloat(current);
    operation = op;
    waitingForOperand = true;
    updateDisplay();
}

function calculateResult() {
    if (operation === null) return;
    b = parseFloat(current);

    // Easter Egg: If a == 753, b == 951, operation == add
    if (a === 753 && b === 951 && operation === 'add') {
        showEasterEgg();
    }

    try {
        const result = calculator(a, b, operation);
        current = result.toString();
    } catch (e) {
        current = e.message;
    }
    updateDisplay();
    updateHistoryTable();
    operation = null;
    waitingForOperand = true;
    a = null;
    b = null;
}

function clearAll() {
    current = '0';
    a = null;
    b = null;
    operation = null;
    waitingForOperand = false;
    updateDisplay();
}

// Update input history when history table updates
function updateHistoryTable() {
    const historyData = getHistory();
    const tbody = document.querySelector('#historyTable tbody');
    tbody.innerHTML = '';
    historyData.slice(-10).reverse().forEach(item => {
        const opSymbol = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            modulus: '%'
        }[item.operation] || item.operation;
        const row = `<tr>
            <td>${item.a}</td>
            <td>${opSymbol}</td>
            <td>${item.b}</td>
            <td>${item.result}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
    updateInputHistory();
}

function updateInputHistory() {
    const inputHistory = document.getElementById('input-history');
    const historyData = getHistory();
    // Show up to last 3 expressions in the form: "A Op B = Result"
    inputHistory.value = historyData.slice(-3).map(item => {
        const opSymbol = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            modulus: '%'
        }[item.operation] || item.operation;
        return `${item.a} ${opSymbol} ${item.b} = ${item.result}`;
    }).join('\n');
}

// Easter Egg Animation
function showEasterEgg() {
    const egg = document.getElementById('easter-egg');
    egg.style.display = 'flex';
    setTimeout(() => {
        egg.style.display = 'none';
    }, 2200);
}

// Initialize history table and display on page load
window.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    updateHistoryTable();
    updateInputHistory();
});

// Expose functions to global scope for HTML onclick handlers
window.pressNumber = pressNumber;
window.pressDot = pressDot;
window.setOperation = setOperation;
window.calculateResult = calculateResult;
window.clearAll = clearAll;