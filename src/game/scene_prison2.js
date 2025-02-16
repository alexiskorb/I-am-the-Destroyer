
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
	this.ffx = -650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal2",
	});

	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "moatDoor",
		continue: true,
	});
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison3",
		globalIsTrue: "FOOD_FOR_ANIMALS"
	});
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison3",
		globalIsTrue: "DAM_BUILT"
	});

	var moat_hungry = this.createClickableSprite("moat_hungry", 0, 300);
	moat_hungry.addFalse("FOOD_FOR_ANIMALS");
	moat_hungry.addFalse("DAM_BUILT");
	moat_hungry.addAction({
		action: "showInfoBox",
		target: "moat"
	});

	var moat_full = this.createClickableSprite("moat_full", 0, 300);
	moat_full.addTrue("FOOD_FOR_ANIMALS");
	moat_full.addFalse("DAM_BUILT");
	moat_full.addAction({
		action: "showInfoBox",
		target: "moat"
	});

	var empty_moat= this.createClickableRegion(0, 300, GameEngine.screenWidth, 250);
	empty_moat.addAction({
		action: "showInfoBox",
		target: "moat"
	});
	empty_moat.addTrue("DAM_BUILT");
	empty_moat.addFalse("FOOD_FOR_ANIMALS");

	PrisonScene.prototype.added.call(this);
}

PrisonScene2.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene2();
