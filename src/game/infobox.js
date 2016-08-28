
Input = require("../sdk/input");
ThreeUtils = require("../sdk/threeutils");
GlobalVariables = require("./globalvariables.js");

var InfoBox =
{
    currentText: undefined,
}
InfoBox.info = 
{
    test: [
        {
            text: "hey",
            isTrue: [],
            isFalse: []
        }
    ],
    test2: [
        {
            text: "yo",
            isTrue: [],
            isFalse: []
        }
    ]


}
InfoBox.added = function()
{
    this.element = document.getElementById("infobox");
    this.element.style.visibility = "hidden";
}
InfoBox.display = function(name)
{
    var text = undefined;
    for (var i = 0; i < InfoBox.info[name].length; i++)
    {
        var temp = this.parseConditionals(InfoBox.info[name][i]);
        if (temp)
        {
            text = temp;
            break;
        }
    }
    if (text){
        this.currentText = name;
        this.element.innerHTML = text;
        this.element.style.visibility = "visible";
    }
}
InfoBox.hide = function()
{
    this.element.style.visibility = "hidden";
    this.currentText = undefined;
}
InfoBox.parseConditionals = function(item)
{
    for (var i = 0; i < item.isFalse.length; i++)
    {
        if (GlobalVariables.getVariable(item.isFalse[i]))
		{
			return undefined;
        }
    }
    for (var i = 0; i < item.isTrue.length; i++)
    {
		if (!GlobalVariables.getVariable(item.isTrue[i]))
		{
			return undefined;
		}
    }
    return item.text;
}


module.exports = InfoBox;