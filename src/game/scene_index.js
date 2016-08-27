
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var IndexScene = function()
{
	this.backgroundUrl = "media/room_empty.png";

	Scene.call(this);
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/sample_conversation.json");

	// create door
	var doorClickTarget = this.createClickableSprite("door", 0, 0);
	doorClickTarget.triggerScene = "creationOfTheWorld";

	Scene.prototype.added.call(this);
}

module.exports = new IndexScene();
