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

//function to set new mode
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

//function to set new size
function setCurrentSize(newSize) {
    currentSize = newSize
}

const colorPicker = document.getElementById('color-picker'); //color picker
const colorButton = document.getElementById('color-button'); //color button
const rainbowButton = document.getElementById('rainbow-button'); //rainbow button
const randomButton = document.getElementById('random-button'); //random button
const eraserButton = document.getElementById('eraser-button'); //eraser button
const clearButton = document.getElementById('clear-button'); //clear button
const container = document.querySelector(".container"); //grid container

colorPicker.oninput = (e) => setCurrentColor(e.target.value); //user choose color
colorButton.onclick = () => setCurrentMode('color'); //user choose color mode
rainbowButton.onclick = () => setCurrentMode('rainbow'); //user choose rainbow mode
randomButton.onclick = () => setCurrentMode('random'); //user choose random mode
eraserButton.onclick = () => setCurrentMode('eraser'); //user choose eraser mode
clearButton.onclick = () => drawGrid(currentSize); //user choose clear

let slider = document.getElementById("myRange"); //slider
let output = document.getElementById("size"); //to show current grid size
output.innerHTML = `${slider.value}x${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = `${this.value}x${this.value}`;
}

//function that draws the grid given the size
function drawGrid(divs = 16) {
    container.innerHTML = ''; //clear the existing grid
    let width = (400 / divs) / 400 * 100; //to hold width of each div container

    //adjust width and height as needed
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`.blocks { width: ${width}%; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`.blocks { height: ${width}%; }`, styleSheet.cssRules.length);

    //for loop to add all divs and create a new grid
    for (let i = 0; i < divs * divs; i++) {
        let div = document.createElement("div"); //each individual grid element
        div.classList.add("blocks");
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        container.appendChild(div);
    }
}

//create a new grid with selected size
let applyButton = document.getElementById("apply-button");
applyButton.onclick = function () {
    if (currentSize == slider.value) {
        return;
    }
    currentSize = slider.value;
    drawGrid(slider.value);
}

//function that changes the color
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'random') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowButton.classList.remove('active');
    } else if (currentMode === 'color') {
        colorButton.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active');
    } else if (currentMode === 'random') {
        randomButton.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowButton.classList.add('active');
    } else if (newMode === 'color') {
        colorButton.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
    } else if (newMode === 'random') {
        randomButton.classList.add('active');
    }
}

window.onload = () => {
    drawGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}