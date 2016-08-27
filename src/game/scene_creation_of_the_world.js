
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
	this.johnson15 = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "johnson15_sprite");
	this.transform.add(this.johnson15);
	this.johnson15.position.set(100, 100, -20);

	var johnsonClickTarget = this.createClickTarget(this.johnson15);
	johnsonClickTarget.triggerConversation = require("../data/sample_conversation.json");
}

module.exports = new CreationOfTheWorldScene();
