
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
	
	this.ffx = -650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal4",
	})

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

	var labyrinth_sign = this.createClickableSprite("labyrinth_sign", 350, -200);

	PrisonScene.prototype.added.call(this);
	
	var puddle = this.createClickableSprite("puddle", 600, 470);
	puddle.addFalse("DAM_BUILT");
	puddle.addAction({
		action: "showInfoBox",
		target: "puddle"
	})
}

PrisonScene4.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene4();
