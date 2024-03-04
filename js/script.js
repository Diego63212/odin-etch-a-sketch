const btnChange = document.querySelector('#btn-change');
const pixelContainer = document.querySelector('#pixel-container');
const containerSize = pixelContainer.offsetHeight;
let pixelCount = 16;

pixelContainer.addEventListener('mouseover', pixelHighlight);
btnChange.addEventListener('click', () => {
    // Set minimum to 1 and maximum of 100 to conserve performance
    let userPixelCount = Math.max(Math.min(prompt('How many pixels per side? (Max = 100)'), 100), 1);
    drawPixels(userPixelCount);
})

function randomRGB() {
    return Math.floor(Math.random() * 255);
}

function pixelHighlight(e) {
    // Gives a random color only to unmodified pixel class elements
    if (e.target.classList.contains('pixel') && e.target.style.backgroundColor == '') {
        e.target.style.backgroundColor = 'rgb('+randomRGB()+','+randomRGB()+', '+randomRGB()+')';
    } else {
        darkenColor(e)
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

// Use document fragment
let fragment = document.createDocumentFragment();

function drawPixels(amount) {
    let pixelSize = containerSize / amount + 'px';

    pixelContainer.replaceChildren('')
    for (let i = 0; i < amount * amount; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.height = pixelSize;
        pixelDiv.style.width = pixelSize;
        pixelDiv.classList.add('pixel');
        fragment.appendChild(pixelDiv);
    }
    pixelContainer.replaceChildren(fragment);
}

drawPixels(pixelCount)
