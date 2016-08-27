
THREE = require("three");
Conversation = require("./conversation.js");
//SceneManager = require("./scenemanager.js");

var ClickTarget = function(mesh)
{
	this.mesh = mesh;
	this.bounds = new THREE.Box3();

	// set this to a block of convo data (using require) to make this
	// target start a conversation
	this.triggerConversation = undefined;

	// set to a scene key to make this target trigger a scene transition
	this.triggerScene = undefined;

	// set to an item key to make this target collect an item and then
	// disable itself
	this.collectItem = undefined;
}

module.exports = ClickTarget;

ClickTarget.prototype.isPointInBounds = function(point)
{
	var point = new THREE.Vector3(point.x, point.y, 0);
	this.getBoundingBox();
	point.z = (this.bounds.min.z + this.bounds.max.z) / 2;
	return this.bounds.containsPoint(point);
}

ClickTarget.prototype.getBoundingBox = function()
{
	this.bounds.setFromObject(this.mesh);
	return this.bounds;
}

ClickTarget.prototype.trigger = function()
{
	if (this.collectItem)
	{
		//TODO: give item to player and disable me
	}
	if (this.triggerConversation)
	{
		Conversation.startConversation(this.triggerConversation);
	}
	else if (this.triggerScene)
	{
		SceneManager.changeScene(this.triggerScene);
	}
}
