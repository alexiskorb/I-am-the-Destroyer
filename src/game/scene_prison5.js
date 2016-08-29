
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
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "guard",
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
	var guardAndTiger = this.createClickableSprite("guardandtiger",600,50);
	guardAndTiger.addTrue("CARNIVAL");
	guardAndTiger.addFalse("ANIMAL_REST");
}

PrisonScene5.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene5();
