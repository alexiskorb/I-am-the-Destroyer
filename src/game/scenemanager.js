
Input = require("../sdk/input");
Conversation = require("./conversation.js");

var SceneManager =
{
	/**
	 * List of all possible scenes in the game.
	 */
	scenes:
	{
		index: require("./index_scene.js"),
	},

	currentScene: undefined,
	lastHoveredTarget: undefined,
}

module.exports = SceneManager;

SceneManager.added = function()
{
	// initialize all scenes
	for (var key in this.scenes)
	{
		this.scenes[key].added();
	}

	this.changeScene("index");
}

SceneManager.update = function()
{
	if (!Conversation.isConversationActive())
	{
		var clickTarget = this.currentScene.getClickTarget(GameEngine.mousePosWorld);
		if (clickTarget)
		{
			if (Input.Mouse.buttonPressed(Input.Mouse.LEFT))
			{
				clickTarget.trigger();
			}
			this.lastHoveredTarget = clickTarget;
		}
	}
}

/**
 * Changes the scene the one with the specified key.
 * @param {String} key
 */
SceneManager.changeScene = function(key)
{
	if (this.currentScene)
	{
		this.currentScene.hide();
	}
	this.currentScene = this.scenes[key];
	this.currentScene.show();
}
