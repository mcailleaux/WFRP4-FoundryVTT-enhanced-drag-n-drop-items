'use strict';

Hooks.on('init', () => {

    const originalCanDragHandler = ItemSheet.prototype._canDragStart;
    ItemSheet.prototype._canDragStart = async (event) => {
        console.dir(this);
        console.dir(event);
        if (originalCanDragHandler != null) {
            originalCanDragHandler.call(this, event);
        }
    };

    const originalCanDropHandler = ItemSheet.prototype._canDragDrop;
    ItemSheet.prototype._canDragDrop = async (event) => {
        console.dir(this);
        console.dir(event);
        if (originalCanDropHandler != null) {
            originalCanDropHandler.call(this, event);
        }
    };

    const originalDragStartHandler = ItemSheet.prototype._onDragStart;
    ItemSheet.prototype._onDragStart = async (event) => {
        console.dir(this);
        console.dir(event);
        if (originalDragStartHandler != null) {
            originalDragStartHandler.call(this, event);
        }
    };

    const originalDropHandler = ItemSheet.prototype._onDrop;
    ItemSheet.prototype._onDrop = async (event) => {
        console.dir(this);
        console.dir(event);
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


    // /** @override */
    // async _onDrop(event) {
    //     // Try to extract the data
    //     let data;
    //     try {
    //         data = JSON.parse(event.dataTransfer.getData('text/plain'));
    //     } catch (err) {
    //         return false;
    //     }
    //     const actor = this.actor;
    //     // Handle the drop with a Hooked function
    //     const allowed = Hooks.call("dropActorSheetData", actor, this, data);
    //     if ( allowed === false ) return;
    //     // Handle different data types
    //     switch ( data.type ) {
    //         case "Item":
    //             return this._onDropItem(event, data);
    //         case "Actor":
    //             return this._onDropActor(event, data);
    //     }
    // }
});
