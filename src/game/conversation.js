
Input = require("../sdk/input");
ThreeUtils = require("../sdk/threeutils");
GlobalVariables = require("./globalvariables.js");

var Conversation =
{
	/**
	 * Array of allocated HTML elements for dialogue responses.
	 */
	responseElements: [],

	endConversationResponse: {
		text: "Bye."
	},
}

module.exports = Conversation;

Conversation.added = function()
{
	this.parentElement = document.getElementById("conversation");
	this.responsesElement = document.getElementById("conversation_responses");
	this.textElement = document.getElementById("conversation_text");
	this.portraitElement = document.getElementById("conversation_portrait");

	this.hide();
}

Conversation.update = function()
{
	var numberPressed = Input.Keyboard.getNumberPressed();
	if (numberPressed > 0)
	{
		this.selectResponseByIndex(numberPressed - 1);
	}
}

/**
 * Starts playing the specified conversation.
 */
Conversation.startConversation = function(conversationData)
{
	this.show();
	this.activeConversationData = conversationData;

	// determine starting node
	var node0 = this.getNode(0);
	if (node0)
	{
		for (var i = 0; i < node0.responses.length; i++)
		{
			if (this.responsePassesConditionals(node0.responses[i]))
			{
				this.selectResponse(node0.responses[i]);
				this.moveToNode(node0.responses[i].nextNodeId)
				return;
			}
		}
	}

	this.moveToNode(1);
}

Conversation.show = function()
{
	this.parentElement.style.visibility = "visible";
}

/**
 * Ends the current conversation.
 */
Conversation.endConversation = function()
{
	this.hide();
	this.activeConversationData = undefined;
}

Conversation.hide = function()
{
	this.parentElement.style.visibility = "hidden";
	this.portraitElement.className = "conversation_portrait_off";
	this.hideResponsesFrom(0);
}

/**
 * Returns true if any conversation is active.
 * @returns {Boolean}
 */
Conversation.isConversationActive = function()
{
	return !!this.activeConversationData;
}

/**
 * Select a conversation response and move to the appropriate next node.
 */
Conversation.selectResponseByIndex = function(index)
{
	var currentNode = this.getCurrentNode();
	if (index < this.responseElements.length
		&& this.responseElements[index].style.visibility == "visible")
	{
		this.selectResponse(this.responseElements[index].response);
	}
}

/**
 * Select a conversation response and move to the appropriate next node.
 * @param response {Object} The response data.
 */
Conversation.selectResponse = function(response)
{
	if (response)
	{
		if (response.onceOnlyGlobal)
		{
			GlobalVariables.setVariable(response.onceOnlyGlobal);
		}
		if (response.getItem) {
			Inventory.addItem(Inventory.items[response.getItem]);
		}
		if (response.nextNodeId !== undefined)
		{
			this.moveToNode(response.nextNodeId);
		}
		else
		{
			this.endConversation();
		}
	}
	else
	{
		//console.error("selectedResponse: Conversation '" + this.activeConversationData.title
		//	+ "' selected invalid response " + index + " from node " + this.currentNodeId);
	}
}

Conversation.moveToNode = function(index)
{
	var targetNode = this.getNode(index);
	if (targetNode)
	{
		this.currentNodeId = index;

		// set globals
		if (targetNode.setGlobalTrue)
		{
			GlobalVariables.setVariable(targetNode.setGlobalTrue);
		}
		if (targetNode.setGlobalFalse)
		{
			GlobalVariables.unsetVariable(targetNode.setGlobalFalse);
		}

		var currentNode = this.getCurrentNode();
		var currentSpeaker = this.getSpeaker(currentNode.speaker);
		this.textElement.innerHTML = "<b>" + currentSpeaker.displayName + ":</b> " + currentNode.text;

		var speakerAtlas = ThreeUtils.loadAtlas(currentSpeaker.atlas);
		this.portraitElement.className = "conversation_portrait_on";
		ThreeUtils.setElementToAtlasImage(this.portraitElement, speakerAtlas, currentSpeaker.sprites[0]);

		var i = 0;
		if (currentNode.responses)
		{
			for (var r = 0; r < currentNode.responses.length; r++)
			{
				if (this.responsePassesConditionals(currentNode.responses[r]))
				{
					this.displayResponse(i++, currentNode.responses[r]);
				}
			}
		}
		
		this.displayResponse(i++, this.endConversationResponse);
		
		this.hideResponsesFrom(i);
	}
	else
	{
		console.error("moveToNode: Conversation '" + this.activeConversationData.title
			+ "' has no node " + this.currentNodeId + ".");
	}
}

Conversation.responsePassesConditionals = function(response)
{
	if (response.globalIsFalse)
	{
		if (response.globalIsFalse instanceof Array)
		{
			for (var i = 0; i < response.globalIsFalse.length; i++)
			{
				if (GlobalVariables.getVariable(response.globalIsFalse[i]))
				{
					return false;
				}
			}
		}
		else if (GlobalVariables.getVariable(response.globalIsFalse))
		{
			return false;
		}
	}
	if (response.globalIsTrue)
	{
		if (response.globalIsTrue instanceof Array)
		{
			for (var i = 0; i < response.globalIsTrue.length; i++)
			{
				if (!GlobalVariables.getVariable(response.globalIsTrue[i]))
				{
					return false;
				}
			}
		}
		else if (!GlobalVariables.getVariable(response.globalIsTrue))
		{
			return false;
		}
	}
	if (response.onceOnlyGlobal && GlobalVariables.getVariable(response.onceOnlyGlobal))
	{
		return false;
	}
	return true;
}

Conversation.displayResponse = function(index, data)
{
	if (!this.responseElements[index])
	{
		var element = document.createElement('div');
		this.responsesElement.appendChild(element);
		element.className = "conversationResponse";
		element.addEventListener("click", onResponseClicked);
		this.responseElements[index] = element;
	}
	else
	{
		var element = this.responseElements[index];
	}
	element.response = data;
	element.style.visibility = "visible";
	element.innerHTML = (index + 1) + ":- " + data.text;
}

var onResponseClicked = function(param)
{
	Conversation.selectResponse(param.target.response);
}

Conversation.hideResponsesFrom = function(index)
{
	for (; index < this.responseElements.length; index++)
	{
		this.responseElements[index].style.visibility = "hidden";
	}
}

Conversation.getCurrentNode = function()
{
	return this.getNode(this.currentNodeId);
}

Conversation.getSpeaker = function(key)
{
	for (var i = 0; i < this.activeConversationData.characters.length; i++)
	{
		if (this.activeConversationData.characters[i].id == key)
		{
			return this.activeConversationData.characters[i];
		}
	}
	console.error("Conversation '" + this.activeConversationData.title + "' has no speaker '" + key + "'.");
	return undefined;
}

Conversation.getNode = function(index)
{
	for (var i = 0; i < this.activeConversationData.nodes.length; i++)
	{
		if (this.activeConversationData.nodes[i].id == index)
		{
			return this.activeConversationData.nodes[i];
		}
	}
	return null;
}
