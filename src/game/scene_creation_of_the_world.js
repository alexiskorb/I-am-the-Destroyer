
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var CreationOfTheWorldScene = function()
{
	this.backgroundUrl = "media/heaven_sky_gradient.png";

	Scene.call(this);
}

CreationOfTheWorldScene.prototype = new Scene();

CreationOfTheWorldScene.prototype.added = function()
{
	var heavenAtlas = ThreeUtils.loadAtlas("heaven");

	// create rotating clouds (L)
	var cloudRingTex = ThreeUtils.loadTexture("media/heaven_cloud_wheel.png");
	var cloudRingGeo = ThreeUtils.makeSpriteGeo(1924, 1942);
	this.cloudRingL = ThreeUtils.makeSpriteMesh(cloudRingTex, cloudRingGeo);
	this.transform.add(this.cloudRingL);
	this.cloudRingL.position.set(1173, GameEngine.screenHeight/2-111, -19);

	// (R)
	var cloudRingTex = ThreeUtils.loadTexture("media/heaven_cloud_wheel.png");
	var cloudRingGeo = ThreeUtils.makeSpriteGeo(1924, 1942);
	this.cloudRingR = ThreeUtils.makeSpriteMesh(cloudRingTex, cloudRingGeo);
	this.transform.add(this.cloudRingR);
	this.cloudRingR.position.set(-1173, GameEngine.screenHeight/2-111, -19);

	// create scrolling clouds
	this.cloudScrollTex = ThreeUtils.loadTexture("media/heaven_fore_clouds.png");
	var cloudScrollGeo = ThreeUtils.makeSpriteGeo(3626, 324);
	this.cloudScrollTex.wrapS = THREE.RepeatWrapping;
	this.cloudScroll = ThreeUtils.makeSpriteMesh(this.cloudScrollTex, cloudScrollGeo);
	this.transform.add(this.cloudScroll);
	this.cloudScroll.position.set(0, GameEngine.screenHeight/2-324/2, -9);

	// create glow
	this.glowSprite = ThreeUtils.makeAtlasMesh(heavenAtlas, "heaven_back_glow_25");
	this.glowSprite.position.set(
		0, GameEngine.screenHeight/2 - heavenAtlas.getSpriteHeight("heaven_back_glow_25")*2, -18);
	this.glowSprite.scale.set(GameEngine.screenWidth, 4, 1);
	this.transform.add(this.glowSprite);

	// create pedestal
	this.pedestalSprite = ThreeUtils.makeAtlasMesh(heavenAtlas, "heaven_platform");
	this.pedestalSprite.position.set(
		0,
		GameEngine.screenHeight/2 - heavenAtlas.getSpriteHeight("heaven_platform")/2,
		-15);
	this.transform.add(this.pedestalSprite);

	// create johnson
	this.johnsonYPos = GameEngine.screenHeight/2 - 488;
	this.angelBob = 0;
	this.johnsonSprite = this.createClickableSprite("heaven_angel",
		314,
		this.johnsonYPos);
	this.johnsonSprite.addAction({
		action: "triggerConversation",
		target: require("../data/angel_conversation.json") 
	})

	// create player
	this.playerSprite = this.createClickableSprite("heaven_player", -314, GameEngine.screenHeight/2-390);
	this.playerSprite.addAction({
		action: "showInfoBox",
		target: "shadow",
	});
	
	this.wormhole = this.createClickableSprite("wormhole", 0, 0);
	this.wormhole.addTrue("WORMHOLE_ACTIVATED");
	this.wormhole.addAction ({
		action: "interact",
		target: "cardboard_box",
		setGlobals: ["BOX_IN_WORMHOLE"]
	});

	Scene.prototype.added.call(this);
}

CreationOfTheWorldScene.prototype.update = function()
{
	this.angelBob += bmacSdk.deltaSec / 4;
	this.johnsonSprite.mesh.position.y = this.johnsonYPos + Math.cos(this.angelBob * Math.PI * 2) * 10;

	this.cloudRingR.rotation.z += bmacSdk.deltaSec * 0.04;
	this.cloudRingL.rotation.z -= bmacSdk.deltaSec * 0.04;

	this.cloudScrollTex.offset.set(this.cloudScrollTex.offset.x + bmacSdk.deltaSec * 0.02, 0);

	Scene.prototype.update.call(this);
}

module.exports = new CreationOfTheWorldScene();
