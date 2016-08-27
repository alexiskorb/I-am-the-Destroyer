
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");

var Scene = function()
{
	this.transform = new THREE.Object3D();
	this.clickTargets = [];

	if (!this.backgroundUrl)
	{
		this.backgroundUrl = "media/room_empty.png";
	}

	this.backgroundGeometry = ThreeUtils.makeSpriteGeo(1920, 1080);
	this.backgroundMaterial = new THREE.MeshBasicMaterial(
		{
			map: ThreeUtils.loadTexture(this.backgroundUrl),
			transparent: true
		}
	);
	this.backgroundMesh = new THREE.Mesh(this.backgroundGeometry, this.backgroundMaterial);
	this.backgroundMesh.position.set(0, 0, -15);
	this.transform.add(this.backgroundMesh);
}

module.exports = Scene;

Scene.prototype.added = function()
{
	this.transform.position.set(GameEngine.screenWidth / 2, GameEngine.screenHeight / 2, 0);
}

Scene.prototype.update = function()
{
	for (var i = 0; i < this.clickTargets.length; i++)
	{
		if (this.clickTargets[i].enabled)
		{
			this.clickTargets[i].update();
		}
	}
}

Scene.prototype.createClickableSprite = function(key, x, y)
{
	var mesh = ThreeUtils.makeAtlasMesh(ThreeUtils.loadAtlas("general"), key);
	this.transform.add(mesh);
	mesh.position.set(x, y, -10);

	var target = new ClickTarget(mesh);
	this.clickTargets.push(target);
	return target;
}

/**
 * Gets the click target at the specified position, if any.
 */
Scene.prototype.getClickTarget = function(position)
{
	for (var i = 0; i < this.clickTargets.length; i++)
	{
		if (this.clickTargets[i].isPointInBounds(position))
		{
			return this.clickTargets[i];
		}
	}
	return null;
}

Scene.prototype.setAlpha = function(alpha)
{
	for (var i = 0; i < this.clickTargets.length; i++)
	{
		this.clickTargets[i].mesh.material.opacity = alpha;
	}
	this.backgroundMaterial.opacity = alpha;
}

Scene.prototype.show = function()
{
	GameEngine.scene.add(this.transform);
}

Scene.prototype.hide = function()
{
	GameEngine.scene.remove(this.transform);
}
