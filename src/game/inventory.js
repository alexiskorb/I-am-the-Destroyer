

var Inventory = {
    inventoryItems: [],
    inventorySize: 0
}

Inventory.addItem = function(item) {
    this.inventoryItems.push(item);
    this.inventorySize++;
}
Inventory.removeItem = function(item) {
    index = this.inventoryItems.indexOf(item);
    if (index > -1){
        this.inventoryItems.splice(index, 1);
        this.inventorySize--;
    }
}

module.exports = Inventory;
