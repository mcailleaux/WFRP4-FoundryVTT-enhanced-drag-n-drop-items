'use strict';

import {initItemSheetDropHandler} from './item-sheet.js';

Hooks.on('init', () => {
    initItemSheetDropHandler();
    // document.addEventListener('drop', async (event) => {
    //     if (
    //         event.target.nodeName !== 'INPUT' &&
    //         event.target.nodeName !== 'TEXTAREA' ||
    //         event.target.nodeName === 'INPUT' && event.target.type !== 'text' ||
    //         event.target.nodeName === 'INPUT' && event.target.readOnly ||
    //         event.target.nodeName === 'TEXTAREA' && event.target.readOnly) {
    //         return;
    //     }
    //     try {
    //         const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    //         await dropData(data, event.target);
    //     } catch (err) {
    //         return;
    //     }
    // });


});


