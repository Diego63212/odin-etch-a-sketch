const btnChange = document.querySelector('#btn-change');
const btnReset = document.querySelector('#btn-reset');
const pixelContainer = document.querySelector('#pixel-container');
const fragment = document.createDocumentFragment(); // Use document fragment for extra performance
let pixelCount = 16;

function drawPixels(amount) {
    const pixelSize = 100 / amount + '%';
    for (let i = 0; i < amount * amount; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.height = pixelSize;
        pixelDiv.style.width = pixelSize;
        pixelDiv.classList.add('pixel');
        fragment.appendChild(pixelDiv);
    }
    pixelContainer.replaceChildren(fragment);
}

function randomRGB() {
    return Math.floor(Math.random() * 255);
}

function pixelHighlight(e) {
    const pixel = e.target;
    // Gives a random color only to unmodified pixel class elements
    if (!pixel.style.backgroundColor) {
        pixel.style.backgroundColor = 'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
    } else {
        darkenColor(pixel);
    }
}
// Divides individual colors to darken them over reiterated interactions
function darkenColor(pixel) {
    // Unpack regular expression groups into variables for easy data access
    let [, colorRed, colorGreen, colorBlue] = /(\d+), (\d+), (\d+)/.exec(pixel.style.backgroundColor);
    colorRed = Math.floor(colorRed / 1.5);
    colorGreen = Math.floor(colorGreen / 1.5);
    colorBlue = Math.floor(colorBlue / 1.5);
    pixel.style.backgroundColor = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
}
// Listen to bubbling mouseover event for better performance
pixelContainer.addEventListener('mouseover', pixelHighlight);

btnChange.addEventListener('click', () => {
    // Set minimum to 1 and maximum of 200 to conserve performance
    pixelCount = Math.max(Math.min(prompt('How many pixels per side? (Maximum is 200)', '16'), 200), 1);
    drawPixels(pixelCount);
});

btnReset.addEventListener('click', () => {
    drawPixels(pixelCount);
});

// Initialize with default value
drawPixels(pixelCount);