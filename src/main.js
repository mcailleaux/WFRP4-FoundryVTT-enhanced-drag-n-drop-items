'use strict';

Hooks.once('init', () => {
    hookItemDragHandlers();
});

function hookItemDragHandlers() {
    const originalDragLeftDropHandler = Item.prototype._onDragLeftDrop;
    Item.prototype._onDragLeftDrop = function (event) {
        console.dir(event);
        originalDragLeftDropHandler.call(this, event);
    };
}
