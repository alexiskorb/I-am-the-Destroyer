
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");
Input = require("../sdk/input");

var TimeDeviceScene = function()
{
	this.backgroundUrl = undefined;

	this.wantsUp = false;
	this.isAtWant = true;
	this.animationTimer = 0;
	this.animationDuration = 0.5;

	Scene.call(this);
}

TimeDeviceScene.prototype = new Scene();

TimeDeviceScene.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("general");
	
	// create device base
	this.deviceBase = this.createClickableSprite("timedevice", 0, 0);
	this.deviceBase.addAction({
		action: "triggerTimeDevice"
	})
	this.deviceBase.mesh.position.z = -15;
	this.deviceBase.enabled = false;

	// create sticky note
	this.stickyNote = ThreeUtils.makeAtlasMesh(atlas, "timedevice_sticky");
	this.transform.add(this.stickyNote);
	this.stickyNote.position.set(79, 200, -10);
	
	// create buttons
	this.buttons = [];

	var button1 = this.createClickableSprite("timedevice_button1", -169, -90);
	button1.addAction({
		action: "triggerScene",
		target: "creationOfTheWorld"
	})

	var button2 = this.createClickableSprite("timedevice_button2", -75, -145);
	button2.addAction({
		action: "triggerScene",
		target: "field"
	})

	var button3 = this.createClickableSprite("timedevice_button3", 66, -145);
	button3.addAction({
		action: "triggerScene",
		target: "construction"
	})

	var button4 = this.createClickableSprite("timedevice_button4", 173, -90);
	button4.addAction({
		action: "triggerScene",
		target: "LAST_PRISON"
	})

	this.buttons.push(button1);
	this.buttons.push(button2);
	this.buttons.push(button3);
	this.buttons.push(button4);

	Scene.prototype.added.call(this);

	this.offYPos = GameEngine.screenHeight + 100;
	this.transform.position.y = this.offYPos;

	this.tweenOff();
}

TimeDeviceScene.prototype.update = function()
{
	// tween off if it's up and I click anything
	if (Input.Mouse.buttonPressed(Input.Mouse.LEFT) && this.wantsUp)
	{
		if (this.eatFrame)
		{
			this.eatFrame = false;
		}
		else
		{
			this.tweenOff();
		}
	}

	// tween on and off
	if (!this.isAtWant)
	{
		this.animationTimer += bmacSdk.deltaSec;
		if (this.animationTimer >= this.animationDuration)
		{
			this.animationTimer = this.animationDuration;
			this.isAtWant = true;
		}

		var animProgress = this.animationTimer / this.animationDuration;
		animProgress *= animProgress;

		// tween position
		var halfHeight = GameEngine.screenHeight / 2;
		if (this.wantsUp)
		{
			this.transform.position.y = this.offYPos + (halfHeight - this.offYPos) * animProgress;
		}
		else
		{
			this.transform.position.y = halfHeight + (this.offYPos - halfHeight) * animProgress;
		} 
	}

	Scene.prototype.update.call(this);
}

TimeDeviceScene.prototype.notifyChangedScene = function()
{
	this.stickyNote.visible = false;

	Scene.prototype.notifyChangedScene.call(this);
}

TimeDeviceScene.prototype.tweenOff = function()
{
	if (this.wantsUp)
	{
		this.isAtWant = false;
		this.wantsUp = false;
		this.animationTimer = 0;
		this.eatFrame = true;
	}

	for (var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].enabled = false;
	}
	this.deviceBase.enabled = true;
}

TimeDeviceScene.prototype.tweenOn = function()
{
	if (!this.wantsUp)
	{
		this.isAtWant = false;
		this.wantsUp = true;
		this.animationTimer = 0;
		this.eatFrame = true;
	}

	for (var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].enabled = true;
	}
	this.deviceBase.enabled = false;
}

module.exports = new TimeDeviceScene();
