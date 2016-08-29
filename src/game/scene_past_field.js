
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var FieldScene = function()
{
	this.backgroundUrl = "media/landscape.png";

	Scene.call(this);
}

FieldScene.prototype = new Scene();

FieldScene.prototype.added = function()
{
	// create characters
	var investor = this.createClickableSprite("suit_sprite", 50, 0);
	investor.addAction({
		action: "triggerConversation",
		target: require("../data/investor_conversation.json")
	})
	var damGuy = this.createClickableSprite("builder_guy", -300, 70);
	damGuy.addAction({
		action: "triggerConversation",
		target: require("../data/dam_builder_conversation.json")
	})
	var speakerGuy = this.createClickableSprite("normal_guy_sprite", 600, 150);
	speakerGuy.addAction({
		action: "triggerConversation",
		target: require("../data/prophet_conversation.json")
	})
	speakerGuy.addFalse("BOX_IN_WORMHOLE");

	var cardboard_preacher = this.createClickableSprite("cardboard_preacher", 600, 150);
	cardboard_preacher.addAction({
		action: "showInfoBox",
		target: "prophet",
	})
	cardboard_preacher.addTrue("BOX_IN_WORMHOLE");

	var cardboardBox = this.createClickableSprite("cardboardboxlarge", -430, 200);
	cardboardBox.addAction({
		action: "collectItem",
		target: "cardboard_box"
	})


	var speaker = this.createClickableSprite("speaker", 480, 200);
	speaker.addAction({
		action: "interact",
		target: "hammer",
		setGlobals: ["SPEAKER_BROKEN"],
		addItem: "magnets",
		continue: true
	})
	speaker.addAction({
		action: "showInfoBox",
		target: "speaker",
	})
	speaker.addFalse("SPEAKER_BROKEN");
	speaker.addTrue("BOX_IN_WORMHOLE");

	this.playerSprite = this.createClickableSprite("heaven_player", -800, 40);
	this.playerSprite.addAction({
		action: "showInfoBox",
		target: "shadow",
	});

	Scene.prototype.added.call(this);
}

FieldScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new FieldScene();
