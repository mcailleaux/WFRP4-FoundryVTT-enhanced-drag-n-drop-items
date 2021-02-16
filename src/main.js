'use strict';

Hooks.on('init', () => {
    document.addEventListener('drop', (event) => {
        console.dir(data);
    });
});

Hooks.on('dropCanvasData', (data) => {
    console.dir(data);
});
