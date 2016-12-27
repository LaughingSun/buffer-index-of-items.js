

## exports

An IndexOf items function

This uses caching for the lookup map and function, it can be pretty
inificiate if you are using a different map objects, even if they have
the same items in them.

### Properties:

* **number** *lastIndex* - index to start from (before) & ended (after).
* **number** *index* - the index of the token found.

### Params:

* **Buffer** *buffer* - buffer to search.
* **number** *[index]* - starting index.
* **number** *[length]* - ending inde .
* **number** *[offset]* - subtracted from all indexes to allow for                              partial buffer searching.

### Return:

* **token** - the index of the fould token.

## indexOf(map, buffer, [index], [length], [offset])

Tradition indexOf type call.

This uses caching for the lookup map and function, it can be pretty
inificiate if you are using a different map objects, even if they have
the same items in them.

### Params:

* **Map|Object** *map* - the map of tokens
* **Buffer** *buffer* - buffer to search
* **number** *[index]* - starting index
* **number** *[length]* - ending index
* **number** *[offset]* - subtracted from all indexes to allow for                              partial buffer searching

### Return:

* **number** - the index of the fould token

## indexOfCreate(map)

Generate a indexOf function for the given map

This uses caching for the lookup map and function, it can be pretty
inificiate if you are using a different map objects, even if they have
the same items in them.

### Params:

* **Map|Object** *map* - the map of tokens                              partial buffer searching

### Return:

* **indexOf** - the indexOf function

<!-- End buffer-index-of-items.js -->

