
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get over a pit filled with spikes and other less sensible things

var PrisonScene7 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene7.prototype = new PrisonScene();

PrisonScene7.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "pit",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison8",
		globalIsTrue: ["MAGNETS_PLACED","CARDBOARD_PLACED"]
	})
	doorClickTarget.addAction({
		action: "interact",
		target: "magnets",
		setGlobals: ["MAGNETS_PLACED"],
		continue: true
	})
	doorClickTarget.addAction({
		action: "interact",
		target: "cardboard",
		setGlobals: ["CARDBOARD_PLACED"],
		globalIsTrue: ["MAGNETS_PLACED"]
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene7.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene7();
