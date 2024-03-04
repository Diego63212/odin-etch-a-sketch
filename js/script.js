const btnChange = document.querySelector('#btn-change')
const pixelContainer = document.querySelector('#pixel-container');
const containerSize = pixelContainer.offsetHeight;
let pixelCount = 16;

pixelContainer.addEventListener('mouseover', pixelHighlight);
btnChange.addEventListener('click', () => {
    // Set minimum to 1 and maximum of 100 to conserve performance
    let userPixelCount = Math.max(Math.min(prompt('How many pixels per side?'), 100), 1);
    drawPixels(userPixelCount);
})

function pixelHighlight(e) {
    if (e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = 'yellow';
    }
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
        pixelDiv.classList.add('pixel')
        fragment.appendChild(pixelDiv);
    }
    pixelContainer.replaceChildren(fragment);
}

drawPixels(pixelCount)
