
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a guard

var PrisonScene5 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene5.prototype = new PrisonScene();

PrisonScene5.prototype.added = function()
{
	this.ffx = -650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal5"
	})

	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "guardDoor",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison6",
		globalIsTrue: ["ANIMAL_REST", "CARNIVAL"]
	})

	PrisonScene.prototype.added.call(this);

	var guard = this.createClickableSprite("guard",300,50);
	guard.addFalse("CARNIVAL");
	guard.addFalse("ANIMAL_REST");
	guard.addAction({
		action: "showInfoBox",
		target: "guard",
		continue: true
	})

	var guardAndTiger = this.createClickableSprite("guardandtiger",600,50);
	guardAndTiger.addTrue("CARNIVAL");
	guardAndTiger.addFalse("ANIMAL_REST");
	guardAndTiger.addAction({
		action: "showInfoBox",
		target: "guard",
		continue: true
	})
}

PrisonScene5.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene5();
