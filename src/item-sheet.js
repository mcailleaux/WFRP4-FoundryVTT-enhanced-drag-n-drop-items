export function initItemSheetDropHandler() {
    const originalDropHandler = ItemSheet.prototype._onDrop;
    ItemSheet.prototype._onDrop = async function (event) {
        try {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            await dropData(data, this);
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

async function dropData(data, sheet) {
    if (data == null) {
        return;
    }
    switch (data.type) {
        case 'Item':
            const item = await Item.fromDropData(data);
            await dropItem(item, sheet);
            break;
    }
}

async function dropItem(item, sheet) {
    if (item == null) {
        return;
    }
    console.dir(sheet);
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
