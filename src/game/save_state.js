//This does not have any inventory functionality and does not display infoboxes on undo.

/*
GlobalVariables = require("./globalvariables.js");
InfoBox = require("./infobox.js");
SceneManager = require("./scenemanager.js");

var SaveState = {
    globalsKeys: [],    //names of globals
    globalsValues: [],  //corresponding values of globals
}

SaveState.setGlobal = function(key, value)  //Add global to save state
{
    this.globalsKeys.push(key);
    this.globalsValues.push(value);
}
SaveState.undoLastGlobal = function()
{
    if (this.globalsKeys.length > 1)  //First two globals have to do with starting the game and should not be undone.
    {
        var key = this.globalsKeys.pop();
        var value = this.globalsValues.pop();
        if (key == "prison"){
            SceneManager.LAST_PRISON = value;
        }else{
            if (value == 1){
                GlobalVariables.unsetVariableNoSave(key);
            }else{
                GlobalVariables.setVariableNoSave(key);
            }
        }
    }
}
SaveState.redoLastGlobal = function()
{

}

module.exports = SaveState;
*/