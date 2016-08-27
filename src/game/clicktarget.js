
THREE = require("three");
Conversation = require("./conversation.js");

var ClickTarget = function(mesh)
{
	this.mesh = mesh;
	this.bounds = new THREE.Box3();
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
	if (this.triggerConversation)
	{
		Conversation.startConversation(this.triggerConversation);
	}
}
