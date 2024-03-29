const btnChange = document.querySelector('#btn-change');
const btnReset = document.querySelector('#btn-reset');
const pixelContainer = document.querySelector('#pixel-container');
let pixelCount = 16;

// Listen to bubbling mouseover event for better performance
pixelContainer.addEventListener('mouseover', pixelHighlight);

btnChange.addEventListener('click', () => {
    // Set minimum to 1 and maximum of 100 to conserve performance
    pixelCount = Math.max(Math.min(prompt('How many pixels per side? (Maximum is 100)', '16'), 100), 1);
    drawPixels(pixelCount);
})

btnReset.addEventListener('click', () => {
    drawPixels(pixelCount);
})

function randomRGB() {
    return Math.floor(Math.random() * 255);
}

function pixelHighlight(e) {
    // Gives a random color only to unmodified pixel class elements
    if (e.target.classList.contains('pixel') && e.target.style.backgroundColor == '') {
        e.target.style.backgroundColor = 'rgb('+randomRGB()+','+randomRGB()+', '+randomRGB()+')';
    } else if (e.target.classList.contains('pixel')) {
        darkenColor(e);
    }
}
// Divides individual colors to darken them over reiterated interactions
function darkenColor(e) {
    // Store regular expression groups into an array for easy data access
    let lastColor = Array.from(/rgb\((\d*), (\d*), (\d*)\)/.exec(e.target.style.backgroundColor));
    let colorRed = Math.floor(lastColor[1] / 1.5);
    let colorGreen = Math.floor(lastColor[2] / 1.5);
    let colorBlue = Math.floor(lastColor[3] / 1.5);
    e.target.style.backgroundColor = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
}

// Use document fragment for extra performance
let fragment = document.createDocumentFragment();

function drawPixels(amount) {
    let pixelSize = 100 / amount + '%';

    for (let i = 0; i < amount * amount; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.height = pixelSize;
        pixelDiv.style.width = pixelSize;
        pixelDiv.classList.add('pixel');
        fragment.appendChild(pixelDiv);
    }
    pixelContainer.replaceChildren(fragment);
}

drawPixels(pixelCount);
