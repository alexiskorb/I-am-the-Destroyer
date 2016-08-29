
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
	var investor = this.createClickableSprite("suit_sprite", 100, 0);
	investor.addAction({
		action: "triggerConversation",
		target: require("../data/investor_conversation.json")
	})
	var damGuy = this.createClickableSprite("builder_guy", -300, 0);
	damGuy.addAction({
		action: "triggerConversation",
		target: require("../data/dam_builder_conversation.json")
	})
	var speakerGuy = this.createClickableSprite("normal_guy_sprite", 600, 150);
	speakerGuy.addAction({
		action: "triggerConversation",
		target: require("../data/prophet_conversation.json")
	})
	var cardboardBox = this.createClickableSprite("cardboardbox", 200, 200);
	cardboardBox.addAction({
		action: "collectItem",
		target: "cardboard_box"
	})
	var hammer = this.createClickableSprite("hammer", 400, -200);
	hammer.addAction({
		action: "collectItem",
		target: "hammer"
	})
	var speaker = this.createClickableSprite("speaker", 300, -200);
	speaker.addAction({
		action: "interact",
		target: "hammer",
		setGlobals: ["SPEAKER_BROKEN"],
		addItem: "magnets"
	})
	speaker.addFalse("SPEAKER_BROKEN");


	Scene.prototype.added.call(this);
}

FieldScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new FieldScene();
