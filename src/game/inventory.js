
ThreeUtils = require("../sdk/threeutils");
InfoBox = require("./infobox.js");

var Inventory = {
    itemList: [],
    inventoryDisplay: [],
    itemSelected: -1
}

Inventory.items = {
    lamp: {
        sprite: "lamp",
        infoId: "mini_lamp"
    },
    player_atlas: {
        sprite: "player_atlas2",
        infoId: "mini_atlas"
    },
    cardboard_box: {
        sprite: "cardboardbox",
        infoId: "mini_box"
    },
    cardboard: {
        sprite: "cardboard",
        infoId: "mini_cardboard"
    },
    balloon: {
        sprite: "balloon",
        infoId: "mini_balloon"
    },
    magnets: {
        sprite: "magnets",
        infoId: "mini_magnets"
    },
    hammer: {
        sprite: "hammer",
        infoId: "mini_hammer"
    }
}

Inventory.added = function() {
    var inventory = document.getElementById("inventory");
    for (var i = 0; i < 6; i++)
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
    for (var i = 0; i < 6; i++)
    {
        this.inventoryDisplay[i].addEventListener("click", this.select(i));
    }

}
Inventory.addItem = function(item) {
   for (var i = 0; i < 6; i++){
       if (this.itemList[i] == undefined){
           ThreeUtils.setElementToAtlasImage(
               this.inventoryDisplay[i].image, ThreeUtils.loadAtlas("general"), item.sprite);
           this.inventoryDisplay[i].image.style.visibility = "visible";
           this.itemList[i] = item;
           break;
       }
   }
   GlobalVariables.setVariable(item.sprite + "_OBTAINED")
}
Inventory.removeItem = function(item) {
   for (var i = 0; i < 6; i++){
       if (Inventory.itemList[i] == item){
           this.inventoryDisplay[i].image.style.visibility = "hidden";
           this.itemList[i] = undefined;
           break;
       }
   }
   GlobalVariables.unsetVariable(item.sprite + "_OBTAINED")
}
Inventory.select = function(index){
    return function() {
        if (Inventory.itemList[index]){
		    InfoBox.display(Inventory.itemList[index].infoId);
        }

        Inventory.inventoryDisplay[index].style.boxShadow = "0px 0px 5px #fff";
        Inventory.inventoryDisplay[index].style.border = "5px solid white";
        if (index < 5){
            Inventory.inventoryDisplay[index+1].style.borderTop = "0px";
        }
        Inventory.itemSelected = index;
    };
}
Inventory.deselect = function(){
    var index = Inventory.itemSelected;
    if (index > -1){
        Inventory.inventoryDisplay[index].style.boxShadow = "0px 0px 0px #fff";
        Inventory.inventoryDisplay[index].style.border = "5px solid slategrey";
        if (index < 5){
            Inventory.inventoryDisplay[index].style.borderBottom = "0px";
            Inventory.inventoryDisplay[index+1].style.borderTop = "5px solid slategrey";
        }
        this.itemSelected = -1;
    }
}
Inventory.allowDrop = function(ev) {
    ev.preventDefault();
}

Inventory.drag = function(ev) {
    ev.dataTransfer.setData("target", ev.target.i);
}

Inventory.drop = function(ev) {
    ev.preventDefault();
    var index = ev.dataTransfer.getData("target");
    if (Inventory.itemList[index] == undefined && Inventory.itemList[ev.target.i] == undefined){
        return;
    }
    if (Inventory.itemList[index] == undefined){
        ThreeUtils.setElementToAtlasImage(
            Inventory.inventoryDisplay[index].image, ThreeUtils.loadAtlas("general"), Inventory.itemList[ev.target.i].sprite);
        Inventory.inventoryDisplay[index].image.style.visibility = "visible";
        Inventory.itemList[index] = Inventory.itemList[ev.target.i];
        Inventory.inventoryDisplay[ev.target.i].image.style.visibility = "hidden";
        Inventory.itemList[ev.target.i] = undefined;
    }else if (Inventory.itemList[ev.target.i] == undefined){
        ThreeUtils.setElementToAtlasImage(
            Inventory.inventoryDisplay[ev.target.i].image, ThreeUtils.loadAtlas("general"), Inventory.itemList[index].sprite);
        Inventory.inventoryDisplay[ev.target.i].image.style.visibility = "visible";
        Inventory.itemList[ev.target.i] = Inventory.itemList[index];
        Inventory.inventoryDisplay[index].image.style.visibility = "hidden";
        Inventory.itemList[index] = undefined;
    }else{
        var temp = Inventory.itemList[ev.target.i].sprite;
        ThreeUtils.setElementToAtlasImage(
            Inventory.inventoryDisplay[ev.target.i].image, ThreeUtils.loadAtlas("general"), Inventory.itemList[index].sprite);
        ThreeUtils.setElementToAtlasImage(
            Inventory.inventoryDisplay[index].image, ThreeUtils.loadAtlas("general"), temp);
        temp = Inventory.itemList[ev.target.i];
        Inventory.itemList[ev.target.i] = Inventory.itemList[index];
        Inventory.itemList[index] = temp;
    }
}
Inventory.itemHeld = function()
{
    if (this.itemSelected > -1)
    {
        return this.itemList[this.itemSelected];
    }
    return undefined;
}


module.exports = Inventory;
