### Module buffer-index-of-items.js

## exports

bufferIndexOf(map, buffer, [index], [length], [offset]) - An IndexOf items function that returns an index

bufferIndexOf.create(map) - Creates a indexOf function that follows more of a RegExp usage.

## bufferIndexOf(map, buffer, [index], [length], [offset])

Tradition indexOf type call.

This uses caching for the lookup map and function, it can be pretty inefficient 
if you are using different map objects for each call, even if they have the 
same items in them.  Note: use the bufferIndexOf.create(map) for a dedicated 
function if you have predefined token sets you wish to search for.

### Params:

* **Map|Object** *map* - the map of tokens to search for.
* **Buffer** *buffer* - buffer to search.
* **number** *[index]* - starting index.
* **number** *[length]* - ending index.
* **number** *[offset]* - subtracted from all indexes to allow for partial buffer searching.

### Return:

* **number** - the index of the fould token

### Example:

```
const bufIndexOf = require( './buffer-index-of-items.js' )
    , map = { start: "starting token", finish: "ending token" }
    , buf = Buffer.from( 'Most things worth starting are also worth finishing.' )
    ;
console.log( bufIndexOf( map, buf ) );  // 19
console.log( bufIndexOf( map, buf ) );  // 53
console.log( bufIndexOf( map, buf ) );  // -1
```

## bufferIndexOf.create(map)

Generate a indexOf function for the given map

This uses caching for the lookup map and function, it can be pretty
inificiate if you are using a different map objects, even if they have
the same items in them.

### Params:

* **Map|Object** *map* - the map of tokens to search for.

### Return:

* **indexOf** - the indexOf function

## indexOf

This is a generated function returned from bufferIndexOf.create(map).  It follows more the 
style of the RegExp#match method with a global flag except that it only returns a single 
token instead of an array.

### Properties:

* **number** *lastIndex* - index to start from (before) & ended (after).
* **number** *index* - the index of the token found.

### Params:

* **Buffer** *buffer* - buffer to search.
* **number** *[index]* - starting index.
* **number** *[length]* - ending inde .
* **number** *[offset]* - subtracted from all indexes to allow for partial buffer searching.

### Return:

* **token** - the index of the found token.

### Example:

```
const bufIndexOf = require( './buffer-index-of-items.js' )
    , map = { start: "starting token", finish: "ending token" }
    , buf = Buffer.from( 'Most things worth starting are also worth finishing.' )
    , tokenOf = bufIndexOf.create( map )
    ;
console.log( tokenOf( buf ), tokenOf.index, tokenOf.lastIndex );  // "starting token", 19, 24
console.log( tokenOf( buf ), tokenOf.index, tokenOf.lastIndex );  // "ending token", 53, 59
console.log( tokenOf( buf ), tokenOf.index, tokenOf.lastIndex );  // undefined, 0, 0
```

