
ThreeUtils = require("./index.js")

/**
 * Creates a new atlas.
 * @class
 * @param {string} url The url of the atlas image.
 * @param {Number} width The pixel width of the image. //TODO: don't require this
 * @param {Number} height The pixel height of the image. //TODO: don't require this
 * @param {Object} sprites The atlas key data.
 * @param {Boolean} suppressTextureLoad If set, does not automatically load the texture.
 */
Atlas = function(url, width, height, sprites, suppressTextureLoad)
{
	if (width === undefined)
	{
		var atlasData = url;
		url = atlasData.url;
		width = atlasData.width;
		height = atlasData.height;
		sprites = atlasData.sprites;
	}
	this.url = url;
	this.width = width;
	this.height = height;
	this.sprites = sprites;
	if (!suppressTextureLoad)
	{
		this.texture = ThreeUtils.loadTexture(url);
	}
	ThreeUtils.setTextureNpot(this.texture);
}

/**
 * Returns the width of the given sprite in the atlas.
 * @param {string} key The sprite key.
 * @returns {Number}
 */
Atlas.prototype.getSpriteWidth = function(key)
{
	return this.sprites[key][2];
}

/**
 * Returns the height of the given sprite in the atlas.
 * @param {string} key The sprite key.
 * @returns {Number}
 */
Atlas.prototype.getSpriteHeight = function(key)
{
	return this.sprites[key][3];
}

module.exports = Atlas;
