//SaveState = require("./save_state.js");

var GlobalVariables =
{
	Variables: {},
}

module.exports = GlobalVariables;

GlobalVariables.getVariable = function(key)
{
	return key && !!this.Variables[key.toLowerCase()];
}

GlobalVariables.setVariable = function(key)
{
	if (!key) return
	else if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.setVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key.toLowerCase()] = true;
	}
	//SaveState.setGlobal(key, 1);
}

GlobalVariables.unsetVariable = function(key)
{
	if (!key) return
	else if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.unsetVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key.toLowerCase()] = false;
	}
	//SaveState.setGlobal(key, 0);
}
/*
GlobalVariables.setVariableNoSave = function(key)
{
	if (!key) return
	else if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.setVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key.toLowerCase()] = true;
	}
	//SaveState.setGlobal(key, 1);
}

GlobalVariables.unsetVariableNoSave = function(key)
{
	if (!key) return
	else if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.unsetVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key.toLowerCase()] = false;
	}
	//SaveState.setGlobal(key, 0);
}
*/