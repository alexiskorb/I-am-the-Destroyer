
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a portcullis

var PrisonScene8 = function()
{
	this.backgroundUrl = "media/doorframe.png";

	PrisonScene.call(this);
}

PrisonScene8.prototype = new PrisonScene();

PrisonScene8.prototype.added = function()
{
	this.ffx = -650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal8",
	})

	// create door
	var doorClickTarget = this.createClickableSprite("portcullis", 0, 0); 
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "portcullis",
		continue: true
	})
	doorClickTarget.addAction({
		action: "win",
		globalIsTrue: "GRAVITY_LIGHTER",
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene8.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene8();
