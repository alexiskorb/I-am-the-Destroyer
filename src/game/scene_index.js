
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you don't really do that much

var IndexScene = function()
{
	this.backgroundUrl = "media/black.png";

	Scene.call(this);
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");

	this.crystalBob = 0;

	// create crystal
	this.crystal = this.createClickableSprite("crystal", 0, 0);
	this.crystal.addAction({
		action: "triggerScene",
		target: "prison1"
	})

	// create glow
	var glowTex = ThreeUtils.loadTexture("media/crystal_bg.png");
	var glowGeo = ThreeUtils.makeSpriteGeo(1814,1080);
	this.glowMesh = ThreeUtils.makeSpriteMesh(glowTex, glowGeo);
	this.transform.add(this.glowMesh);
	this.glowMesh.position.z = -15;
	this.otherMeshes.push(this.glowMesh);

	Scene.prototype.added.call(this);
}

IndexScene.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;

	this.glowMesh.position.y = Math.cos(this.crystalBob) * 30 - 15;
	this.crystal.mesh.position.y = this.glowMesh.position.y - 60;

	Scene.prototype.update.call(this);
}

module.exports = new IndexScene();
