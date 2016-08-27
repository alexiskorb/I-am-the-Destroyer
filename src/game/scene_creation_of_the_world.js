
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var CreationOfTheWorldScene = function()
{
	
}

CreationOfTheWorldScene.prototype = new Scene();

CreationOfTheWorldScene.prototype.added = function()
{
	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", 100, 100);
	johnsonSprite.triggerConversation = require("../data/sample_conversation.json");

	// create lamp
	var lampSprite = this.createClickableSprite("lamp", 200, 200);
	lampSprite.collectItem = "lamp";
}

module.exports = new CreationOfTheWorldScene();
