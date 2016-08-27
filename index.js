
// load the SDK
bmacSdk = require("./src/sdk/engine");
bmacSdk.initialize();

// create a game engine
GameEngine = new bmacSdk.Engine("canvasDiv");

// add objects to the engine
GameEngine.addObject(require("./src/game/conversation.js"));
window.Inventory = require("./src/game/inventory.js")
GameEngine.addObject(Inventory);

// Hack
window.SceneManager = require("./src/game/scenemanager.js");
GameEngine.addObject(window.SceneManager);


// that's it!
