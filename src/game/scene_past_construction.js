
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var ConstructionScene = function()
{
	this.musicUrl = "media/ngxmusicalngx+thegodsofthestars.mp3";
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
	var tech_table = this.createClickableSprite("tech_table", -100, 100);
	tech_table.addFalse("NO_FUTURE_TECH");
	var balloon = this.createClickableSprite("balloonLarge", -40, -20);
	balloon.addTrue("CARNIVAL");
	balloon.addFalse("GAINED_BALLOON")
	var hammer = this.createClickableSprite("hammer", 300, 320);
	hammer.addAction({
		action: "collectItem",
		target: "hammer"
	})
	hammer.addFalse("HAS_COLLECTED_HAMMER");
	this.playerSprite = this.createClickableSprite("heaven_player", -800, 40);
	this.playerSprite.addAction({
		action: "showInfoBox",
		target: "shadow",
	});


	Scene.prototype.added.call(this);
}

ConstructionScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new ConstructionScene();
