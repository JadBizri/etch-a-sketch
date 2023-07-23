const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

//function to set new color
function setCurrentColor(newColor) {
    currentColor = newColor
}

//function to set new color
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

//function to set new size
function setCurrentSize(newSize) {
    currentSize = newSize
}

const container = document.querySelector(".container"); //grid container

function drawGrid(divs = 16) {
    container.innerHTML = ''; // Clear the existing grid
    let width = (400 / divs) / 400 * 100; //to hold width of each div container

    //adjust width and height as needed
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`.blocks { width: ${width}%; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`.blocks { height: ${width}%; }`, styleSheet.cssRules.length);

    //for loop to add all divs and create a new grid
    for (let i = 0; i < divs * divs; i++) {
        let div = document.createElement("div");
        div.classList.add("blocks");
        container.appendChild(div);
    }
}

let slider = document.getElementById("myRange");
let output = document.getElementById("size"); //to show current grid size
output.innerHTML = `${slider.value}x${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = `${this.value}x${this.value}`;
}

//create a new grid with selected size
let applyButton = document.getElementById("apply-button");
applyButton.onclick = function () {
    drawGrid(slider.value);
}

drawGrid(); //default size 16