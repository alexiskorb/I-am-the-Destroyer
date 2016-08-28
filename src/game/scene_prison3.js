
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a keypad door

var PrisonScene3 = function()
{
	this.backgroundUrl = "media/doorframe.png";

	PrisonScene.call(this);
}

PrisonScene3.prototype = new PrisonScene();

PrisonScene3.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableSprite("keydoor", 0, 0);
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison4",
		//TODO: check lamp is plugged in
		globalIsFalse: "DAM_BUILT"
	})
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "doorHasDamPower",
		globalIsTrue: "DAM_BUILT"
	})
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "doorHasNoDamPower",
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene3.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene3();
