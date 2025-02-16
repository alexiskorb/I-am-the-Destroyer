Math.sign = Math.sign || function(val)
{
	if (val < 0)
		return -1;
	else if (val > 0)
		return 1;
	else
		return 0;
}

Math.clamp = Math.clamp || function(val, a, b)
{
	if (val < a) return a;
	if (val > b) return b;
	return val;
}

Math.randomInt = function(upperBoundExclusive)
{
	return Math.floor(Math.random() * upperBoundExclusive);
}

Math.randomRange = function(minInclusive, maxExclusive)
{
	return Math.randomInt(maxExclusive-minInclusive)+minInclusive;
}

/**
 * Converts the specified angle in radians to degrees.
 * @param {Number} rad
 */
Math.rad2Deg = function(rad)
{
	return (rad / Math.PI) * 180;
}

/**
 * Converts the specified angle in degrees to radians.
 * @param {Number} deg
 */
Math.deg2Rad = function(deg)
{
	return (deg / 180) * Math.PI;
}

//Robert Eisele
Math.angleBetween = function(n, a, b)
{
	var circle = Math.PI*2;
	n = (circle + (n % circle)) % circle;
	a = (circle*100 + a) % circle;
	b = (circle*100 + b) % circle;
	
	if (a < b)
		return a <= n && n <= b;
	return a <= n || n <= b;
}

String.prototype.trim = String.prototype.trim || function trim()
{
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

Array.prototype.remove = Array.prototype.remove || function remove(object)
{
	for (var c = 0; c < this.length; c++)
	{
		if (this[c] === object)
		{
			this.splice(c, 1);
			return;
		}
	}
};

Array.prototype.contains = Array.prototype.contains || function contains(object)
{
	for (var c = 0; c < this.length; c++)
	{
		if (this[c] === object)
			return true;
	}
	return false;
};
