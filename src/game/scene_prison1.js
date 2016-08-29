
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you have to get past lasers and forcefields

var PrisonScene1 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

PrisonScene1.prototype = new PrisonScene();

PrisonScene1.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create forcefield
	this.ffx = -278;
	this.ffy = -88;
	this.forcefieldSprites = [];
	for (var i = 0; i < 3; i++)
	{
		var sprite = ThreeUtils.makeAtlasMesh(atlas, "prison1_ff");
		sprite.position.set(this.ffx, this.ffy, -15);
		this.transform.add(sprite);
		this.forcefieldSprites.push(sprite);
	}

	// create crystal
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal"
	})
	this.crystalBob = 0;

	// create lasers
	var laserTexture = ThreeUtils.loadTexture("media/prison1_lasers.png");
	var laserGeo = ThreeUtils.makeSpriteGeo(1920, 1080);
	this.laserSprite = ThreeUtils.makeSpriteMesh(laserTexture, laserGeo);
	this.transform.add(this.laserSprite);
	this.laserSprite.position.z = -15;

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

	// create door
	var doorClickTarget = this.createClickableRegion(GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "laser_force_exit",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison2",
		globalIsTrue: ["NO_FUTURE_TECH", "LASERS_DONT_HURT"]
	})

	PrisonScene.prototype.added.call(this);
}

PrisonScene1.prototype.update = function()
{
	// jitter forcefield
	for (var i = 0; i < this.forcefieldSprites.length; i++)
	{
		this.forcefieldSprites[i].position.set(
			this.ffx + (Math.random()-0.5)*4*i, this.ffy + (Math.random()-0.5)*4*i,
			this.forcefieldSprites[i].position.z);
		this.forcefieldSprites[i].visible = !GlobalVariables.getVariable("NO_FUTURE_TECH");
	}

	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;

	this.laserSprite.position.x = (Math.random()-0.5)*2;

	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene1();
