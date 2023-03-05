const lineColor = document.getElementById('line-color');
const lineWidth = document.getElementById('line-width');
const canvas = document.createElement('canvas');

const Position = { x: 0, y: 0 };
const History = [];
const HistoryUndo = [];

resize = () => {
    const temp = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.putImageData(temp, 0, 0);
}

setPosition = (event) => {
    const { x, y } = event;
    Position.x = x;
    Position.y = y;
}

saveChange = (_ev) => {
    if (History.length >= 256)
        History.shift();

    History.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
}

document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
resize();

document.addEventListener('mousemove', (event) => {
    if (event.buttons !== 1 || contextMenuOpen)
        return;

    ctx.beginPath();

    ctx.lineWidth = lineWidth.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor.value;

    ctx.moveTo(Position.x, Position.y);
    setPosition(event);
    ctx.lineTo(Position.x, Position.y);

    ctx.stroke();
});

document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

window.addEventListener('resize', resize);

document.addEventListener('DOMContentLoaded', saveChange);
document.addEventListener('mouseup', saveChange);