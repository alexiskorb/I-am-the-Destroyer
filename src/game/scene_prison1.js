
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var PrisonScene1 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

PrisonScene1.prototype = new Scene();

PrisonScene1.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create forcefield
	this.ffx = -278;
	this.ffy = -88;
	this.forcefieldSprites = [];
	for (var i = 0; i < 4; i++)
	{
		var sprite = ThreeUtils.makeAtlasMesh(atlas, "prison1_ff");
		sprite.position.set(this.ffx, this.ffy, -15);
		this.transform.add(sprite);
		this.forcefieldSprites.push(sprite);
	}

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
	var floor = ThreeUtils.makeAtlasMesh(atlas, "prison1_floor_25");
	this.transform.add(floor);
	floor.scale.set(2*1920/atlas.getSpriteWidth("prison1_floor_25"), 4, 1);
	floor.position.set(0,
		GameEngine.screenHeight/2 - atlas.getSpriteHeight("prison1_floor_25")*2,
		-10);
	floor.z = -10;
	
	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/prophet_conversation.json");
	johnsonSprite.showInfoBox = "test2";

	var johnsonSprite2 = this.createClickableSprite("johnson15_sprite", -300, -300);
	johnsonSprite2.showInfoBox = "keypad";
	var johnsonSprite3 = this.createClickableSprite("johnson15_sprite", -400, -200);
	johnsonSprite3.showInfoBox = "moat";

	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.triggerScene = "prison2";

	Scene.prototype.added.call(this);
}

PrisonScene1.prototype.update = function()
{
	// jitter forcefield
	for (var i = 0; i < this.forcefieldSprites.length; i++)
	{
		this.forcefieldSprites[i].position.set(
			this.ffx + (Math.random()-0.5)*4*i, this.ffy + (Math.random()-0.5)*4*i,
			this.forcefieldSprites[i].position.z);
	}

	this.laserSprite.position.x = (Math.random()-0.5)*2;

	Scene.prototype.update.call(this);
}

module.exports = new PrisonScene1();
