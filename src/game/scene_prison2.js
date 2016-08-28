
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you have to get past a crocodile-filled moat

var PrisonScene2 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene2.prototype = new PrisonScene();

PrisonScene2.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "moat",
		continue: true,
	});
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison3",
		globalIsTrue: "FoodForAnimals"
	});
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison3",
		globalIsTrue: "DAM_BUILT"
	});

	PrisonScene.prototype.added.call(this);
}

PrisonScene2.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene2();
