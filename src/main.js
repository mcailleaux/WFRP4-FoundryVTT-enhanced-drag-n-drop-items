'use strict';

Hooks.on('init', () => {
    initDropHandler();
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

function initDropHandler() {
    const originalDropHandler = ItemSheet.prototype._onDrop;
    ItemSheet.prototype._onDrop = async function (event) {
        try {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            await dropData(data);
        } catch (err) {
            console.error(err);
        }
        if (originalDropHandler != null) {
            originalDropHandler.call(this, event);
        }
    };

    const defaultOption = ItemSheet.defaultOptions;
    defaultOption.dragDrop.push({dragSelector: '.item-list .item', dropSelector: null});
    Object.defineProperty(ItemSheet, 'defaultOptions', {
        get: () => {
            return defaultOption;
        }
    });
}

async function dropData(data) {
    if (data == null) {
        return;
    }
    switch (data.type) {
        case 'Item':
            const item = await Item.fromDropData(data);
            await dropItem(item);
            break;
    }
}

async function dropItem(item) {
    if (item == null) {
        return;
    }
    console.dir(this);
    console.dir(item);
    // let value = target.value;
    // if (value == null || value.trim() === '') {
    //     value = item.name;
    // } else {
    //     value += ', ' + item.name;
    // }
    //
    // target.value = value;

}
