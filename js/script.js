const btnChange = document.querySelector('#btn-change')
const pixelContainer = document.querySelector('#pixel-container');
const containerSize = pixelContainer.offsetHeight;
let pixelCount = 16;
/* let pixelSize = containerSize / pixelCount - 1 + 'px'; */

pixelContainer.addEventListener('mouseover', pixelHighlight);
/* pixelContainer.addEventListener('mouseout', pixelFade); */
btnChange.addEventListener('click', (event) => {
    let userPixelCount = prompt('How many pixels per side?');
    drawPixels(userPixelCount);
})

function pixelHighlight(event) {
    if (event.target.classList.contains('pixel')) {
        event.target.style.backgroundColor = 'yellow';
    }
}

function pixelFade(event) {
    if (event.target.classList.contains('pixel')) {
        event.target.style.backgroundColor = '';
    }
}

// Use document fragment
let fragment = document.createDocumentFragment();

function drawPixels(amount) {
    let pixelSize = containerSize / amount - 1 + 'px';
    console.log(pixelSize);

    for (let i = 0; i < amount * amount; i++) {
        let pixelDiv = document.createElement('div');
    /*     pixelDiv.style.backgroundColor = 'yellow'; */
        pixelDiv.style.height = pixelSize;
        pixelDiv.style.width = pixelSize;
        pixelDiv.classList.add('pixel')
        fragment.appendChild(pixelDiv);
    /*     pixelContainer.appendChild(pixelDiv); */
    }
    pixelContainer.replaceChildren(fragment);
}

drawPixels(pixelCount)
