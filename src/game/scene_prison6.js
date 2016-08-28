
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var PrisonScene6 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

PrisonScene6.prototype = new Scene();

PrisonScene6.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.triggerScene = "prison7";

	Scene.prototype.added.call(this);
}

PrisonScene6.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new PrisonScene6();
