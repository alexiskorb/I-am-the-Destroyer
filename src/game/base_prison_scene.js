
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you have to get past lasers and forcefields

var PrisonScene = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

PrisonScene.prototype = new Scene();

PrisonScene.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");

	// create top shadow
	var topShadow = ThreeUtils.makeAtlasMesh(atlas, "prison1_topshadow");
	this.transform.add(topShadow);
	topShadow.scale.set(
		1920/atlas.getSpriteWidth("prison1_topshadow"),
		1080/atlas.getSpriteHeight("prison1_topshadow"),
		1);
	topShadow.position.z = -10;

	// create floor
	var floor = ThreeUtils.makeAtlasMesh(atlas, "prison1_floor");
	this.transform.add(floor);
	floor.scale.set(2*1920/atlas.getSpriteWidth("prison1_floor"), 1, 1);
	floor.position.set(0,
		GameEngine.screenHeight/2 - atlas.getSpriteHeight("prison1_floor")/2,
		-10);
	floor.z = -10;

	Scene.prototype.added.call(this);
}

PrisonScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = PrisonScene;
