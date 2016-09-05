
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");
Input = require("../sdk/input");

var TimeDeviceScene = function()
{
	this.backgroundUrl = undefined;

	this.animationTimer = 0;
	this.animationDuration = 0.5;

	Scene.call(this);
}

TimeDeviceScene.prototype = new Scene();

TimeDeviceScene.prototype.added = function()
{
	// create sticky note
	this.stickyNote = this.createClickableSprite("timedevice_sticky", 79, 200);
	this.stickyNote.mesh.position.z = -10;
	this.stickyNote.addAction({
		action: "miscellaneous",
		setGlobals: ["STICKY_REMOVED"],
		globalIsTrue: "TIMEDEVICE_RAISED"
	})
	this.stickyNote.addFalse("STICKY_REMOVED");
	this.stickyNote.addFalse("YOU_WIN");
	this.stickyNote.addTrue("PASSED_INTRO");
	
	// create buttons
	this.buttons = [];

	var button1 = this.createClickableSprite("timedevice_button1", -169, -90);
	button1.addAction({
		action: "triggerScene",
		target: "creationOfTheWorld",
		globalIsTrue: "TIMEDEVICE_RAISED"
	})
	button1.passThroughIfDisabled = true;
	button1.addFalse("YOU_WIN");
	button1.addTrue("PASSED_INTRO");

	var button2 = this.createClickableSprite("timedevice_button2", -75, -145);
	button2.addAction({
		action: "triggerScene",
		target: "field",
		globalIsTrue: "TIMEDEVICE_RAISED"
	})
	button2.passThroughIfDisabled = true;
	button2.addFalse("YOU_WIN");
	button2.addTrue("PASSED_INTRO");

	var button3 = this.createClickableSprite("timedevice_button3", 66, -145);
	button3.addAction({
		action: "triggerScene",
		target: "construction",
		globalIsTrue: "TIMEDEVICE_RAISED"
	})
	button3.passThroughIfDisabled = true;
	button3.addFalse("YOU_WIN");
	button3.addTrue("PASSED_INTRO");

	var button4 = this.createClickableSprite("timedevice_button4", 173, -90);
	button4.addAction({
		action: "triggerScene",
		target: "LAST_PRISON",
		globalIsTrue: "TIMEDEVICE_RAISED"
	})
	button4.passThroughIfDisabled = true;
	button4.addFalse("YOU_WIN");
	button4.addTrue("PASSED_INTRO");

	this.buttons.push(button1);
	this.buttons.push(button2);
	this.buttons.push(button3);
	this.buttons.push(button4);

	// create device base
	this.deviceBase = this.createClickableSprite("timedevice", 0, 0);
	this.deviceBase.addAction({
		action: "triggerTimeDevice",
		globalIsFalse: "TIMEDEVICE_RAISED"
	})
	this.deviceBase.addFalse("YOU_WIN");
	this.deviceBase.addTrue("PASSED_INTRO");
	this.deviceBase.mesh.position.z = -15;

	Scene.prototype.added.call(this);

	this.TWEEN_TARGET_UP = 3;
	this.TWEEN_TARGET_OFF = 2;
	this.TWEEN_TARGET_REALLYOFF = 1;

	this.onYPos = GameEngine.screenHeight / 2;
	this.offYPos = GameEngine.screenHeight + 100;
	this.reallyOffYPos = GameEngine.screenHeight + 200;

	this.tweenTarget = this.TWEEN_TARGET_REALLYOFF;
	this.tweenStartYPos = this.tweenTargetYPos = this.transform.position.y = this.reallyOffYPos;
}

TimeDeviceScene.prototype.update = function()
{
	// tween off if it's up and I click anything
	if (Input.Mouse.buttonPressed(Input.Mouse.LEFT) && this.tweenTarget == this.TWEEN_TARGET_UP)
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

	// tween "off" if it's "really off" and we pass the intro
	if (this.tweenTarget == this.TWEEN_TARGET_REALLYOFF && GlobalVariables.getVariable("PASSED_INTRO"))
	{
		this.tweenOff();
	}

	// update tween
	if (this.animationTimer < this.animationDuration)
	{
		this.animationTimer += bmacSdk.deltaSec;
		if (this.animationTimer >= this.animationDuration)
		{
			this.animationTimer = this.animationDuration;
		}

		var animProgress = this.animationTimer / this.animationDuration;
		animProgress *= animProgress;

		// tween position
		this.transform.position.y = this.tweenStartYPos + (this.tweenTargetYPos - this.tweenStartYPos) * animProgress;
	}

	Scene.prototype.update.call(this);
}

TimeDeviceScene.prototype.tweenOff = function()
{
	this.tweenTarget = this.TWEEN_TARGET_OFF;
	this.tweenStartYPos = this.transform.position.y;
	this.tweenTargetYPos = this.offYPos;
	GlobalVariables.unsetVariable("TIMEDEVICE_RAISED");
	this.animationTimer = 0;
	this.eatFrame = true;
}

TimeDeviceScene.prototype.tweenOn = function()
{
	this.tweenTarget = this.TWEEN_TARGET_UP;
	this.tweenStartYPos = this.transform.position.y;
	this.tweenTargetYPos = this.onYPos;
	GlobalVariables.setVariable("TIMEDEVICE_RAISED");
	this.animationTimer = 0;
	this.eatFrame = true;
}

module.exports = new TimeDeviceScene();
