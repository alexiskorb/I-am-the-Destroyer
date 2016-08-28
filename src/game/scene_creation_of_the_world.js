
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var CreationOfTheWorldScene = function()
{
	this.backgroundUrl = "media/room_empty.png";

	Scene.call(this);
}

CreationOfTheWorldScene.prototype = new Scene();

CreationOfTheWorldScene.prototype.added = function()
{
	// create sky

	// create rotating clouds

	// create scrolling clouds

	// create pedastal

	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/sample_conversation.json");

	// create player
	
	Scene.prototype.added.call(this);
}

module.exports = new CreationOfTheWorldScene();
