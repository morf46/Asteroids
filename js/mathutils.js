/**
 * Returns random integer, maximum is exclusive and the minimum is inclusive.
 * 
 * @param {number} min - Minimum - inclusive
 * @param {number} max - Maximum - exclusive
 */
export function getRandomInt(min, max) {
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

export function getRandomfloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random bool
 * @return {Boolean} 
 */
export function getRandomBool() {
    return Math.round(Math.random()) === 1 ? true : false;
}

/**
 * Returns a random weighted bool
 *  0.6 returns true 60% of time.
 * @param {Number} weight 0.0 - 1.f 
 * @return {Boolean} 
 */
export function getRandomBoolWithWeight(weight) {
    var w = Clamp(weight, 0, 1);
    return Math.random() < w ? true : false;
}



/**
 * Convert Radians to Degrees
 * 
 * @param {Number} radians 
 * @return {Number} Degrees
 */
export function radiansToDegrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}


/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} value The current value
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
  */
export function Clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
};