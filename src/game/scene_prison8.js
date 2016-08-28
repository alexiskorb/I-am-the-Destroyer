
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var PrisonScene8 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

PrisonScene8.prototype = new Scene();

PrisonScene8.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	Scene.prototype.added.call(this);
}

PrisonScene8.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new PrisonScene8();
