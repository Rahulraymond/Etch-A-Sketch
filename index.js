const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const gridSizeRange = document.getElementById('gridSizeRange');
const gridSizeLabel = document.getElementById('gridSizeLabel');
const colorPicker = document.getElementById('colorPicker');
const resetButton = document.getElementById('resetCanvas');

let isDrawing = false;
let gridSize = 16;
let currentColor = '#000000';

function initializeGrid() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawGrid();
}

function drawGrid() {
    const boxWidth = canvas.width / gridSize;
    const boxHeight = canvas.height / gridSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(i * boxWidth, j * boxHeight, boxWidth, boxHeight);
        }
    }
}

function handleColorChange() {
    colorPicker.addEventListener('input', () => {
        currentColor = colorPicker.value;
    });
}

function handleGridSizeChange() {
    gridSizeRange.addEventListener('input', () => {
        gridSize = gridSizeRange.value;
        gridSizeLabel.textContent = gridSize;
        initializeGrid();
    });
}

function handleCanvasInteraction() {
    canvas.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.beginPath(); // Reset path after releasing mouse
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const x = Math.floor(e.offsetX / (canvas.width / gridSize));
            const y = Math.floor(e.offsetY / (canvas.height / gridSize));
            ctx.fillStyle = currentColor;
            ctx.fillRect(x * (canvas.width / gridSize), y * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));
        }
    });
}

function handleResetCanvas() {
    resetButton.addEventListener('click', () => {
        initializeGrid();
    });
}

// Initialize grid on page load
initializeGrid();

// Attach event listeners
handleColorChange();
handleGridSizeChange();
handleCanvasInteraction();
handleResetCanvas();
