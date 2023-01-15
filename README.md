# Shuffle arrays in place

 ES-6 module with functions for shuffling arrays (`shuffle`, `shuffleInplace`) implemented using the Durstenfeld improvement to the Fisher-Yates algorithm (popularized by Knuth). Uses Math.random out-of-the-box, but allows user to inject any (pseudo) random number generator that have the same contract as `Math.random`. By injecting a seedable random numbergenerator the user can get seeded random shuffling that as identical results for the same seed.

Verified to be reasonably evenly distributed by included tests.

# Usage

Out-of-the-box shuffle in-place (uses Math.random)
```javascript
import { shuffleInplace } from shuffle-es6

var list = [...Array(42).keys()]
shuffleInplace(list)
```

With another (pseudo) random number generator
```javascript
import { shuffleInplace } from shuffle-es6

var list = [...Array(42).keys()]
shuffleInplace(list, Math.random)
```

If you want a copy and not inplace, then you can use `shuffle` as it wraps `shuffleInplace` makes a copy using `Array.slice()` before shuffling.

```javascript
import { shuffle } from shuffle-es6

const inputList = [1,2,3,4,5,6]
var shuffledCopy = shuffle(inputList)
```


# Install

npm install --save shuffle-es6
