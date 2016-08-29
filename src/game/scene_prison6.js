
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
	/*
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison7",
		globalIsTrue: "CARDBOARD_WALL",
		addItem: "cardboard"
	})*/

	PrisonScene.prototype.added.call(this);
}

PrisonScene6.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene6();
