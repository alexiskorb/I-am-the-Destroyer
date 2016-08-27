
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

	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/future_tech_conversation.json");
=======
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/angel_conversation.json");
>>>>>>> 9dc4292f9cbc123efb1115645ce5db4edc6cd93c

	// create door
	var doorClickTarget = this.createClickableSprite("door", 0, 0);
	doorClickTarget.triggerScene = "creationOfTheWorld";

	Scene.prototype.added.call(this);
}

module.exports = new IndexScene();
