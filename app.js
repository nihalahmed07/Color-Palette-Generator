// Style each letter of the heading with a different color
function styleEachLetter(text, colors) {
    const container = document.getElementById('neo-heading');
    container.innerHTML = ''; // Clear existing

    let index = 0;
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        if (char !== ' ') {
            span.style.color = colors[index % colors.length];
            index++;
        } else {
            span.innerHTML = '&nbsp;';
        }
        container.appendChild(span);
    });
}

// Generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Generate and display the color palette
function generatePalette() {
    const palette = document.getElementById('palette');
    palette.innerHTML = ''; // Clear previous colors

    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = color;
        box.textContent = color;
        box.onclick = () => {
            navigator.clipboard.writeText(color).then(() => {
           box.classList.add('copied');

           setTimeout(() => {
               box.classList.remove('copied');
           }, 2000);
       }).catch(err => {
           console.error('Failed to copy: ', err);
       });
   };
        palette.appendChild(box);
    }
}

// Download the color palette as a PNG image
function downloadPNG() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const boxCount = 5;
    const boxWidth = 150;
    const boxHeight = 200;
    canvas.width = boxWidth * boxCount;
    canvas.height = boxHeight;

    const colorBoxes = document.querySelectorAll('.color-box');

    colorBoxes.forEach((box, index) => {
        const bgColor = getComputedStyle(box).backgroundColor;
        ctx.fillStyle = bgColor;
        ctx.fillRect(index * boxWidth, 0, boxWidth, boxHeight);

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(box.textContent.split('\n')[0], index * boxWidth + boxWidth / 2, boxHeight - 20);
    });

    const link = document.createElement('a');
    link.download = 'color-palette.png';
    link.href = canvas.toDataURL();
    link.click();
}

const headingText = '🎨 NEO Color Palette Generator';
const colorSet = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];

styleEachLetter(headingText, colorSet);

// Generate one palette on load
window.onload = generatePalette;



