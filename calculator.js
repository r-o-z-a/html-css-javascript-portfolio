const operators = document.getElementsByClassName('operator');
const numbers = document.getElementsByClassName('number');
const display = document.getElementById('display');
const evalButton = document.getElementById('eval');
let lastClicked = 'symbol'; 

Array.from(numbers).forEach(numberElement => {
    let numberValue = numberElement.textContent;
    numberElement.addEventListener('click', () => {
        lastClicked = 'number';
    });
});


Array.from(operators).forEach(element => {
    element.addEventListener('click', () => {
        if (lastClicked !== 'symbol') {
            lastClicked = 'symbol';
            display.value += element.value;
        }
    });
});


evalButton.addEventListener('click', () => {
    calculate();
});

function calculate() {
    let expression = display.value;
    let result;

    try {
        // Replace trigonometric function inputs with Math functions
        expression = expression.replace(/sin\(([^)]+)\)/g, function(match, degrees) {
            const radians = (parseFloat(degrees) * Math.PI) / 180;
            return Math.sin(radians);
        });
        expression = expression.replace(/cos\(([^)]+)\)/g, function(match, degrees) {
            const radians = (parseFloat(degrees) * Math.PI) / 180;
            return Math.cos(radians);
        });
        expression = expression.replace(/tan\(([^)]+)\)/g, function(match, degrees) {
            const radians = (parseFloat(degrees) * Math.PI) / 180;
            return Math.tan(radians);
        });
        // Replace ln with Math.log, log with Math.log10
        expression = expression.replace(/ln\(([^)]+)\)/g, function(match, num) {
            return Math.log(parseFloat(num));
        });
        expression = expression.replace(/log\(([^)]+)\)/g, function(match, num) {
            return Math.log10(parseFloat(num));
        });
        // Replace ^ with **
        expression = expression.replace(/\^/g, '**');
        // Replace ² with **2
        expression = expression.replace(/²/g, '**2');
        // Replace √ with Math.sqrt
        expression = expression.replace(/√\(([^)]+)\)/g, function(match, num) {
            return Math.sqrt(parseFloat(num));
        });


        result = eval(expression); // Use eval to evaluate the expression
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}


