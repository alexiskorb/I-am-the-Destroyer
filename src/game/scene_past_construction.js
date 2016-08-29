
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var ConstructionScene = function()
{
	this.backgroundUrl = "media/construction.png";

	Scene.call(this);
}

ConstructionScene.prototype = new Scene();

ConstructionScene.prototype.added = function()
{
	// create characters
	var doorGuy = this.createClickableSprite("builder_guy", 200, 200);
	doorGuy.addAction({
		action: "triggerConversation",
		target: require("../data/johnson_xv_conversation.json")
	})
	var humaneGuy = this.createClickableSprite("normal_guy_sprite", -500, 300);
	humaneGuy.addAction({
		action: "triggerConversation",
		target: require("../data/humane_society_conversation.json")
	})
	var futureTechGuy = this.createClickableSprite("suit_sprite", -100, 100);
	futureTechGuy.addAction({
		action: "triggerConversation",
		target: require("../data/future_tech_conversation.json")
	})

	Scene.prototype.added.call(this);
}

ConstructionScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new ConstructionScene();
