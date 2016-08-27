
// load the SDK
window.bmacSdk = require("./src/sdk/engine");
bmacSdk.initialize();

// create a game engine
GameEngine = new bmacSdk.Engine("canvasDiv");

// add objects to the engine
GameEngine.addObject(require("./src/game/conversation.js"));
<<<<<<< HEAD
window.Inventory = require("./src/game/inventory.js")
GameEngine.addObject(Inventory);

// Hack
window.SceneManager = require("./src/game/scenemanager.js");
GameEngine.addObject(window.SceneManager);


=======

window.Inventory = require("./src/game/inventory.js")
GameEngine.addObject(Inventory);

//HACK:
window.SceneManager = require("./src/game/scenemanager.js");
GameEngine.addObject(window.SceneManager);

>>>>>>> 4247b3e97f410967b5a1c193c22f9ade07414091
// that's it!
