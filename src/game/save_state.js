/*GlobalVariables = require("./globalvariables.js");
InfoBox = require("./infobox.js");
SceneManager = require("./scenemanager.js");

var SaveState = {
    globalsKeys: [],
    globalsValues: [],
}

SaveState.setGlobal = function(key, value) 
{
    this.globalsKeys.push(key);
    this.globalsValues.push(value);
}
SaveState.undoLastGlobal = function()
{
    if (this.globalsKeys.length > 1)
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