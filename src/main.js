'use strict';

Hooks.on('init', () => {
    document.addEventListener('dragstart', (event) => {
        console.dir(event);
    });
    document.addEventListener('drop', (event) => {
        console.dir(event);
    });
});
