
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a solid wall

var PrisonScene6 = function()
{
	this.backgroundUrl = "media/doorframe.png";

	PrisonScene.call(this);
}

PrisonScene6.prototype = new PrisonScene();

PrisonScene6.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	this.ffx = -650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;

	// create door
	var steelWall = this.createClickableSprite("steelwall",0,0);
	steelWall.addAction({
		action: "showInfoBox",
		target: "wall",
		continue: true
	})
	steelWall.addFalse("BRICK_WALL");
	var brickWall = this.createClickableSprite("brickwall",0,0);
	brickWall.addAction({
		action: "showInfoBox",
		target: "wall",
		continue: true
	})
	brickWall.addFalse("WOOD_WALL");
	brickWall.addTrue("BRICK_WALL");
	var woodWall = this.createClickableSprite("woodwall",0,0);
	woodWall.addAction({
		action: "showInfoBox",
		target: "wall",
		continue: true
	})
	woodWall.addFalse("CARDBOARD_WALL");
	woodWall.addTrue("WOOD_WALL");
	var cardboardWall = this.createClickableSprite("cardboardWall",0,0);
	cardboardWall.addAction({
		action: "showInfoBox",
		target: "wall",
		continue: true
	})
	cardboardWall.addAction({
		action: "miscellaneous",
		addItem: "cardboard",
		setGlobals: ["CARDBOARD_WALL_BROKEN"],
		continue: true
	})
	cardboardWall.addTrue("CARDBOARD_WALL");
	cardboardWall.addFalse("CARDBOARD_WALL_BROKEN");
	var cardboardWallBroken = this.createClickableSprite("cardboardWallBroken",0,0);
	cardboardWallBroken.addAction({
		action: "triggerScene",
		target: "prison7",
		globalIsTrue: "CARDBOARD_WALL_BROKEN",
	})
	cardboardWallBroken.addTrue("CARDBOARD_WALL_BROKEN");


	PrisonScene.prototype.added.call(this);
}

PrisonScene6.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene6();
