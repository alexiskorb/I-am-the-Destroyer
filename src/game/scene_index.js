
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var IndexScene = function()
{
	
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", 100, 100);
	johnsonSprite.triggerConversation = require("../data/sample_conversation.json");

	// create door
	var doorClickTarget = this.createClickableSprite("door", 300, 100);
	doorClickTarget.triggerScene = "creationOfTheWorld";
}

module.exports = new IndexScene();
