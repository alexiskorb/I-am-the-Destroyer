
ThreeUtils = require("../sdk/threeutils");

var Inventory = {
    itemList: [],
    inventoryDisplay: []
}

Inventory.items = {
    lamp: {
        sprite: "lamp",
    }
}

Inventory.added = function() {
    var inventory = document.getElementById("inventory");
    for (var i = 0; i < 5; i++)
    {
        var li = document.createElement("li");
        inventory.appendChild(li);
        li.i = i;
        li.className = "inventoryItem";
        li.addEventListener("drop", this.drop);
        li.addEventListener("dragover", this.allowDrop);
        li.image = document.createElement("div");
        li.image.className = "inventoryImage";
        li.image.i = i;
        li.appendChild(li.image);
        li.id = "inventoryItem" + i;
        li.image.id = "inventoryImage" + i;
        li.image.draggable = "true";
        li.image.addEventListener("dragstart", this.drag);
        this.inventoryDisplay[i] = li;
        this.itemList[i] = undefined; 
    }
}
Inventory.addItem = function(item) {
   for (var i = 0; i < 5; i++){
       if (this.itemList[i] == undefined){
           ThreeUtils.setElementToAtlasImage(
               this.inventoryDisplay[i].image, ThreeUtils.loadAtlas("general"), item.sprite);
            this.inventoryDisplay[i].image.style.visibility = "visible";
           this.itemList[i] = item;
           break;
       }
   }
}
Inventory.removeItem = function(item) {
   for (var i = 0; i < 5; i++){
       if (Inventory.itemList[i] == item){
           this.inventoryDisplay[i].image.style.visibility = "hidden";
           this.itemList[i] = undefined;
           break;
       }
   }

}
Inventory.allowDrop = function(ev) {
    ev.preventDefault();
}

Inventory.drag = function(ev) {
    ev.dataTransfer.setData("target", ev.i);
}

Inventory.drop = function(ev) {
    ev.preventDefault();
    var index = ev.dataTransfer.getData("target");
    if (Inventory.itemList[ev.target.i] == undefined){
        ThreeUtils.setElementToAtlasImage(
            ev.target.image, ThreeUtils.loadAtlas("general"), Inventory.itemList[index].sprite);
        Inventory.inventoryDisplay[index].image.visibility = "hidden";
        Inventory.itemList[ev.target.i] == Inventory.itemList[index];
        Inventory.itemList[index] == undefined;
    }
}


module.exports = Inventory;
