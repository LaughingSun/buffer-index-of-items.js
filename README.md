# buffer-index-of-items.js
For when you need to find a set of tokens in a buffer.  You can't use RegExp on Buffers without casting it to a string.

But you can use buffer-index-of-items, which will make you super sexy.

There are 2 ways to use it:
```
const indexOfItems = require( './buffer-index-of-items.js' ).create( {'one': 1, 'two': 2, 'three' : 3, 'four': 4} )
    , buffer = Buffer.from( 'one, two, three and four.  Can I have a little more?' )
    ;
console.log( indexOfItems( buffer ), indexOfItems.index, indexOfItems.lastIndex );  // 1, 0, 3
console.log( indexOfItems( buffer ), indexOfItems.index, indexOfItems.lastIndex );  // 2, 5, 8
console.log( indexOfItems( buffer ), indexOfItems.index, indexOfItems.lastIndex );  // 3, 10, 15
console.log( indexOfItems( buffer ), indexOfItems.index, indexOfItems.lastIndex );  // 4, 17, 21
console.log( indexOfItems( buffer ), indexOfItems.index, indexOfItems.lastIndex );  // undefined, 0, 0

```

or:

```
const indexOfItems = require( './buffer-index-of-items.js' )
    , buffer = Buffer.from( 'one, two, three and four.  Can I have a little more?' )
    ;
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );   // 0
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );   // 5
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );   // 10
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );   // 15
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );   // -1
```

Hope it solves all your simplier buffer parsing problems.

MIT license
