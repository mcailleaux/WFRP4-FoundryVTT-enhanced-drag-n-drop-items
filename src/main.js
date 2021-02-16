'use strict';

Hooks.on('init', () => {

    document.addEventListener('drop', async (event) => {
        if (
            event.target.nodeName !== 'INPUT' &&
            event.target.nodeName !== 'TEXTAREA' ||
            event.target.nodeName === 'INPUT' && event.target.type !== 'text' ||
            event.target.nodeName === 'INPUT' && event.target.readOnly ||
            event.target.nodeName === 'TEXTAREA' && event.target.readOnly) {
            return;
        }
        try {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            await dropData(data, event.target);
        } catch (err) {
            return;
        }
    });


    async function dropData(data, target) {
        if (data == null) {
            return;
        }
        switch (data.type) {
            case 'Item':
                const item = await Item.fromDropData(data);
                await dropItem(item, target);
                break;
        }
    }

    async function dropItem(item, target) {
        if (item == null || target == null) {
            return;
        }
        let value = target.value;
        if (value == null || value.trim() === '') {
            value = item.name;
        } else {
            value += ', ' + item.name;
        }

        target.value = value;

    }
});
