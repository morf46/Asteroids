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