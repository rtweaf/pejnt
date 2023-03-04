const contextMenu = document.getElementById('context-menu');

contextMenuOpen = false;

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const { x, y } = event;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`; 
    contextMenu.removeAttribute('hidden');

    contextMenuOpen = true;
});

window.addEventListener('mousedown', (event) => {
    if (event.target.offsetParent != contextMenu) {
        contextMenu.setAttribute('hidden', '');
        contextMenuOpen = false;
    }
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'b':
            document.body.style.backgroundColor =
            (document.body.style.backgroundColor == 'white' ||
                document.body.style.backgroundColor == '')
                ? 'black' : 'white';
            break;

        case 'z':
            if (event.ctrlKey && History.length > 0)
                ctx.putImageData(History.pop(), 0, 0);
            break;

        case 'y':
            if (event.ctrlKey && History.length > 0)
                ctx.putImageData(History.shift(), 0, 0);
            break;
    }
});

document.addEventListener('paste', (event) => {
    const image = new Image();
    image.onload = () => {
        ctx.drawImage(image, Position.x, Position.y);
    }
    image.src = URL.createObjectURL(event.clipboardData.items[0].getAsFile());
});