# buffer-index-of-items




**Members:**

+ index

* * *

### buffer-index-of-items.indexOf(map, buffer, index, length, offset) 

Tradition indexOf type call.This uses caching for the lookup map and function, it can be prettyinificiate if you are using a different map objects, even if they havethe same items in them.

**Parameters**

**map**: `Map | Object`, the map of tokens

**buffer**: `Buffer`, buffer to search

**index**: `number`, starting index

**length**: `number`, ending index

**offset**: `number`, subtracted from all indexes to allow for                             partial buffer searching

**Returns**: `number`, - the index of the fould token


### buffer-index-of-items.indexOfCreate(map) 

Generate a indexOf function for the given mapThis uses caching for the lookup map and function, it can be prettyinificiate if you are using a different map objects, even if they havethe same items in them.

**Parameters**

**map**: `Map | Object`, the map of tokens                             partial buffer searching

**Returns**: `indexOf`, - the indexOf function



* * *










