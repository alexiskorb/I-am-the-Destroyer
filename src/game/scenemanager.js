
Input = require("../sdk/input");
Conversation = require("./conversation.js");
InfoBox = require("./infobox.js");

var SceneManager =
{
	/**
	 * List of all possible scenes in the game.
	 */
	scenes:
	{
		index: require("./scene_index.js"),
		creationOfTheWorld: require("./scene_creation_of_the_world.js"),
	},

	currentScene: undefined,
	lastHoveredTarget: undefined,

	animation: undefined,
}

SceneManager.ANIM_NONE = 0;
SceneManager.ANIM_TIMETRAVEL = 1;
SceneManager.ANIM_FORWARD = 2;

module.exports = SceneManager;

SceneManager.added = function()
{
	// initialize all scenes
	for (var key in this.scenes)
	{
		this.scenes[key].added();
	}

	this.finallyChangeScene("index");
	this.currentScene.show();
}

SceneManager.update = function()
{
	if (!Conversation.isConversationActive() && !this.animation)
	{
		var clickTarget = this.currentScene.getClickTarget(GameEngine.mousePosWorld);
		if (clickTarget)
		{
			if (Input.Mouse.buttonPressed(Input.Mouse.LEFT))
			{
				clickTarget.trigger();
			}
		}
	}

	if (clickTarget != this.lastHoveredTarget)
	{
		if (clickTarget) clickTarget.hover();
		if (this.lastHoveredTarget) this.lastHoveredTarget.unhover();
	}

	this.lastHoveredTarget = clickTarget;

	// update animation
	if (this.animation)
	{
		this.animationTimer += bmacSdk.deltaSec;
		if (this.animationTimer >= this.animationDuration)
		{
			this.animationTimer = this.animationDuration;
			this.animation = undefined;
			this.finallyChangeScene(this.changingToScene);
		}

		var animProgress = this.animationTimer / this.animationDuration;

		// ease in
		animProgress = animProgress * animProgress * animProgress;

		switch (this.animation)
		{
			case SceneManager.ANIM_FORWARD:
			// scale up and fade out
			this.currentScene.transform.scale.set(1 + animProgress * 1.5, 1 + animProgress * 1.5, 1);
			this.currentScene.setAlpha(1 - (animProgress * animProgress));
			break;
		}
	}

	if (Input.Mouse.buttonPressed(Input.Mouse.LEFT))
	{
		var clickTarget = this.currentScene.getClickTarget(GameEngine.mousePosWorld);
		if (!(clickTarget && clickTarget.showInfoBox)) 
		{
			InfoBox.hide();
		}
	}

	this.currentScene.update();
}

/**
 * Changes the scene the one with the specified key.
 * @param {String} key
 */
SceneManager.changeScene = function(key, animType)
{
	if (!this.scenes[key])
	{
		console.error("No scene found with key '" + key + "'.");
		return;
	}

	var targetScene = this.scenes[key];
	targetScene.show();
	targetScene.transform.position.z = -25;
	this.changingToScene = key;
	
	this.animation = animType;
	this.animationTimer = 0;
	switch (animType)
	{
		case SceneManager.ANIM_NONE:
		this.animationDuration = 0;
		break;
		case SceneManager.ANIM_FORWARD:
		this.animationDuration = 2;
		break;
		case SceneManager.ANIM_TIMETRAVEL:
		this.animationDuration = 0;
		break;
	}
}

SceneManager.finallyChangeScene = function(key)
{
	if (this.currentScene)
	{
		this.currentScene.hide();
	}
	this.currentScene = this.scenes[key];
	this.currentScene.transform.position.z = 0;
}
