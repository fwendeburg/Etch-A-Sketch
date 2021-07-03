const pixelContainer = document.querySelector('.pixel-grid');

// Normal buttons.
const rangeSlider = document.querySelector('.range-slider');
const rangeSliderBtn = document.querySelector('#rangeslider-value-apply');
const sliderValuePara = document.querySelector('#current-rangeslider-value');
const eraseBtn = document.querySelector('#erase-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const grayscaleBtn = document.querySelector('#grayscale-btn');
const clearBtn = document.querySelector('#clear-btn');
const colorSelector = document.querySelector('.color-selector');

// Small screen buttons.
const clearBtnAlt = document.querySelector('#alt-clear-btn');
const rainbowBtnAlt = document.querySelector('#alt-rainbow-btn');
const blackBtn = document.querySelector('#black-btn');

// Default grid size value and color.
let color = "black";
let gridSize = 16;


function createGrid(size) {
    let gridArea = size**2;

    pixelContainer.style.cssText = `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);`;

    for (let i = 0; i < gridArea; i++) {
        pixelContainer.append(document.createElement('div'));
    }

    let pixelNodeList = pixelContainer.querySelectorAll('div');
    pixelNodeList.forEach(pixel => pixel.addEventListener('mouseover', colorPixel));
}


function colorPixel() {
    switch(color) {
        case "rainbow": this.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
                        break;
        case "eraser":  this.style.backgroundColor = "#FFFFFF";
                        break;
        case "black":   this.style.backgroundColor = "#000000";
                        break;
        case "gray":    let pixel = this;
                        getGrayScaleColor(pixel);
                        break;
        default:        this.style.backgroundColor = color;
                        break;
    }
}


function getGrayScaleColor(pixel) {
    if (pixel.style.backgroundColor.indexOf("rgba") !== -1) {
        let opacity = parseFloat(pixel.style.backgroundColor.slice(-4,-1));

        if (opacity >= 0.9) {
            pixel.style.backgroundColor = "rgba(0, 0, 0, 1)";
        }
        else if (opacity < 0.9) {pixel.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`
            ;
        }
    }
    else if (pixel.style.backgroundColor === "rgb(0, 0, 0)") {
        pixel.style.backgroundColor = "rgb(0, 0, 0)";
    }
    else {
        pixel.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
}


function clearPixelGrid() {
    removePixels();

    createGrid(gridSize);
}


function changeGridSize() {
    removePixels();

    gridSize = rangeSlider.value;
    createGrid(gridSize);

    sliderValuePara.textContent = `Current Size: ${gridSize}`;
}


function changeColor(event) {
    let elementId = event.target.id;

    if (elementId == 'rainbow-btn') color = "rainbow"
    else if (elementId == 'erase-btn') color = "eraser"
    else if (elementId == 'alt-rainbow-btn') color = "rainbow"
    else if (elementId = 'grayscale-btn') color = "gray"
    else color = "black"
}

function removePixels() {
    let pixelNodeList = pixelContainer.querySelectorAll('div');
    pixelNodeList.forEach(pixel => pixel.remove());
}

function setNewColor(event) {
    color = event.target.value;
}

// Create pixel grid on page load.
createGrid(gridSize);


// Event listeners.
eraseBtn.addEventListener('click', changeColor);
rainbowBtn.addEventListener('click', changeColor);
grayscaleBtn.addEventListener('click', changeColor);
clearBtn.addEventListener('click', clearPixelGrid);
blackBtn.addEventListener('click', changeColor);
rainbowBtnAlt.addEventListener('click', changeColor);
clearBtnAlt.addEventListener('click', clearPixelGrid);
rangeSliderBtn.addEventListener('click', changeGridSize);
colorSelector.addEventListener('change', setNewColor);