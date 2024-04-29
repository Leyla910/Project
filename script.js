const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', event => {
    event.preventDefault(); //отменить дефолтное поведение
    if (event.code === 'Space') {
        setRandomColors();
    }
    // if (event.code.toLowerCase === 'space')
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
    else if (type === 'copy') {
        copyToClikboard(event.target.textContent);
    }
})

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}

function copyToClikboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors() {
    columns.forEach(column => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock');
        const text = column.querySelector('h2');
        const button = column.querySelector('button');
        const color = generateRandomColor();

        if (isLocked) {
            return
        }

        text.textContent = color;
        column.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();