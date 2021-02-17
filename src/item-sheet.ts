export function initItemSheetDropHandler() {

    // @ts-ignore
    const originalDropHandler = ItemSheet.prototype._onDrop;
    // @ts-ignore
    ItemSheet.prototype._onDrop = async function (event) {
        if (event?.dataTransfer != null) {
            try {
                const data = JSON.parse(event.dataTransfer.getData('text/plain'));
                await dropData(data, this);
            } catch (err) {
                console.error(err);
            }
        }
        if (originalDropHandler != null) {
            originalDropHandler.call(this, event);
        }
    };

    const defaultOption = ItemSheet.defaultOptions;
    defaultOption.dragDrop?.push({dragSelector: '.item-list .item', dropSelector: null});
    Object.defineProperty(ItemSheet, 'defaultOptions', {
        get: () => {
            return defaultOption;
        }
    });
}

async function dropData(data: any, sheet: ItemSheet) {
    if (data == null) {
        return;
    }
    switch (data.type) {
        case 'Item':
            const item: Item = <Item>await Item.fromDropData(data);
            await dropItem(item, sheet);
            break;
    }
}

async function dropItem(item: Item, sheet: ItemSheet) {
    if (item == null || sheet == null) {
        return;
    }
    console.dir(sheet);
    console.dir(item);

    switch (item.type?.toLowerCase()) {
        case 'skill':
            const currentSkills = sheet.item?.data?.skills ?? [];
            currentSkills.push(item.name);
            sheet.item?.update('data.skills', currentSkills);
            break;
    }

    // let value = target.value;
    // if (value == null || value.trim() === '') {
    //     value = item.name;
    // } else {
    //     value += ', ' + item.name;
    // }
    //
    // target.value = value;

}
