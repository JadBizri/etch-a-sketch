function drawGrid() {
    const divs = 4;
    let width = (400 / divs) / 400 * 100;
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`.blocks { width: ${width}%; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`.blocks { height: ${width}%; }`, styleSheet.cssRules.length);
    const container = document.querySelector(".container");
    for (let i = 0; i < divs * divs; i++) {
        let div = document.createElement("div");
        div.classList.add("blocks");
        container.appendChild(div);
    }
}

drawGrid();

var slider = document.getElementById("myRange");
var output = document.getElementById("size");
output.innerHTML = `${slider.value}x${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `${this.value}x${this.value}`;
} 