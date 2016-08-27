
var Inventory = {
    itemList: [],
    inventoryDisplay: []
}

Inventory.items = {
    lamp: {
        source: "media/red lamp.jpg",
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
        li.image = document.createElement("img");
        li.image.className = "inventoryImage";
        li.image.src = "";
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
           this.inventoryDisplay[i].image.src = item.source;
           this.itemList[i] = item;
           break;
       }
   }
}
Inventory.removeItem = function(item) {
   for (var i = 0; i < 5; i++){
       if (Inventory.itemList[i] == item){
           this.inventoryDisplay[i].image.src = "";
           this.itemList[i] = undefined;
           break;
       }
   }

}
Inventory.allowDrop = function(ev) {
    ev.preventDefault();
}

Inventory.drag = function(ev) {
    ev.dataTransfer.setData("target", ev.target);
}

Inventory.drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("target");
    if (this.itemList[ev.target.i] == undefined){
        ev.target.image.src = data.src
        data.src = "";
        this.itemList[ev.target.i] == data.i;
        this.itemList[data.i] == undefined;
    }
}


module.exports = Inventory;
