
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
	this.johnson15 = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "johnson15_sprite");
	this.transform.add(this.johnson15);
	this.johnson15.position.set(100, 100, -20);

	var johnsonClickTarget = this.createClickTarget(this.johnson15);
	johnsonClickTarget.triggerConversation = require("../data/sample_conversation.json");

	// create door
	this.door = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "door");
	this.transform.add(this.door);
	this.door.position.set(300, 100, -20);

	var doorClickTarget = this.createClickTarget(this.door);
	doorClickTarget.triggerScene = "creationOfTheWorld";
}

module.exports = new IndexScene();
