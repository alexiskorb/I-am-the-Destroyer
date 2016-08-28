
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var FieldScene = function()
{
	this.backgroundUrl = "media/heaven_sky_gradient.png";

	Scene.call(this);
}

FieldScene.prototype = new Scene();

FieldScene.prototype.added = function()
{
	Scene.prototype.added.call(this);
}

FieldScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new FieldScene();
