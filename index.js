
// load the SDK
bmacSdk = require("./src/sdk/engine");
bmacSdk.initialize();

// create a game engine
GameEngine = new bmacSdk.Engine("canvasDiv");

// add objects to the engine
GameEngine.addObject(require("./src/game/conversation.js"));
<<<<<<< HEAD
GameEngine.addObject(require("./src/game/sample.js"));
window.Inventory = require("./src/game/inventory.js")
GameEngine.addObject(Inventory);

=======

//HACK:
window.SceneManager = require("./src/game/scenemanager.js");
GameEngine.addObject(window.SceneManager);

GameEngine.addObject(require("./src/game/inventory.js"));
>>>>>>> daf3736e9e9aa3de9db93bda3bce178fccd97086

// that's it!
