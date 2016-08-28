
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a labyrinth

var PrisonScene4 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene4.prototype = new PrisonScene();

PrisonScene4.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "labyrinth",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison5",
		globalIsTrue: ["DAM_BUILT", "BAD_LABYRINTH"]
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene4.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene4();
