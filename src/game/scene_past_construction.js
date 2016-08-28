
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var ConstructionScene = function()
{
	this.backgroundUrl = "media/heaven_sky_gradient.png";

	Scene.call(this);
}

ConstructionScene.prototype = new Scene();

ConstructionScene.prototype.added = function()
{
	Scene.prototype.added.call(this);
}

ConstructionScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new ConstructionScene();
