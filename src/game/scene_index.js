
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
<<<<<<< HEAD
	this.johnson15 = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "johnson15_sprite");
	this.transform.add(this.johnson15);
	this.johnson15.position.set(100, 100, -20);

	var johnsonClickTarget = this.createClickTarget(this.johnson15);
	johnsonClickTarget.triggerConversation = require("../data/johnson_xv_conversation.json");
=======
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/sample_conversation.json");
>>>>>>> 4247b3e97f410967b5a1c193c22f9ade07414091

	// create door
	var doorClickTarget = this.createClickableSprite("door", 0, 0);
	doorClickTarget.triggerScene = "creationOfTheWorld";

	Scene.prototype.added.call(this);
}

module.exports = new IndexScene();
