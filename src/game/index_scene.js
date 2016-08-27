
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var IndexScene = function()
{
	
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	// create johnson
	this.johnson15 = new THREE.Object3D();
	var johnsonMesh = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), "johnson15_sprite");
	this.transform.add(this.johnson15);
	this.johnson15.add(johnsonMesh);
	this.johnson15.position.set(100, 100, -20);

	var johnsonClickTarget = new ClickTarget(johnsonMesh);
	johnsonClickTarget.triggerConversation = require("../data/sample_conversation.json");
	this.clickTargets.push(johnsonClickTarget);
}

module.exports = new IndexScene();
