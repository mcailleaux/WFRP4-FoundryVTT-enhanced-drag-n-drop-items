'use strict';

Hooks.on('init', () => {

    const originalDropHandler = ItemSheet.prototype._onDrop;
    ItemSheet.prototype._onDrop = async (event) => {
        console.dir(event);
        if (originalDropHandler != null) {
            originalDropHandler.call(this, event);
        }
    };

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
