
var GlobalVariables =
{
	Variables: {},
}

module.exports = GlobalVariables;

GlobalVariables.getVariable = function(key)
{
	return !!this.Variables[key];
}

GlobalVariables.setVariable = function(key)
{
	if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.setVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key] = true;
	}
}

GlobalVariables.unsetVariable = function(key)
{
	if (key instanceof Array)
	{
		for (var i = 0; i < key.length; i++)
		{
			this.unsetVariable(key[i]);
		}
	}
	else
	{
		this.Variables[key] = false;
	}
}
