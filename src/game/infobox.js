
Input = require("../sdk/input");
ThreeUtils = require("../sdk/threeutils");
GlobalVariables = require("./globalvariables.js");

var InfoBox =
{
    currentText: undefined,
}
InfoBox.text = 
{
    test: "hey",
    test2: "This is an infobox."
    
}
InfoBox.added = function()
{
    this.element = document.getElementById("infobox");
    this.element.style.visibility = "hidden";
}
InfoBox.display = function(name)
{
    this.currentText = name;
    this.element.innerHTML = this.text[name];
    this.element.style.visibility = "visible";
}
InfoBox.hide = function()
{
    this.element.style.visibility = "hidden";
    this.currentText = undefined;
}

module.exports = InfoBox;