
// load the SDK
bmacSdk = require("./src/sdk/engine");
bmacSdk.initialize();

// create a game engine
GameEngine = new bmacSdk.Engine("canvasDiv");

// add objects to the engine
GameEngine.addObject(require("./src/game/conversation.js"));

//HACK:
window.SceneManager = require("./src/game/scenemanager.js");
GameEngine.addObject(window.SceneManager);

GameEngine.addObject(require("./src/game/inventory.js"));

// that's it!
