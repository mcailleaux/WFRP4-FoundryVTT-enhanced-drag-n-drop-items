'use strict';

Hooks.on('init', () => {
    document.addEventListener('drop', (event) => {
        console.dir(event);
    });
});

Hooks.on('dropCanvasData', (data) => {
    console.dir(data);
});
