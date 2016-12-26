# buffer-index-of-items.js
For when you need to find a set of tokens in a buffer.  You can't use RegExp on Buffers without casting it to a string.

But you can use buffer-index-of-items, which will make you super sexy.

There are 2 ways to use it:
```
const indexOfItems = require( './buffer-index-of-items.js' )
    , buffer = Buffer.from( 'one, two, three and four.  Can I have a little more?' )
    ;
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );
console.log( indexOfItems( {'one': 1, 'two': 2, 'three' : 3, 'four': 4}
    , buffer ) );
```

or:

```
const indexOfItems = require( './buffer-index-of-items.js' ).create( {'one': 1, 'two': 2, 'three' : 3, 'four': 4} )
    , buffer = Buffer.from( 'one, two, three and four.  Can I have a little more?' )
    ;
console.log( indexOfItems( buffer ) );
console.log( indexOfItems( buffer ) );
console.log( indexOfItems( buffer ) );
console.log( indexOfItems( buffer ) );
console.log( indexOfItems( buffer ) );

```
Hope it solves all your simplier buffer parsing problems.

MIT license
