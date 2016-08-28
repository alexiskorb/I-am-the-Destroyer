
THREE = require("three");
Conversation = require("./conversation.js");
//SceneManager = require("./scenemanager.js");

var ClickTarget = function(mesh)
{
	this.enabled = true;
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

ClickTarget.ANIM_PICKUP = 1;

module.exports = ClickTarget;

ClickTarget.prototype.update = function()
{
	if (this.animation)
	{
		this.animationTimer += bmacSdk.deltaSec;
		if (this.animationTimer > this.animationDuration)
		{
			this.animationTimer = this.animationDuration;
			this.animation = undefined;
			this.permanentlyDisable();
			this.triggerPostAnimation();
		}

		var animProgress = this.animationTimer / this.animationDuration;

		// ease in
		animProgress = animProgress * animProgress * animProgress;

		switch (this.animation)
		{
			case ClickTarget.ANIM_PICKUP:
			// tween to bottom-center of screen while scaling up a bit
			this.mesh.position.set(
				this.animationStartPos.x + (0 - this.animationStartPos.x) * animProgress,
				this.animationStartPos.y + (GameEngine.screenHeight / 2 - this.animationStartPos.y) * animProgress,
				this.mesh.position.z);
			this.mesh.scale.set(1 + animProgress * 4, 1 + animProgress * 4, 1);
			break;
		}
	}
}

ClickTarget.prototype.isPointInBounds = function(point)
{
	if (!this.enabled) return false;
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

ClickTarget.prototype.hover = function()
{
	if (!this.hoverMesh)
	{
		this.hoverMesh = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "grad_circle");
		this.hoverMesh.material.opacity = 0.4;
		GameEngine.scene.add(this.hoverMesh);
	}
	this.getBoundingBox();
	this.hoverMesh.position.set(
		this.mesh.position.x + GameEngine.screenWidth/2,
		this.mesh.position.y + GameEngine.screenHeight/2, this.mesh.position.z - 1);
	this.bounds.size(this.hoverMesh.scale);
	this.hoverMesh.scale.x /= 32;
	this.hoverMesh.scale.y /= 32;
	this.hoverMesh.scale.z = 1;
	this.hoverMesh.visible = true;
}

ClickTarget.prototype.unhover = function()
{
	if (this.hoverMesh)
	{
		this.hoverMesh.visible = false;
	}
}

ClickTarget.prototype.enable = function()
{
	if (!this.permanentlyDisabled)
	{
		this.enabled = true;
		this.mesh.visible = true;
	}
}

ClickTarget.prototype.disable = function()
{
	this.enabled = false;
	this.mesh.visible = false;
}

ClickTarget.prototype.permanentlyDisable = function()
{
	this.permanentlyDisabled = true;
	this.disable();
}

ClickTarget.prototype.playPickupTween = function()
{
	this.animation = ClickTarget.ANIM_PICKUP;
	this.animationDuration = 0.45;
	this.animationTimer = 0;
	this.animationStartPos = new THREE.Vector2().copy(this.mesh.position);
}

ClickTarget.prototype.trigger = function()
{
	if (this.collectItem)
	{
		this.playPickupTween();
	}
	if (this.triggerConversation)
	{
		Conversation.startConversation(this.triggerConversation);
	}
	else if (this.triggerScene)
	{
		SceneManager.changeScene(this.triggerScene, SceneManager.ANIM_FORWARD);
	}
}

ClickTarget.prototype.triggerPostAnimation = function()
{
	if (this.collectItem)
	{
		Inventory.addItem(Inventory.items[this.collectItem]);
	}
}
