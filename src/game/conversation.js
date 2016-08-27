
Input = require("../sdk/input");

var Conversation =
{
	/**
	 * Array of allocated HTML elements for dialogue responses.
	 */
	responseElements: [],

	endConversationResponse: {
		text: "End Conversation"
	},
}

module.exports = Conversation;

Conversation.added = function()
{
	this.parentElement = document.getElementById("conversation");
	this.responsesElement = document.getElementById("conversation_responses");
	this.textElement = document.getElementById("conversation_text");

	//TESTING
	this.startConversation(require("../data/sample_conversation.json"));
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
	this.parentElement.style.visibility = "visible";
	this.activeConversationData = conversationData;
	this.moveToNode(1);
}

/**
 * Ends the current conversation.
 */
Conversation.endConversation = function()
{
	this.parentElement.style.visibility = "hidden";
	this.hideResponsesFrom(0);
	this.activeConversationData = undefined;
}

/**
 * Select a conversation response and move to the appropriate next node.
 */
Conversation.selectResponseByIndex = function(index)
{
	var currentNode = this.getCurrentNode();
	if (index < this.responseElements.length)
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

		var currentNode = this.getCurrentNode();
		this.textElement.innerHTML = "<b>" + this.getSpeakerName(currentNode) + ":</b> " + currentNode.text;

		var r = 0;
		if (currentNode.responses)
		{
			for (; r < currentNode.responses.length; r++)
			{
				this.displayResponse(r, currentNode.responses[r]);
			}
		}
		else
		{
			this.displayResponse(r++, this.endConversationResponse);
		}
		this.hideResponsesFrom(r);
	}
	else
	{
		console.error("moveToNode: Conversation '" + this.activeConversationData.title
			+ "' has no node " + this.currentNodeId + ".");
	}
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

Conversation.getSpeakerName = function(node)
{
	var speaker = this.getSpeaker(node.speaker);
	if (speaker)
	{
		return speaker.displayName;
	}
	else
	{
		return "*ERROR*";
	}
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
