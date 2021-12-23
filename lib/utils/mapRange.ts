
/**
 * Maps a number's relative placement within one range to the equivalent position in another range.
 * 
 * ```js
 * mapRange(-10, 10, 100, 200, 0); // 150
 * ```
 *
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @param {number} [value]
 * @returns {number} The mapped value or map function
 */
function mapRange (
    inMin: number, 
    inMax: number, 
    outMin: number, 
    outMax: number, 
    value: number
): number {
    const inRange = inMax - inMin,
          outRange = outMax - outMin;

    return outMin + ((value - inMin) / inRange * outRange || 0)
}


export default mapRange
