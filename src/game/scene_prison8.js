
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a portcullis

var PrisonScene8 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene8.prototype = new PrisonScene();

PrisonScene8.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	PrisonScene.prototype.added.call(this);
}

PrisonScene8.prototype.update = function()
{
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene8();
