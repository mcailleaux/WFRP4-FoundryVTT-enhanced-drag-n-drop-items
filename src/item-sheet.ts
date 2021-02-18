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

    switch (`${sheet.item?.type?.toLowerCase()}-${item.type?.toLowerCase()}`) {
        case 'career-skill':
            const currentSkills = filterEmpty(sheet.item?.data?.data?.skills);
            currentSkills.push(item.name);
            sheet.item?.update({'data.skills': currentSkills});
            break;
        case 'career-talent':
        case 'career-trait':
            const currentTalents = filterEmpty(sheet.item?.data?.data?.talents);
            currentTalents.push(item.name);
            sheet.item?.update({'data.talents': currentTalents});
            break;
        case 'career-trapping':
        case 'career-ammunition':
        case 'career-armour':
        case 'career-container':
        case 'career-money':
        case 'career-weapon':
            const currentTrappings = filterEmpty(sheet.item?.data?.data?.trappings);
            currentTrappings.push(item.name);
            sheet.item?.update({'data.trappings': currentTrappings});
            break;
        case 'talent-skill':
            console.dir(sheet);
            console.dir(item);
            const currentTests = trimedFilterEmpty(sheet.item?.data?.data?.tests?.split(','));
            currentTests.push(item.name);
            sheet.item?.update({'data.tests': currentTests.join(', ')});
            break;
    }

}

function filterEmpty(list: string[]) {
    return list != null ? list.filter((element: string) => element != null && element.trim() !== '') : [];
}

function trimedFilterEmpty(list: string[]) {
    return filterEmpty(list).map((element) => element.trim());
}
