
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you don't really do that much

var IndexScene = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.triggerScene = "prison1";

	Scene.prototype.added.call(this);
}
IndexScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new IndexScene();
