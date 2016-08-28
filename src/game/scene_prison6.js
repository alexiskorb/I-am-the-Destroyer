
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a solid wall

var PrisonScene6 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene6.prototype = new PrisonScene();

PrisonScene6.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "wall",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison7",
		globalIsTrue: "CARDBOARD_WALL"
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene6.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene6();
