(function () {
    'use strict';

    /**
     * Returns random integer, maximum is exclusive and the minimum is inclusive.
     * 
     * @param {number} min - Minimum - inclusive
     * @param {number} max - Maximum - exclusive
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Return a random float.
     * The returned value is no lower than (and may possibly equal) min, and is less than (and not equal) max
     * @param {number} min 
     * @param {number} max 
     */

    function getRandomfloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Convert Radians to Degrees
     * 
     * @param {Number} radians 
     * @return {Number} Degrees
     */
    function radiansToDegrees(radians) {
        var pi = Math.PI;
        return radians * (180 / pi);
    }

    /******************************************************
     ************** Simple ES6 Vector2 Class  **************
     ******************************************************
     * Author: Starbeamrainbowlabs
     * Twitter: @SBRLabs
     * Email: feedback at starbeamrainbowlabs dot com
     * 
     * From https://gist.github.com/sbrl/69a8fa588865cacef9c0
     ******************************************************
     * Originally written for my 2D Graphics ACW at Hull
     * University.
     ******************************************************
     * Changelog
     ******************************************************
     * 19th December 2015:
    	* Added this changelog.
     * 28th December 2015:
    	* Rewrite tests with klud.js + Node.js
     * 30th January 2016:
    	* Tweak angleFrom function to make it work properly.
     * 31st January 2016:
    	* Add the moveTowards function.
    	* Add the minComponent getter.
    	* Add the maxComponent getter.
    	* Add the equalTo function.
    	* Tests still need to be written for all of the above.
     * 19th September 2016:
    	* Added Vector2 support to the multiply method.
     * 10th June 2017:
    	* Fixed a grammatical mistake in a comment.
    	* Added Vector2.fromBearing static method.
     * 21st October 2017:
     	* Converted to ES6 module.
     	* Added Vector2.zero and Vector2.one constants. Remember to clone them!
     * 4th August 2018: (#LOWREZJAM!)
     	* Optimised equalTo()
     * 6th August 2018: (#LOWREZJAM again!)
     	* Added round(), floor(), and ceil()
     * 7th August 2018: (moar #LOWREZJAM :D)
     	* Added area() and snapTo(grid_size)
     * 10th August 2018: (even more #LOWREZJAM!)
     	* Added Vector2 support to divide()
     * 12th June 2019:
     	* Fixed limitTo() behaviour
     	* Added setTo() that uses the old limitTo() behaviour
     	* Squash a nasty bug in angleFrom()
     	* Fix & update the test suite to cover new and bugfixed functionality
    	 * Squash another nasty bug in .minComponent and .maxComponent involving negative numbers
    	 
    	 MORF CHANGES:
    	 Add function - addScaled(v,s)
    	 Add function - Lerp(v,f)
    	 Add function - crossProduct(v)
    	 Add function - setDirection(angle, dist)
    	 add function - findLookAtRotation(v)
    	 add function - findLookatRotationDegrees(v)
    	 add function - Distance(v)
    	 
     */

    class Vector2 {
    	// Constructor
    	constructor(inX, inY) {
    		if (typeof inX != "number")
    			throw new Error("Invalid x value.");
    		if (typeof inY != "number")
    			throw new Error("Invalid y value.");

    		// Store the (x, y) coordinates
    		this.x = inX;
    		this.y = inY;
    	}

    	/**
    	 * Add another Vector2 to this Vector2.
    	 * @param	{Vector2}	v	The Vector2 to add.
    	 * @return	{Vector2}	The current Vector2. useful for daisy-chaining calls.
    	 */
    	add(v) {
    		this.x += v.x;
    		this.y += v.y;

    		return this;
    	}

    	/**
    	 * Add another vector2 to this Vector2 scaling it first.
    	 * @param {Vector2} v  the vector2 to add
    	 * @param {Number} s  the scalar
    	 * @return {Vector2} The Current vector2.
    	 */
    	addScaled(v, s) {
    		this.x += v.x * s;
    		this.y += v.y * s;
    		return this;
    	}

    	/**
    	 * Take another Vector2 from this Vector2.
    	 * @param  {Vector2} v The Vector2 to subtrace from this one.
    	 * @return {Vector2}   The current Vector2. useful for daisy-chaining calls.
    	 */
    	subtract(v) {
    		this.x -= v.x;
    		this.y -= v.y;

    		return this;
    	}

    	/**
    	 * Divide the current Vector2 by a given value.
    	 * @param  {Number|Vector2} value The number (or Vector2) to divide by.
    	 * @return {Vector2}	   The current Vector2. Useful for daisy-chaining calls.
    	 */
    	divide(value) {
    		if (value instanceof Vector2) {
    			this.x /= value.x;
    			this.y /= value.y;
    		}
    		else if (typeof value == "number") {
    			this.x /= value;
    			this.y /= value;
    		}
    		else
    			throw new Error("Can't divide by non-number value.");

    		return this;
    	}

    	/**
    	 * Multiply the current Vector2 by a given value.
    	 * @param  {Number|Vector2} value The number (or Vector2) to multiply the current Vector2 by.
    	 * @return {Vector2}	   The current Vector2. useful for daisy-chaining calls.
    	 */
    	multiply(value) {
    		if (value instanceof Vector2) {
    			this.x *= value.x;
    			this.y *= value.y;
    		}
    		else if (typeof value == "number") {
    			this.x *= value;
    			this.y *= value;
    		}
    		else
    			throw new Error("Can't multiply by non-number value.");

    		return this;
    	}

    	/**
    	 * Sets vectors x and y from direction
    	 * 
    	 * @param {*} angle in Degrees
    	 * @param {*} dist length of the vector
    	 */
    	setDirection(angle, dist) {
    		dist = dist || 1;

    		this.x = dist * Math.cos(angle / 360 * Math.PI * 2);
    		this.y = dist * Math.sin(angle / 360 * Math.PI * 2);

    		return this;
    	};

    	/**
    	 * Distance to other vector2
    	 * @param {Vector2} v 
    	 * @return {Number} distance
    	 */
    	Distance(v) {
    		var dx = v.x - this.x;
    		var dy = v.y - this.y;
    		return Math.sqrt(dx * dx + dy * dy);
    	};

    	/**
    	 * Find a rotation to point at Target location.
    	 * @param {Vector2} v Vector2 to look at 
    	 * @return {Number} Angle in radians
    	 */
    	findLookAtRotation(v) {
    		cross = this.crossProduct(v);
    		dot = this.dotProduct(v);
    		return Math.atan2(cross, dot)
    	}

    	/**
    	 * Find a rotation to point at Target location.
    	 * @param {Vector2} v Vector2 to look at
    	 * @return The angle in Degrees
    	 */
    	findLookAtRotationDegrees(v) {
    		return radiansToDegrees(this.findLookAtRotation(v));
    	}


    	/**
    	 * Move the Vector2 towards the given Vector2 by the given amount.
    	 * @param  {Vector2} v      The Vector2 to move towards.
    	 * @param  {Number} amount The distance to move towards the given Vector2.
    	 */
    	moveTowards(v, amount) {
    		// From http://stackoverflow.com/a/2625107/1460422
    		var dir = new Vector2(
    			v.x - this.x,
    			v.y - this.y
    		).limitTo(amount);
    		this.x += dir.x;
    		this.y += dir.y;

    		return this;
    	}

    	/**
    	 * Rounds the x and y components of this Vector2 down to the next integer.
    	 * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
    	 */
    	floor() {
    		this.x = Math.floor(this.x);
    		this.y = Math.floor(this.y);

    		return this;
    	}
    	/**
    	 * Rounds the x and y components of this Vector2 up to the next integer.
    	 * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
    	 */
    	ceil() {
    		this.x = Math.ceil(this.x);
    		this.y = Math.ceil(this.y);

    		return this;
    	}
    	/**
    	 * Rounds the x and y components of this Vector2 to the nearest integer.
    	 * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
    	 */
    	round() {
    		this.x = Math.round(this.x);
    		this.y = Math.round(this.y);

    		return this;
    	}

    	/**
    	 * Calculates the 'area' of this Vector2 and returns the result.
    	 * In other words, returns x * y. Useful if you're using a Vector2 to store 
    	 * a size.
    	 * @return {Number} The 'area' of this Vector2.
    	 */
    	area() {
    		return this.x * this.y;
    	}

    	/**
    	 * Snaps this Vector2 to an imaginary square grid with the specified sized 
    	 * squares.
    	 * @param	{Number}	grid_size	The size of the squares on the imaginary  grid to which to snap.
    	 * @return	{Vector2}	The current Vector2 - useful for daisy-chaining.
    	 */
    	snapTo(grid_size) {
    		this.x = Math.floor(this.x / grid_size) * grid_size;
    		this.y = Math.floor(this.y / grid_size) * grid_size;

    		return this;
    	}

    	/**
    	 * Limit the length of the current Vector2 to value without changing the
    	 * direction in which the Vector2 is pointing.
    	 * @param  {Number} value The number to limit the current Vector2's length to.
    	 * @return {Vector2}	   The current Vector2. Useful for daisy-chaining calls.
    	 */
    	limitTo(value) {
    		if (typeof value != "number")
    			throw new Error("Can't limit to non-number value.");

    		if (this.length > value) {
    			this.divide(this.length);
    			this.multiply(value);
    		}

    		return this;
    	}

    	/**
    	 * Like limitTo(), but explicitly sets the length of the Vector2 without changing the direction.
    	 * In other words, it acts like limitTo, but also scales up small Vector2s to match the specified length.
    	 * @param	{Number}	value	The length to set the Vector2 to.
    	 */
    	setTo(value) {
    		if (typeof value != "number")
    			throw new Error("Can't limit to non-number value.");

    		this.divide(this.length);
    		this.multiply(value);

    		return this;
    	}

    	/**
    	 * Return the cross product of the current Vector2 and another Vector2.
    	 * 
    	 * @param {Vector2} v  The Other Vector2
    	 * @return {Vector2}	 The current Vector2. Useful for daisy-chaining calls.
    	 */
    	crossProduct(v) {
    		return (this.x * v.y) - (this.y * v.x);
    	}

    	/**
    	 * Return the dot product of the current Vector2 and another Vector2.
    	 * @param  {Vector2} v   The other Vector2 we should calculate the dot product with.
    	 * @return {Number}	 This schould be an number
    	 */
    	dotProduct(v) {
    		return (this.x * v.x) + (this.y * v.y);
    	}

    	/**
    	 * Calculate the angle, in radians, from north to another Vector2.
    	 * @param	{Vector2}	v	The other Vector2 to which to calculate the angle.
    	 * @return	{Vector2}	The current Vector2. Useful for daisy-chaining calls.
    	 */
    	angleFrom(v) {
    		// From http://stackoverflow.com/a/16340752/1460422
    		var angle = Math.atan2(v.y - this.y, v.x - this.x);
    		angle += Math.PI / 2;
    		if (angle < 0) angle += Math.PI * 2;
    		return angle;
    	}

    	/**
    	 * Interpolates between this and another vector by given factor
    	 * @param {*} v The other Vector2
    	 * @param {*} f the factor
    	 * @return The Current Vector2
    	 */
    	lerp(v, f) {
    		this.x = this.x + (v.x - this.x) * f;
    		this.y = this.y + (v.y - this.y) * f;
    		return this;
    	}


    	/**
    	 * Clones the current Vector2.
    	 * @return {Vector2} A clone of the current Vector2. Very useful for passing around copies of a Vector2 if you don't want the original to be altered.
    	 */
    	clone() {
    		return new Vector2(this.x, this.y);
    	}

    	/*
    	 * Returns a representation of the current Vector2 as a string.
    	 * @returns {string} A representation of the current Vector2 as a string.
    	 */
    	toString() {
    		return `(${this.x}, ${this.y})`;
    	}

    	/**
    	 * Whether the Vector2 is equal to another Vector2.
    	 * @param  {Vector2} v The Vector2 to compare to.
    	 * @return {boolean}  Whether the current Vector2 is equal to the given Vector2.
    	 */
    	equalTo(v) {
    		return this.x == v.x && this.y == v.y;
    	}

    	/**
    	 * Get the unit Vector2 of the current Vector2 - that is a Vector2 poiting in the same direction with a length of 1. Note that this does *not* alter the original Vector2.
    	 * @return {Vector2} The current Vector2's unit form.
    	 */
    	get unitVector2() {
    		var length = this.length;
    		return new Vector2(
    			this.x / length,
    			this.y / length);
    	}

    	/**
    	 * Get the length of the current Vector2.
    	 * @return {Number} The length of the current Vector2.
    	 */
    	get length() {
    		return Math.sqrt((this.x * this.x) + (this.y * this.y));
    	}

    	/**
    	 * Get the value of the minimum component of the Vector2.
    	 * @return {Number} The minimum component of the Vector2.
    	 */
    	get minComponent() {
    		if (Math.abs(this.x) < Math.abs(this.y))
    			return this.x;
    		return this.y;
    	}

    	/**
    	 * Get the value of the maximum component of the Vector2.
    	 * @return {Number} The maximum component of the Vector2.
    	 */
    	get maxComponent() {
    		if (Math.abs(this.x) > Math.abs(this.y))
    			return this.x;
    		return this.y;
    	}
    }

    /**
     * Returns a new Vector2 based on an angle and a length.
     * @param	{Number}	angle	The angle, in radians.
     * @param	{Number}	length	The length.
     * @return	{Vector2}	A new Vector2 that represents the (x, y) of the specified angle and length.
     */
    Vector2.fromBearing = function (angle, length) {
    	return new Vector2(
    		length * Math.cos(angle),
    		length * Math.sin(angle)
    	);
    };




    Vector2.zero = new Vector2(0, 0);
    Vector2.one = new Vector2(1, 1);

    /**
     * @private
     */
    const branch_pool = [];

    /**
     * A branch within a BVH
     * @class
     * @private
     */
    class BVHBranch {
    	/**
    	 * @constructor
    	 */
    	constructor() {
    		/** @private */
    		this._bvh_parent = null;

    		/** @private */
    		this._bvh_branch = true;

    		/** @private */
    		this._bvh_left = null;

    		/** @private */
    		this._bvh_right = null;

    		/** @private */
    		this._bvh_sort = 0;

    		/** @private */
    		this._bvh_min_x = 0;

    		/** @private */
    		this._bvh_min_y = 0;

    		/** @private */
    		this._bvh_max_x = 0;

    		/** @private */
    		this._bvh_max_y = 0;
    	}

    	/**
    	 * Returns a branch from the branch pool or creates a new branch
    	 * @returns {BVHBranch}
    	 */
    	static getBranch() {
    		if(branch_pool.length) {
    			return branch_pool.pop();
    		}

    		return new BVHBranch();
    	}

    	/**
    	 * Releases a branch back into the branch pool
    	 * @param {BVHBranch} branch The branch to release
    	 */
    	static releaseBranch(branch) {
    		branch_pool.push(branch);
    	}

    	/**
    	 * Sorting callback used to sort branches by deepest first
    	 * @param {BVHBranch} a The first branch
    	 * @param {BVHBranch} b The second branch
    	 * @returns {Number}
    	 */
    	static sortBranches(a, b) {
    		return a.sort > b.sort ? -1 : 1;
    	}
    }

    /**
     * A Bounding Volume Hierarchy (BVH) used to find potential collisions quickly
     * @class
     * @private
     */
    class BVH {
    	/**
    	 * @constructor
    	 */
    	constructor() {
    		/** @private */
    		this._hierarchy = null;

    		/** @private */
    		this._bodies = [];

    		/** @private */
    		this._dirty_branches = [];
    	}

    	/**
    	 * Inserts a body into the BVH
    	 * @param {Circle|Polygon|Point} body The body to insert
    	 * @param {Boolean} [updating = false] Set to true if the body already exists in the BVH (used internally when updating the body's position)
    	 */
    	insert(body, updating = false) {
    		if(!updating) {
    			const bvh = body._bvh;

    			if(bvh && bvh !== this) {
    				throw new Error('Body belongs to another collision system');
    			}

    			body._bvh = this;
    			this._bodies.push(body);
    		}

    		const polygon = body._polygon;
    		const body_x  = body.x;
    		const body_y  = body.y;

    		if(polygon) {
    			if(
    				body._dirty_coords ||
    				body.x       !== body._x ||
    				body.y       !== body._y ||
    				body.angle   !== body._angle ||
    				body.scale_x !== body._scale_x ||
    				body.scale_y !== body._scale_y
    			) {
    				body._calculateCoords();
    			}
    		}

    		const padding    = body._bvh_padding;
    		const radius     = polygon ? 0 : body.radius * body.scale;
    		const body_min_x = (polygon ? body._min_x : body_x - radius) - padding;
    		const body_min_y = (polygon ? body._min_y : body_y - radius) - padding;
    		const body_max_x = (polygon ? body._max_x : body_x + radius) + padding;
    		const body_max_y = (polygon ? body._max_y : body_y + radius) + padding;

    		body._bvh_min_x = body_min_x;
    		body._bvh_min_y = body_min_y;
    		body._bvh_max_x = body_max_x;
    		body._bvh_max_y = body_max_y;

    		let current = this._hierarchy;
    		let sort    = 0;

    		if(!current) {
    			this._hierarchy = body;
    		}
    		else {
    			while(true) {
    				// Branch
    				if(current._bvh_branch) {
    					const left            = current._bvh_left;
    					const left_min_y      = left._bvh_min_y;
    					const left_max_x      = left._bvh_max_x;
    					const left_max_y      = left._bvh_max_y;
    					const left_new_min_x  = body_min_x < left._bvh_min_x ? body_min_x : left._bvh_min_x;
    					const left_new_min_y  = body_min_y < left_min_y ? body_min_y : left_min_y;
    					const left_new_max_x  = body_max_x > left_max_x ? body_max_x : left_max_x;
    					const left_new_max_y  = body_max_y > left_max_y ? body_max_y : left_max_y;
    					const left_volume     = (left_max_x - left._bvh_min_x) * (left_max_y - left_min_y);
    					const left_new_volume = (left_new_max_x - left_new_min_x) * (left_new_max_y - left_new_min_y);
    					const left_difference = left_new_volume - left_volume;

    					const right            = current._bvh_right;
    					const right_min_x      = right._bvh_min_x;
    					const right_min_y      = right._bvh_min_y;
    					const right_max_x      = right._bvh_max_x;
    					const right_max_y      = right._bvh_max_y;
    					const right_new_min_x  = body_min_x < right_min_x ? body_min_x : right_min_x;
    					const right_new_min_y  = body_min_y < right_min_y ? body_min_y : right_min_y;
    					const right_new_max_x  = body_max_x > right_max_x ? body_max_x : right_max_x;
    					const right_new_max_y  = body_max_y > right_max_y ? body_max_y : right_max_y;
    					const right_volume     = (right_max_x - right_min_x) * (right_max_y - right_min_y);
    					const right_new_volume = (right_new_max_x - right_new_min_x) * (right_new_max_y - right_new_min_y);
    					const right_difference = right_new_volume - right_volume;

    					current._bvh_sort  = sort++;
    					current._bvh_min_x = left_new_min_x < right_new_min_x ? left_new_min_x : right_new_min_x;
    					current._bvh_min_y = left_new_min_y < right_new_min_y ? left_new_min_y : right_new_min_y;
    					current._bvh_max_x = left_new_max_x > right_new_max_x ? left_new_max_x : right_new_max_x;
    					current._bvh_max_y = left_new_max_y > right_new_max_y ? left_new_max_y : right_new_max_y;

    					current = left_difference <= right_difference ? left : right;
    				}
    				// Leaf
    				else {
    					const grandparent  = current._bvh_parent;
    					const parent_min_x = current._bvh_min_x;
    					const parent_min_y = current._bvh_min_y;
    					const parent_max_x = current._bvh_max_x;
    					const parent_max_y = current._bvh_max_y;
    					const new_parent   = current._bvh_parent = body._bvh_parent = BVHBranch.getBranch();

    					new_parent._bvh_parent = grandparent;
    					new_parent._bvh_left   = current;
    					new_parent._bvh_right  = body;
    					new_parent._bvh_sort   = sort++;
    					new_parent._bvh_min_x  = body_min_x < parent_min_x ? body_min_x : parent_min_x;
    					new_parent._bvh_min_y  = body_min_y < parent_min_y ? body_min_y : parent_min_y;
    					new_parent._bvh_max_x  = body_max_x > parent_max_x ? body_max_x : parent_max_x;
    					new_parent._bvh_max_y  = body_max_y > parent_max_y ? body_max_y : parent_max_y;

    					if(!grandparent) {
    						this._hierarchy = new_parent;
    					}
    					else if(grandparent._bvh_left === current) {
    						grandparent._bvh_left = new_parent;
    					}
    					else {
    						grandparent._bvh_right = new_parent;
    					}

    					break;
    				}
    			}
    		}
    	}

    	/**
    	 * Removes a body from the BVH
    	 * @param {Circle|Polygon|Point} body The body to remove
    	 * @param {Boolean} [updating = false] Set to true if this is a temporary removal (used internally when updating the body's position)
    	 */
    	remove(body, updating = false) {
    		if(!updating) {
    			const bvh = body._bvh;

    			if(bvh && bvh !== this) {
    				throw new Error('Body belongs to another collision system');
    			}

    			body._bvh = null;
    			this._bodies.splice(this._bodies.indexOf(body), 1);
    		}

    		if(this._hierarchy === body) {
    			this._hierarchy = null;

    			return;
    		}

    		const parent       = body._bvh_parent;
    		const grandparent  = parent._bvh_parent;
    		const parent_left  = parent._bvh_left;
    		const sibling      = parent_left === body ? parent._bvh_right : parent_left;

    		sibling._bvh_parent = grandparent;

    		if(sibling._bvh_branch) {
    			sibling._bvh_sort = parent._bvh_sort;
    		}

    		if(grandparent) {
    			if(grandparent._bvh_left === parent) {
    				grandparent._bvh_left = sibling;
    			}
    			else {
    				grandparent._bvh_right = sibling;
    			}

    			let branch = grandparent;

    			while(branch) {
    				const left       = branch._bvh_left;
    				const left_min_x = left._bvh_min_x;
    				const left_min_y = left._bvh_min_y;
    				const left_max_x = left._bvh_max_x;
    				const left_max_y = left._bvh_max_y;

    				const right       = branch._bvh_right;
    				const right_min_x = right._bvh_min_x;
    				const right_min_y = right._bvh_min_y;
    				const right_max_x = right._bvh_max_x;
    				const right_max_y = right._bvh_max_y;

    				branch._bvh_min_x = left_min_x < right_min_x ? left_min_x : right_min_x;
    				branch._bvh_min_y = left_min_y < right_min_y ? left_min_y : right_min_y;
    				branch._bvh_max_x = left_max_x > right_max_x ? left_max_x : right_max_x;
    				branch._bvh_max_y = left_max_y > right_max_y ? left_max_y : right_max_y;

    				branch = branch._bvh_parent;
    			}
    		}
    		else {
    			this._hierarchy = sibling;
    		}

    		BVHBranch.releaseBranch(parent);
    	}

    	/**
    	 * Updates the BVH. Moved bodies are removed/inserted.
    	 */
    	update() {
    		const bodies = this._bodies;
    		const count  = bodies.length;

    		for(let i = 0; i < count; ++i) {
    			const body = bodies[i];

    			let update = false;

    			if(!update && body.padding !== body._bvh_padding) {
    				body._bvh_padding = body.padding;
    				update = true;
    			}

    			if(!update) {
    				const polygon = body._polygon;

    				if(polygon) {
    					if(
    						body._dirty_coords ||
    						body.x       !== body._x ||
    						body.y       !== body._y ||
    						body.angle   !== body._angle ||
    						body.scale_x !== body._scale_x ||
    						body.scale_y !== body._scale_y
    					) {
    						body._calculateCoords();
    					}
    				}

    				const x      = body.x;
    				const y      = body.y;
    				const radius = polygon ? 0 : body.radius * body.scale;
    				const min_x  = polygon ? body._min_x : x - radius;
    				const min_y  = polygon ? body._min_y : y - radius;
    				const max_x  = polygon ? body._max_x : x + radius;
    				const max_y  = polygon ? body._max_y : y + radius;

    				update = min_x < body._bvh_min_x || min_y < body._bvh_min_y || max_x > body._bvh_max_x || max_y > body._bvh_max_y;
    			}

    			if(update) {
    				this.remove(body, true);
    				this.insert(body, true);
    			}
    		}
    	}

    	/**
    	 * Returns a list of potential collisions for a body
    	 * @param {Circle|Polygon|Point} body The body to test
    	 * @returns {Array<Body>}
    	 */
    	potentials(body) {
    		const results = [];
    		const min_x   = body._bvh_min_x;
    		const min_y   = body._bvh_min_y;
    		const max_x   = body._bvh_max_x;
    		const max_y   = body._bvh_max_y;

    		let current       = this._hierarchy;
    		let traverse_left = true;

    		if(!current || !current._bvh_branch) {
    			return results;
    		}

    		while(current) {
    			if(traverse_left) {
    				traverse_left = false;

    				let left = current._bvh_branch ? current._bvh_left : null;

    				while(
    					left &&
    					left._bvh_max_x >= min_x &&
    					left._bvh_max_y >= min_y &&
    					left._bvh_min_x <= max_x &&
    					left._bvh_min_y <= max_y
    				) {
    					current = left;
    					left    = current._bvh_branch ? current._bvh_left : null;
    				}
    			}

    			const branch = current._bvh_branch;
    			const right  = branch ? current._bvh_right : null;

    			if(
    				right &&
    				right._bvh_max_x > min_x &&
    				right._bvh_max_y > min_y &&
    				right._bvh_min_x < max_x &&
    				right._bvh_min_y < max_y
    			) {
    				current       = right;
    				traverse_left = true;
    			}
    			else {
    				if(!branch && current !== body) {
    					results.push(current);
    				}

    				let parent = current._bvh_parent;

    				if(parent) {
    					while(parent && parent._bvh_right === current) {
    						current = parent;
    						parent  = current._bvh_parent;
    					}

    					current = parent;
    				}
    				else {
    					break;
    				}
    			}
    		}

    		return results;
    	}

    	/**
    	 * Draws the bodies within the BVH to a CanvasRenderingContext2D's current path
    	 * @param {CanvasRenderingContext2D} context The context to draw to
    	 */
    	draw(context) {
    		const bodies = this._bodies;
    		const count  = bodies.length;

    		for(let i = 0; i < count; ++i) {
    			bodies[i].draw(context);
    		}
    	}

    	/**
    	 * Draws the BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
    	 * @param {CanvasRenderingContext2D} context The context to draw to
    	 */
    	drawBVH(context) {
    		let current       = this._hierarchy;
    		let traverse_left = true;

    		while(current) {
    			if(traverse_left) {
    				traverse_left = false;

    				let left = current._bvh_branch ? current._bvh_left : null;

    				while(left) {
    					current = left;
    					left    = current._bvh_branch ? current._bvh_left : null;
    				}
    			}

    			const branch = current._bvh_branch;
    			const min_x  = current._bvh_min_x;
    			const min_y  = current._bvh_min_y;
    			const max_x  = current._bvh_max_x;
    			const max_y  = current._bvh_max_y;
    			const right  = branch ? current._bvh_right : null;

    			context.moveTo(min_x, min_y);
    			context.lineTo(max_x, min_y);
    			context.lineTo(max_x, max_y);
    			context.lineTo(min_x, max_y);
    			context.lineTo(min_x, min_y);

    			if(right) {
    				current       = right;
    				traverse_left = true;
    			}
    			else {
    				let parent = current._bvh_parent;

    				if(parent) {
    					while(parent && parent._bvh_right === current) {
    						current = parent;
    						parent  = current._bvh_parent;
    					}

    					current = parent;
    				}
    				else {
    					break;
    				}
    			}
    		}
    	}
    }

    /**
     * An object used to collect the detailed results of a collision test
     *
     * > **Note:** It is highly recommended you recycle the same Result object if possible in order to avoid wasting memory
     * @class
     */
    class Result {
    	/**
    	 * @constructor
    	 */
    	constructor() {
    		/**
    		 * @desc True if a collision was detected
    		 * @type {Boolean}
    		 */
    		this.collision = false;

    		/**
    		 * @desc The source body tested
    		 * @type {Circle|Polygon|Point}
    		 */
    		this.a = null;

    		/**
    		 * @desc The target body tested against
    		 * @type {Circle|Polygon|Point}
    		 */
    		this.b = null;

    		/**
    		 * @desc True if A is completely contained within B
    		 * @type {Boolean}
    		 */
    		this.a_in_b = false;

    		/**
    		 * @desc True if B is completely contained within A
    		 * @type {Boolean}
    		 */
    		this.a_in_b = false;

    		/**
    		 * @desc The magnitude of the shortest axis of overlap
    		 * @type {Number}
    		 */
    		this.overlap = 0;

    		/**
    		 * @desc The X direction of the shortest axis of overlap
    		 * @type {Number}
    		 */
    		this.overlap_x = 0;

    		/**
    		 * @desc The Y direction of the shortest axis of overlap
    		 * @type {Number}
    		 */
    		this.overlap_y = 0;
    	}
    }

    /**
     * Determines if two bodies are colliding using the Separating Axis Theorem
     * @private
     * @param {Circle|Polygon|Point} a The source body to test
     * @param {Circle|Polygon|Point} b The target body to test against
     * @param {Result} [result = null] A Result object on which to store information about the collision
     * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own collision heuristic)
     * @returns {Boolean}
     */
    function SAT(a, b, result = null, aabb = true) {
    	const a_polygon = a._polygon;
    	const b_polygon = b._polygon;

    	let collision = false;

    	if(result) {
    		result.a         = a;
    		result.b         = b;
    		result.a_in_b    = true;
    		result.b_in_a    = true;
    		result.overlap   = null;
    		result.overlap_x = 0;
    		result.overlap_y = 0;
    	}

    	if(a_polygon) {
    		if(
    			a._dirty_coords ||
    			a.x       !== a._x ||
    			a.y       !== a._y ||
    			a.angle   !== a._angle ||
    			a.scale_x !== a._scale_x ||
    			a.scale_y !== a._scale_y
    		) {
    			a._calculateCoords();
    		}
    	}

    	if(b_polygon) {
    		if(
    			b._dirty_coords ||
    			b.x       !== b._x ||
    			b.y       !== b._y ||
    			b.angle   !== b._angle ||
    			b.scale_x !== b._scale_x ||
    			b.scale_y !== b._scale_y
    		) {
    			b._calculateCoords();
    		}
    	}

    	if(!aabb || aabbAABB(a, b)) {
    		if(a_polygon && a._dirty_normals) {
    			a._calculateNormals();
    		}

    		if(b_polygon && b._dirty_normals) {
    			b._calculateNormals();
    		}

    		collision = (
    			a_polygon && b_polygon ? polygonPolygon(a, b, result) :
    			a_polygon ? polygonCircle(a, b, result, false) :
    			b_polygon ? polygonCircle(b, a, result, true) :
    			circleCircle(a, b, result)
    		);
    	}

    	if(result) {
    		result.collision = collision;
    	}

    	return collision;
    }
    /**
     * Determines if two bodies' axis aligned bounding boxes are colliding
     * @param {Circle|Polygon|Point} a The source body to test
     * @param {Circle|Polygon|Point} b The target body to test against
     */
    function aabbAABB(a, b) {
    	const a_polygon = a._polygon;
    	const a_x       = a_polygon ? 0 : a.x;
    	const a_y       = a_polygon ? 0 : a.y;
    	const a_radius  = a_polygon ? 0 : a.radius * a.scale;
    	const a_min_x   = a_polygon ? a._min_x : a_x - a_radius;
    	const a_min_y   = a_polygon ? a._min_y : a_y - a_radius;
    	const a_max_x   = a_polygon ? a._max_x : a_x + a_radius;
    	const a_max_y   = a_polygon ? a._max_y : a_y + a_radius;

    	const b_polygon = b._polygon;
    	const b_x       = b_polygon ? 0 : b.x;
    	const b_y       = b_polygon ? 0 : b.y;
    	const b_radius  = b_polygon ? 0 : b.radius * b.scale;
    	const b_min_x   = b_polygon ? b._min_x : b_x - b_radius;
    	const b_min_y   = b_polygon ? b._min_y : b_y - b_radius;
    	const b_max_x   = b_polygon ? b._max_x : b_x + b_radius;
    	const b_max_y   = b_polygon ? b._max_y : b_y + b_radius;

    	return a_min_x < b_max_x && a_min_y < b_max_y && a_max_x > b_min_x && a_max_y > b_min_y;
    }

    /**
     * Determines if two polygons are colliding
     * @param {Polygon} a The source polygon to test
     * @param {Polygon} b The target polygon to test against
     * @param {Result} [result = null] A Result object on which to store information about the collision
     * @returns {Boolean}
     */
    function polygonPolygon(a, b, result = null) {
    	const a_count = a._coords.length;
    	const b_count = b._coords.length;

    	// Handle points specially
    	if(a_count === 2 && b_count === 2) {
    		const a_coords = a._coords;
    		const b_coords = b._coords;

    		if(result) {
    			result.overlap = 0;
    		}

    		return a_coords[0] === b_coords[0] && a_coords[1] === b_coords[1];
    	}

    	const a_coords  = a._coords;
    	const b_coords  = b._coords;
    	const a_normals = a._normals;
    	const b_normals = b._normals;

    	if(a_count > 2) {
    		for(let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
    			if(separatingAxis(a_coords, b_coords, a_normals[ix], a_normals[iy], result)) {
    				return false;
    			}
    		}
    	}

    	if(b_count > 2) {
    		for(let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
    			if(separatingAxis(a_coords, b_coords, b_normals[ix], b_normals[iy], result)) {
    				return false;
    			}
    		}
    	}

    	return true;
    }

    /**
     * Determines if a polygon and a circle are colliding
     * @param {Polygon} a The source polygon to test
     * @param {Circle} b The target circle to test against
     * @param {Result} [result = null] A Result object on which to store information about the collision
     * @param {Boolean} [reverse = false] Set to true to reverse a and b in the result parameter when testing circle->polygon instead of polygon->circle
     * @returns {Boolean}
     */
    function polygonCircle(a, b, result = null, reverse = false) {
    	const a_coords       = a._coords;
    	const a_edges        = a._edges;
    	const a_normals      = a._normals;
    	const b_x            = b.x;
    	const b_y            = b.y;
    	const b_radius       = b.radius * b.scale;
    	const b_radius2      = b_radius * 2;
    	const radius_squared = b_radius * b_radius;
    	const count          = a_coords.length;

    	let a_in_b    = true;
    	let b_in_a    = true;
    	let overlap   = null;
    	let overlap_x = 0;
    	let overlap_y = 0;

    	// Handle points specially
    	if(count === 2) {
    		const coord_x        = b_x - a_coords[0];
    		const coord_y        = b_y - a_coords[1];
    		const length_squared = coord_x * coord_x + coord_y * coord_y;

    		if(length_squared > radius_squared) {
    			return false;
    		}

    		if(result) {
    			const length = Math.sqrt(length_squared);

    			overlap   = b_radius - length;
    			overlap_x = coord_x / length;
    			overlap_y = coord_y / length;
    			b_in_a    = false;
    		}
    	}
    	else {
    		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
    			const coord_x = b_x - a_coords[ix];
    			const coord_y = b_y - a_coords[iy];
    			const edge_x  = a_edges[ix];
    			const edge_y  = a_edges[iy];
    			const dot     = coord_x * edge_x + coord_y * edge_y;
    			const region  = dot < 0 ? -1 : dot > edge_x * edge_x + edge_y * edge_y ? 1 : 0;

    			let tmp_overlapping = false;
    			let tmp_overlap     = 0;
    			let tmp_overlap_x   = 0;
    			let tmp_overlap_y   = 0;

    			if(result && a_in_b && coord_x * coord_x + coord_y * coord_y > radius_squared) {
    				a_in_b = false;
    			}

    			if(region) {
    				const left     = region === -1;
    				const other_x  = left ? (ix === 0 ? count - 2 : ix - 2) : (ix === count - 2 ? 0 : ix + 2);
    				const other_y  = other_x + 1;
    				const coord2_x = b_x - a_coords[other_x];
    				const coord2_y = b_y - a_coords[other_y];
    				const edge2_x  = a_edges[other_x];
    				const edge2_y  = a_edges[other_y];
    				const dot2     = coord2_x * edge2_x + coord2_y * edge2_y;
    				const region2  = dot2 < 0 ? -1 : dot2 > edge2_x * edge2_x + edge2_y * edge2_y ? 1 : 0;

    				if(region2 === -region) {
    					const target_x       = left ? coord_x : coord2_x;
    					const target_y       = left ? coord_y : coord2_y;
    					const length_squared = target_x * target_x + target_y * target_y;

    					if(length_squared > radius_squared) {
    						return false;
    					}

    					if(result) {
    						const length = Math.sqrt(length_squared);

    						tmp_overlapping = true;
    						tmp_overlap     = b_radius - length;
    						tmp_overlap_x   = target_x / length;
    						tmp_overlap_y   = target_y / length;
    						b_in_a          = false;
    					}
    				}
    			}
    			else {
    				const normal_x        = a_normals[ix];
    				const normal_y        = a_normals[iy];
    				const length          = coord_x * normal_x + coord_y * normal_y;
    				const absolute_length = length < 0 ? -length : length;

    				if(length > 0 && absolute_length > b_radius) {
    					return false;
    				}

    				if(result) {
    					tmp_overlapping = true;
    					tmp_overlap     = b_radius - length;
    					tmp_overlap_x   = normal_x;
    					tmp_overlap_y   = normal_y;

    					if(b_in_a && length >= 0 || tmp_overlap < b_radius2) {
    						b_in_a = false;
    					}
    				}
    			}

    			if(tmp_overlapping && (overlap === null || overlap > tmp_overlap)) {
    				overlap   = tmp_overlap;
    				overlap_x = tmp_overlap_x;
    				overlap_y = tmp_overlap_y;
    			}
    		}
    	}

    	if(result) {
    		result.a_in_b    = reverse ? b_in_a : a_in_b;
    		result.b_in_a    = reverse ? a_in_b : b_in_a;
    		result.overlap   = overlap;
    		result.overlap_x = reverse ? -overlap_x : overlap_x;
    		result.overlap_y = reverse ? -overlap_y : overlap_y;
    	}

    	return true;
    }

    /**
     * Determines if two circles are colliding
     * @param {Circle} a The source circle to test
     * @param {Circle} b The target circle to test against
     * @param {Result} [result = null] A Result object on which to store information about the collision
     * @returns {Boolean}
     */
    function circleCircle(a, b, result = null) {
    	const a_radius       = a.radius * a.scale;
    	const b_radius       = b.radius * b.scale;
    	const difference_x   = b.x - a.x;
    	const difference_y   = b.y - a.y;
    	const radius_sum     = a_radius + b_radius;
    	const length_squared = difference_x * difference_x + difference_y * difference_y;

    	if(length_squared > radius_sum * radius_sum) {
    		return false;
    	}

    	if(result) {
    		const length = Math.sqrt(length_squared);

    		result.a_in_b    = a_radius <= b_radius && length <= b_radius - a_radius;
    		result.b_in_a    = b_radius <= a_radius && length <= a_radius - b_radius;
    		result.overlap   = radius_sum - length;
    		result.overlap_x = difference_x / length;
    		result.overlap_y = difference_y / length;
    	}

    	return true;
    }

    /**
     * Determines if two polygons are separated by an axis
     * @param {Array<Number[]>} a_coords The coordinates of the polygon to test
     * @param {Array<Number[]>} b_coords The coordinates of the polygon to test against
     * @param {Number} x The X direction of the axis
     * @param {Number} y The Y direction of the axis
     * @param {Result} [result = null] A Result object on which to store information about the collision
     * @returns {Boolean}
     */
    function separatingAxis(a_coords, b_coords, x, y, result = null) {
    	const a_count = a_coords.length;
    	const b_count = b_coords.length;

    	if(!a_count || !b_count) {
    		return true;
    	}

    	let a_start = null;
    	let a_end   = null;
    	let b_start = null;
    	let b_end   = null;

    	for(let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
    		const dot = a_coords[ix] * x + a_coords[iy] * y;

    		if(a_start === null || a_start > dot) {
    			a_start = dot;
    		}

    		if(a_end === null || a_end < dot) {
    			a_end = dot;
    		}
    	}

    	for(let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
    		const dot = b_coords[ix] * x + b_coords[iy] * y;

    		if(b_start === null || b_start > dot) {
    			b_start = dot;
    		}

    		if(b_end === null || b_end < dot) {
    			b_end = dot;
    		}
    	}

    	if(a_start > b_end || a_end < b_start) {
    		return true;
    	}

    	if(result) {
    		let overlap = 0;

    		if(a_start < b_start) {
    			result.a_in_b = false;

    			if(a_end < b_end) {
    				overlap       = a_end - b_start;
    				result.b_in_a = false;
    			}
    			else {
    				const option1 = a_end - b_start;
    				const option2 = b_end - a_start;

    				overlap = option1 < option2 ? option1 : -option2;
    			}
    		}
    		else {
    			result.b_in_a = false;

    			if(a_end > b_end) {
    				overlap       = a_start - b_end;
    				result.a_in_b = false;
    			}
    			else {
    				const option1 = a_end - b_start;
    				const option2 = b_end - a_start;

    				overlap = option1 < option2 ? option1 : -option2;
    			}
    		}

    		const current_overlap  = result.overlap;
    		const absolute_overlap = overlap < 0 ? -overlap : overlap;

    		if(current_overlap === null || current_overlap > absolute_overlap) {
    			const sign = overlap < 0 ? -1 : 1;

    			result.overlap   = absolute_overlap;
    			result.overlap_x = x * sign;
    			result.overlap_y = y * sign;
    		}
    	}

    	return false;
    }

    /**
     * The base class for bodies used to detect collisions
     * @class
     * @protected
     */
    class Body {
    	/**
    	 * @constructor
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 */
    	constructor(x = 0, y = 0, padding = 0) {
    		/**
    		 * @desc The X coordinate of the body
    		 * @type {Number}
    		 */
    		this.x = x;

    		/**
    		 * @desc The Y coordinate of the body
    		 * @type {Number}
    		 */
    		this.y = y;

    		/**
    		 * @desc The amount to pad the bounding volume when testing for potential collisions
    		 * @type {Number}
    		 */
    		this.padding = padding;

    		/** @private */
    		this._circle = false;

    		/** @private */
    		this._polygon = false;

    		/** @private */
    		this._point = false;

    		/** @private */
    		this._bvh = null;

    		/** @private */
    		this._bvh_parent = null;

    		/** @private */
    		this._bvh_branch = false;

    		/** @private */
    		this._bvh_padding = padding;

    		/** @private */
    		this._bvh_min_x = 0;

    		/** @private */
    		this._bvh_min_y = 0;

    		/** @private */
    		this._bvh_max_x = 0;

    		/** @private */
    		this._bvh_max_y = 0;
    	}

    	/**
    	 * Determines if the body is colliding with another body
    	 * @param {Circle|Polygon|Point} target The target body to test against
    	 * @param {Result} [result = null] A Result object on which to store information about the collision
    	 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
    	 * @returns {Boolean}
    	 */
    	collides(target, result = null, aabb = true) {
    		return SAT(this, target, result, aabb);
    	}

    	/**
    	 * Returns a list of potential collisions
    	 * @returns {Array<Body>}
    	 */
    	potentials() {
    		const bvh = this._bvh;

    		if(bvh === null) {
    			throw new Error('Body does not belong to a collision system');
    		}

    		return bvh.potentials(this);
    	}

    	/**
    	 * Removes the body from its current collision system
    	 */
    	remove() {
    		const bvh = this._bvh;

    		if(bvh) {
    			bvh.remove(this, false);
    		}
    	}

    	/**
    	 * Creates a {@link Result} used to collect the detailed results of a collision test
    	 */
    	createResult() {
    		return new Result();
    	}

    	/**
    	 * Creates a Result used to collect the detailed results of a collision test
    	 */
    	static createResult() {
    		return new Result();
    	}
    }

    /**
     * A circle used to detect collisions
     * @class
     */
    class Circle extends Body {
    	/**
    	 * @constructor
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Number} [radius = 0] The radius
    	 * @param {Number} [scale = 1] The scale
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 */
    	constructor(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
    		super(x, y, padding);

    		/**
    		 * @desc
    		 * @type {Number}
    		 */
    		this.radius = radius;

    		/**
    		 * @desc
    		 * @type {Number}
    		 */
    		this.scale = scale;
    	}

    	/**
    	 * Draws the circle to a CanvasRenderingContext2D's current path
    	 * @param {CanvasRenderingContext2D} context The context to add the arc to
    	 */
    	draw(context) {
    		const x      = this.x;
    		const y      = this.y;
    		const radius = this.radius * this.scale;

    		context.moveTo(x + radius, y);
    		context.arc(x, y, radius, 0, Math.PI * 2);
    	}
    }

    /**
     * A polygon used to detect collisions
     * @class
     */
    class Polygon extends Body {
    	/**
    	 * @constructor
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
    	 * @param {Number} [angle = 0] The starting rotation in radians
    	 * @param {Number} [scale_x = 1] The starting scale along the X axis
    	 * @param {Number} [scale_y = 1] The starting scale long the Y axis
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 */
    	constructor(x = 0, y = 0, points = [], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
    		super(x, y, padding);

    		/**
    		 * @desc The angle of the body in radians
    		 * @type {Number}
    		 */
    		this.angle = angle;

    		/**
    		 * @desc The scale of the body along the X axis
    		 * @type {Number}
    		 */
    		this.scale_x = scale_x;

    		/**
    		 * @desc The scale of the body along the Y axis
    		 * @type {Number}
    		 */
    		this.scale_y = scale_y;


    		/** @private */
    		this._polygon = true;

    		/** @private */
    		this._x = x;

    		/** @private */
    		this._y = y;

    		/** @private */
    		this._angle = angle;

    		/** @private */
    		this._scale_x = scale_x;

    		/** @private */
    		this._scale_y = scale_y;

    		/** @private */
    		this._min_x = 0;

    		/** @private */
    		this._min_y = 0;

    		/** @private */
    		this._max_x = 0;

    		/** @private */
    		this._max_y = 0;

    		/** @private */
    		this._points = null;

    		/** @private */
    		this._coords = null;

    		/** @private */
    		this._edges = null;

    		/** @private */
    		this._normals = null;

    		/** @private */
    		this._dirty_coords = true;

    		/** @private */
    		this._dirty_normals = true;

    		Polygon.prototype.setPoints.call(this, points);
    	}

    	/**
    	 * Draws the polygon to a CanvasRenderingContext2D's current path
    	 * @param {CanvasRenderingContext2D} context The context to add the shape to
    	 */
    	draw(context) {
    		if(
    			this._dirty_coords ||
    			this.x       !== this._x ||
    			this.y       !== this._y ||
    			this.angle   !== this._angle ||
    			this.scale_x !== this._scale_x ||
    			this.scale_y !== this._scale_y
    		) {
    			this._calculateCoords();
    		}

    		const coords = this._coords;

    		if(coords.length === 2) {
    			context.moveTo(coords[0], coords[1]);
    			context.arc(coords[0], coords[1], 1, 0, Math.PI * 2);
    		}
    		else {
    			context.moveTo(coords[0], coords[1]);

    			for(let i = 2; i < coords.length; i += 2) {
    				context.lineTo(coords[i], coords[i + 1]);
    			}

    			if(coords.length > 4) {
    				context.lineTo(coords[0], coords[1]);
    			}
    		}
    	}

    	/**
    	 * Sets the points making up the polygon. It's important to use this function when changing the polygon's shape to ensure internal data is also updated.
    	 * @param {Array<Number[]>} new_points An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
    	 */
    	setPoints(new_points) {
    		const count = new_points.length;

    		this._points  = new Float64Array(count * 2);
    		this._coords  = new Float64Array(count * 2);
    		this._edges   = new Float64Array(count * 2);
    		this._normals = new Float64Array(count * 2);

    		const points = this._points;

    		for(let i = 0, ix = 0, iy = 1; i < count; ++i, ix += 2, iy += 2) {
    			const new_point = new_points[i];

    			points[ix] = new_point[0];
    			points[iy] = new_point[1];
    		}

    		this._dirty_coords = true;
    	}

    	/**
    	 * Calculates and caches the polygon's world coordinates based on its points, angle, and scale
    	 */
    	_calculateCoords() {
    		const x       = this.x;
    		const y       = this.y;
    		const angle   = this.angle;
    		const scale_x = this.scale_x;
    		const scale_y = this.scale_y;
    		const points  = this._points;
    		const coords  = this._coords;
    		const count   = points.length;

    		let min_x;
    		let max_x;
    		let min_y;
    		let max_y;

    		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
    			let coord_x = points[ix] * scale_x;
    			let coord_y = points[iy] * scale_y;

    			if(angle) {
    				const cos   = Math.cos(angle);
    				const sin   = Math.sin(angle);
    				const tmp_x = coord_x;
    				const tmp_y = coord_y;

    				coord_x = tmp_x * cos - tmp_y * sin;
    				coord_y = tmp_x * sin + tmp_y * cos;
    			}

    			coord_x += x;
    			coord_y += y;

    			coords[ix] = coord_x;
    			coords[iy] = coord_y;

    			if(ix === 0) {
    				min_x = max_x = coord_x;
    				min_y = max_y = coord_y;
    			}
    			else {
    				if(coord_x < min_x) {
    					min_x = coord_x;
    				}
    				else if(coord_x > max_x) {
    					max_x = coord_x;
    				}

    				if(coord_y < min_y) {
    					min_y = coord_y;
    				}
    				else if(coord_y > max_y) {
    					max_y = coord_y;
    				}
    			}
    		}

    		this._x             = x;
    		this._y             = y;
    		this._angle         = angle;
    		this._scale_x       = scale_x;
    		this._scale_y       = scale_y;
    		this._min_x         = min_x;
    		this._min_y         = min_y;
    		this._max_x         = max_x;
    		this._max_y         = max_y;
    		this._dirty_coords  = false;
    		this._dirty_normals = true;
    	}

    	/**
    	 * Calculates the normals and edges of the polygon's sides
    	 */
    	_calculateNormals() {
    		const coords  = this._coords;
    		const edges   = this._edges;
    		const normals = this._normals;
    		const count   = coords.length;

    		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
    			const next   = ix + 2 < count ? ix + 2 : 0;
    			const x      = coords[next] - coords[ix];
    			const y      = coords[next + 1] - coords[iy];
    			const length = x || y ? Math.sqrt(x * x + y * y) : 0;

    			edges[ix]   = x;
    			edges[iy]   = y;
    			normals[ix] = length ? y / length : 0;
    			normals[iy] = length ? -x / length : 0;
    		}

    		this._dirty_normals = false;
    	}
    }

    /**
     * A point used to detect collisions
     * @class
     */
    class Point extends Polygon {
    	/**
    	 * @constructor
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 */
    	constructor(x = 0, y = 0, padding = 0) {
    		super(x, y, [[0, 0]], 0, 1, 1, padding);

    		/** @private */
    		this._point = true;
    	}
    }
    Point.prototype.setPoints = undefined;

    /**
     * A collision system used to track bodies in order to improve collision detection performance
     * @class
     */
    class Collisions {
    	/**
    	 * @constructor
    	 */
    	constructor() {
    		/** @private */
    		this._bvh = new BVH();
    	}

    	/**
    	 * Creates a {@link Circle} and inserts it into the collision system
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Number} [radius = 0] The radius
    	 * @param {Number} [scale = 1] The scale
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 * @returns {Circle}
    	 */
    	createCircle(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
    		const body = new Circle(x, y, radius, scale, padding);

    		this._bvh.insert(body);

    		return body;
    	}

    	/**
    	 * Creates a {@link Polygon} and inserts it into the collision system
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
    	 * @param {Number} [angle = 0] The starting rotation in radians
    	 * @param {Number} [scale_x = 1] The starting scale along the X axis
    	 * @param {Number} [scale_y = 1] The starting scale long the Y axis
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 * @returns {Polygon}
    	 */
    	createPolygon(x = 0, y = 0, points = [[0, 0]], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
    		const body = new Polygon(x, y, points, angle, scale_x, scale_y, padding);

    		this._bvh.insert(body);

    		return body;
    	}

    	/**
    	 * Creates a {@link Point} and inserts it into the collision system
    	 * @param {Number} [x = 0] The starting X coordinate
    	 * @param {Number} [y = 0] The starting Y coordinate
    	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
    	 * @returns {Point}
    	 */
    	createPoint(x = 0, y = 0, padding = 0) {
    		const body = new Point(x, y, padding);

    		this._bvh.insert(body);

    		return body;
    	}

    	/**
    	 * Creates a {@link Result} used to collect the detailed results of a collision test
    	 */
    	createResult() {
    		return new Result();
    	}

    	/**
    	 * Creates a Result used to collect the detailed results of a collision test
    	 */
    	static createResult() {
    		return new Result();
    	}

    	/**
    	 * Inserts bodies into the collision system
    	 * @param {...Circle|...Polygon|...Point} bodies
    	 */
    	insert(...bodies) {
    		for(const body of bodies) {
    			this._bvh.insert(body, false);
    		}

    		return this;
    	}

    	/**
    	 * Removes bodies from the collision system
    	 * @param {...Circle|...Polygon|...Point} bodies
    	 */
    	remove(...bodies) {
    		for(const body of bodies) {
    			this._bvh.remove(body, false);
    		}

    		return this;
    	}

    	/**
    	 * Updates the collision system. This should be called before any collisions are tested.
    	 */
    	update() {
    		this._bvh.update();

    		return this;
    	}

    	/**
    	 * Draws the bodies within the system to a CanvasRenderingContext2D's current path
    	 * @param {CanvasRenderingContext2D} context The context to draw to
    	 */
    	draw(context) {
    		return this._bvh.draw(context);
    	}

    	/**
    	 * Draws the system's BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
    	 * @param {CanvasRenderingContext2D} context The context to draw to
    	 */
    	drawBVH(context) {
    		return this._bvh.drawBVH(context);
    	}

    	/**
    	 * Returns a list of potential collisions for a body
    	 * @param {Circle|Polygon|Point} body The body to test for potential collisions against
    	 * @returns {Array<Body>}
    	 */
    	potentials(body) {
    		return this._bvh.potentials(body);
    	}

    	/**
    	 * Determines if two bodies are colliding
    	 * @param {Circle|Polygon|Point} target The target body to test against
    	 * @param {Result} [result = null] A Result object on which to store information about the collision
    	 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
    	 * @returns {Boolean}
    	 */
    	collides(source, target, result = null, aabb = true) {
    		return SAT(source, target, result, aabb);
    	}
    }

    class _World {


        constructor() {
            this.EntityList = [];
            this.EntityListPostUpdate = [];
            this.collisions = new Collisions();
            this.collisionResults = this.collisions.createResult();
            this.GameTime = 0;
        }



        RegisterEntity(NewEntity) {
            this.EntityList.push(NewEntity);
            if (NewEntity.RegisterPostUpdate === true) {
                this.EntityListPostUpdate.push(NewEntity);
            }
        }


        UnregisterInactiveEntitys() {
            console.log("GC run");
            this.EntityList = this.EntityList.filter(x => x.PendingDestroy === false);
            this.EntityListPostUpdate = this.EntityListPostUpdate.filter(x => x.PendingDestroy === false);
        }


        InitWorld() {

            this.canvas = document.getElementById('mainCanvas');
            this.ctx = this.canvas.getContext('2d');

        }

        /**
         * updates game time
         * @param {number} TimeStamp Timestamp from gameloop
         */
        UpdateGameTime(TimeStamp) {
            this.GameTime = TimeStamp;
        }

    }

    const World = new _World();

    class Entity {




        constructor() {
            this.Location = new Vector2(0, 0);
            this.Velocity = new Vector2(0, 0);
            this.World = World;
            this.RootBody = null;
            this.PendingDestroy = false;
            this.RegisterPostUpdate = false;
            this.team = 0;


            this.health = 0;
            this.maxHealth = 0;

            this.TimeToLife = -1;
            this.spawnTime = World.GameTime;
            this.Age = 0;

        }

        preUpdate(delta) {

        }

        update(delta) {

            this.Age = World.GameTime - this.spawnTime;

            if (this.TimeToLife > 0) {
                if (this.Age > this.TimeToLife) {
                    this.Destroy();
                }
            }

            if (!this.IsInWorldBounds()) {
                console.log("Out of Bounds: ", this);
                this.Destroy();
            }

        }

        /**
         * Runs after Update needs to be registered with RegisterPostUpdate = true
         * @param {number} delta DeltaTime 
         */
        postUpdate(delta) {

        }

        /**
         * Take damage 
         * @param {number} amount 
         */
        takeDamage(amount) {

        }

        /**
         * Prepare Destroy Entity 
         */
        Destroy() {
            this.PendingDestroy = true;

        }

        render(delta) {

        }

        /**
         * Set Entity Velocity clones the input vector
         * @param {Vector2} velocity the new velocity
         */
        SetVelocity(velocity) {
            this.Velocity = velocity.clone();
        }


        /**
         * Checks if entity is relevant in world
         * @returns {Boolean} 
         */
        IsInWorldBounds() {

            if (this.Location.x < -400
                || this.Location.x > 1200
                || this.Location.y < -400
                || this.Location.y > 1000) {
                return false;
            }

            return true;
        }



    }

    class StarBackGround extends Entity {


        constructor(x, y, speed, size) {
            super();
            this.Location = new Vector2(x, y);
            this.Velocity = new Vector2(0, speed);
            this.width = size;
            this.height = size;

        }

        update(delta) {

            this.Location.addScaled(this.Velocity, delta);

            if (this.Location.y > 900) {
                this.Location = new Vector2(getRandomfloat(0, 800), getRandomfloat(-120, -250));
            }
        }

        render(delta) {
            const ctx = this.World.ctx;
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#fff';
            ctx.translate(this.Location.x, this.Location.y);
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }

    class Monster extends Entity {

        constructor(location) {
            super();
            this.Location = location.clone();
            this.Velocity = new Vector2(0, 100);
            this.RootBody = this.CreateCollionBody();
            this.RootBody.Outer = this;
            this.team = 8;

            this.maxHealth = 30;
            this.health = this.maxHealth;

        }

        /**
         * @returns Collision Body
         */
        CreateCollionBody() {
            return this.World.collisions.createCircle(this.Location.x, this.Location.y, 10);
        }

        update(delta) {

            super.update(delta);
            this.UpdateMovement(delta);
            this.UpdateRootBody();

        }

        UpdateMovement(delta) {
            this.Location.addScaled(this.Velocity, delta);
        }

        UpdateRootBody() {
            this.RootBody.x = this.Location.x;
            this.RootBody.y = this.Location.y;
        }

        postUpdate(delta) {


        }

        Destroy() {
            super.Destroy();
            this.RootBody.remove();
        }

        render(delta) {

        }

        takeDamage(amount) {
            this.health -= amount;

            if (this.health <= 0) {
                this.Destroy();
            }
        }
    }

    class _Key {
        constructor() {
            this._pressed = {};
            this.LEFT = 37;
            this.UP = 38;
            this.RIGHT = 39;
            this.DOWN = 40;
            this.CTRL = 17;
            this.SHIFT = 16;
        }


        isDown(keyCode) {
            return this._pressed[keyCode];
        }

        onKeydown(event) {
            this._pressed[event.keyCode] = true;
        }

        onKeyup(event) {
            delete this._pressed[event.keyCode];
        }

    }

    const Key = new _Key();

    class Projectile extends Monster {

        constructor(location) {
            super(location);


            this.RegisterPostUpdate = true;

            this.TimeToLife = 3000;
        }

        CreateCollionBody() {
            return this.World.collisions.createCircle(this.Location.x, this.Location.y, 2);
        }

        postUpdate(delta) {
            if (!this.PendingDestroy) {
                const potentials = this.RootBody.potentials();
                for (const otherBody of potentials) {
                    if (this.RootBody.collides(otherBody, this.World.collisionResults)) {
                        if (this.team !== otherBody.Outer.team) {
                            otherBody.Outer.takeDamage(10);
                            this.Destroy();
                            break;
                        }
                    }
                }
            }

        }
    }

    class Weapon {


        constructor() {

            this.Period = 250;
            this.lastTimeFired = 0;
            this.Outer = null;
            
        }

        /**
         * Set the new owner of this weapon.
         * @param {Entity} NewOwner 
         */
        SetOwner(NewOwner) {
            this.Outer = NewOwner;
        }

        /**
         * basic pre weapon fire logic
         * can the weapon fire?
         */
        FireWeapon() {
            if (this.lastTimeFired + this.Period < World.GameTime) {
                this.HandleFireWeapon();
            }
        }

        /**
         * weapon fire logic 
         * creates projectiles etc.
         */
        HandleFireWeapon() {

        }
    }

    /**
     * Projectile shoots "Upwards"
     */
    class BaseProjectileWeapon extends Weapon {

        constructor() {
            super();


        }



        HandleFireWeapon() {
            let P = new Projectile(this.Outer.Location);
            P.SetVelocity(new Vector2(0, getRandomfloat(-550, -450)).add(this.Outer.Velocity.clone().multiply(0.16)));
            P.team = this.Outer.team;
            World.RegisterEntity(P);
        }
    }

    const SCREEN_W = 800;
    const SCREEN_H = 600;


    /**
     * Spawns Enemys in a Line
     * 
     * @param {Vector2} Location Origin location
     * @param {Vector2} TargetLocation Direction vector 
     * @param {Number} Padding Distance betweens spawns.
     * @param {Class} ClassToSpawn The Class to Spawn. Defaults to Monster 
     */
    function SpawnEnemyLine(Location, TargetLocation, Padding, ClassToSpawn = Monster) {

        let Dist = Location.Distance(TargetLocation);
        let Count = Math.round(Dist / Padding);
        let LocalLocation = Location.clone();

        for (let i = 0; i < Count; i++) {
            let monster = new ClassToSpawn(LocalLocation);
            World.RegisterEntity(monster);
            LocalLocation.moveTowards(TargetLocation, Padding);
        }

    }

    class Player extends Monster {

        constructor(location) {

            super(location);
            this.RegisterPostUpdate = true;
            this.team = 0;

            this.maxHealth = 100;
            this.health = this.maxHealth;

            this.InputStrength = 250;

            this.weapon = new BaseProjectileWeapon();
            this.weapon.SetOwner(this);

            //start with 1 to avoid modulus 0
            this.PositionLevel = 1;
        }

        update(delta) {

            this.Velocity = new Vector2(0, 0);
            this.PositionLevel += 1 * delta;

            if (Math.floor(this.PositionLevel) % 10 === 0) {

                //add 1 to avoid modulus 0
                this.PositionLevel += 1;
                let TargetLocation = new Vector2(0, 0);
                TargetLocation.setDirection(0, 2000);
                SpawnEnemyLine(new Vector2(200, 0), TargetLocation, 20);
            }

            if (Key.isDown(Key.UP)) {
                this.Velocity.addScaled(new Vector2(0, -1), this.InputStrength);
            }

            if (Key.isDown(Key.DOWN)) {
                this.Velocity.addScaled(new Vector2(0, 1), this.InputStrength);
            }

            if (Key.isDown(Key.LEFT)) {
                this.Velocity.addScaled(new Vector2(-1, 0), this.InputStrength);
            }
            if (Key.isDown(Key.RIGHT)) {
                this.Velocity.addScaled(new Vector2(1, 0), this.InputStrength);
            }

            super.update(delta);



            if (Key.isDown(Key.CTRL)) {

                if (this.weapon) {
                    this.weapon.FireWeapon();
                }

            }
        }

        postUpdate(delta) {
            if (!this.PendingDestroy) {
                const potentials = this.RootBody.potentials();
                for (const otherBody of potentials) {
                    if (this.RootBody.collides(otherBody, this.World.collisionResults)) {
                        if (this.team !== otherBody.Outer.team) {
                            otherBody.Outer.Destroy();
                            this.takeDamage(10);
                        }
                    }
                }
            }
        }

        takeDamage(amount) {

            super.takeDamage(amount);

            console.log("player HP: " + this.health);
        }

        CreateCollionBody() {
            return this.World.collisions.createPolygon(this.Location.x, this.Location.y, [[0, 0], [16, 32], [-16, 32]]);
        }

    }

    class SinusCurveMonster extends Monster {

        constructor(location) {
            super(location);
            this.Velocity = new Vector2(0, 200);
            this.frequency = 100;
            this.magnitude = 90;
            this.OffsetX = this.Location.x;
        }

        UpdateMovement(delta) {




            /*
            X = this.position.X + this.speed.X;
            Y = ((float)Math.Sin(X / this.ratio) * this.height) + this.offsetY;
            */
            var LocalLocation = this.Location.clone();
            LocalLocation.addScaled(this.Velocity, delta);

            this.Location = new Vector2((Math.sin(LocalLocation.y / this.frequency) * this.magnitude) + this.OffsetX, LocalLocation.y);

        }

    }

    var lastFrameTimeMs = 0;
    var maxFPS = 60;
    var delta = 0;

    var lastTimeGC = 0;

    function GameLoop(TimeStamp) {

        World.UpdateGameTime(TimeStamp);

        if (TimeStamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(GameLoop);
            return;
        }

        if (lastTimeGC + 60000 < TimeStamp) {
            lastTimeGC = TimeStamp;
            World.UnregisterInactiveEntitys();
        }

        delta = (TimeStamp - lastFrameTimeMs) / 1000;
        lastFrameTimeMs = TimeStamp;



        //Update
        World.EntityList.forEach(entity => {
            if (!entity.PendingDestroy) {
                entity.update(delta);
            }
        });

        //Update Collision
        World.collisions.update();
        //POST update
        World.EntityListPostUpdate.forEach(entity => {
            if (!entity.PendingDestroy) {
                entity.postUpdate(delta);
            }
        });

        //Draw
        //clear screen  CLS
        World.ctx.fillStyle = "#000";
        World.ctx.fillRect(0, 0, 800, 600);

        World.EntityList.forEach(entity => {
            if (!entity.PendingDestroy) {
                entity.render(delta);
            }
        });

        // Draw Debug collisons
        World.ctx.strokeStyle = '#f00';
        World.ctx.beginPath();
        World.collisions.draw(World.ctx);
        World.ctx.stroke();



        requestAnimationFrame(GameLoop);
    }




    function InitGame() {

        InitStars();





        let OriginLocation = new Vector2(800, 0);
        let TargetLocation = new Vector2(400, 0);
        SpawnEnemyLine(OriginLocation, TargetLocation, 50, SinusCurveMonster);


        SpawnEnemyLine(new Vector2(200,0),new Vector2(200,-1000), 50, SinusCurveMonster);

        var xxPlayer = new Player(new Vector2(20, 20));
        World.RegisterEntity(xxPlayer);


        function InitStars() {
            for (let i = 0; i < 60; i++) {
                let size = getRandomInt(1, 5);
                let x = getRandomfloat(0, SCREEN_W);
                let y = getRandomfloat(0, SCREEN_H);
                let speed = getRandomfloat(150, 180) / size;
                if (i > 45) {
                    size = getRandomInt(4, 8);
                    speed = getRandomfloat(50, 80) / size;
                }
                let Star = new StarBackGround(x, y, speed, size);
                World.RegisterEntity(Star);
            }
        }
    }




    window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);
    //window.addEventListener('mousemove', MouseMove, false);

    document.addEventListener('DOMContentLoaded', (event) => {
        World.InitWorld();
        InitGame();
        requestAnimationFrame(GameLoop);
    });

}());
