/** Shuffles lists _in place_ using the Fisher-Yates algorithm
 * implemented such that the probability distribution between elements
 * are even between elements when a large number of shuffles is done
 * using a good random generator (rng).
 * Over repeated number of uses it will generate
 * `array.length!` number of combinations.
 *
 * @param {array} array - the list to be shuffled in place
 * @param {function} rng - the random number generator to be used instead of Math.random
 * Use a seedable pseudo random number generator if you what repeatable randomlike lists.
 */

export function shuffleInplace(array, rng = Math.random) {
   // Fisher-Yates in place
   // -- To shuffle an array a of n elements (indices 0..n-1):
   // for i from n−1 downto 1 do
   //      j ← random integer such that 0 ≤ j ≤ i
   //      exchange a[j] and a[i]
   for(var i = array.length-1; i>=0; i--) {
      var j = Math.floor(rng()*(i+1))
      var temp = array[j]
      array[j] = array[i]
      array[i] = temp
   }
}


/** shuffles a copy of the list using the Fisher-Yates algorithm
 * implemented such that the probability distribution between elements
 * are even between elements when a large number of shuffles is done
 * using a good random generator (rng).
 * Over repeated number of uses it will generate
 * `array.length!` number of combinations.
 *
 * @param {array} array - the list to be shuffled in place
 * @param {function} rng - the random number generator to be used instead of Math.random
 * Use a seedable pseudo random number generator if you what repeatable randomlike lists.
 *
 * @returns {array} - shuffled copy of list (preserves element count and elements, changes order)
 */
export function shuffle(array, rng = Math.random) {
   var shuffledList = array.slice()
   shuffleInplace(shuffledList, rng)
   return shuffledList
}