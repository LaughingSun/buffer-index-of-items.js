"use strict";

const assert = console.assert.bind( console )
    , _cache = new WeakMap
    , VALUE  = Symbol( 'value-key' )
    , LOOKUP = Symbol( 'lookup-key' )
    , MINLENGTH = Symbol( 'min-length-key' )
    , MAXLENGTH = Symbol( 'max-length-key' )
    ;

/** @module buffer-index-of-items */

module.exports = indexOf;

indexOf.create = indexOfCreate;
indexOf.VALUE = VALUE;
indexOf.LOOKUP = LOOKUP;
indexOf.MINLENGTH = MINLENGTH;
indexOf.MAXLENGTH = MAXLENGTH;

/** An IndexOf items function
 *
 * This uses caching for the lookup map and function, it can be pretty
 * inificiate if you are using a different map objects, even if they have
 * the same items in them.
 * 
 * @callback indexOf
 * @extends Function
 * @prop {number} lastIndex  - the index to start from (pre call)
 *                                  and ended at (post call).
 * @prop {number} index      - the index of the token found.
 * 
 * @param {Buffer} buffer     - buffer to search.
 * @param {number} [index]    - starting index.
 * @param {number} [length]   - ending inde .
 * @param {number} [offset]   - subtracted from all indexes to allow for
 *                              partial buffer searching.
 * @returns {token}  - the index of the fould token.
 */


/** Tradition indexOf type call.
 *
 * This uses caching for the lookup map and function, it can be pretty
 * inificiate if you are using a different map objects, even if they have
 * the same items in them.
 * 
 * @function
 * @param {Map|Object} map    - the map of tokens
 * @param {Buffer} buffer     - buffer to search
 * @param {number} [index]    - starting index
 * @param {number} [length]   - ending index
 * @param {number} [offset]   - subtracted from all indexes to allow for
 *                              partial buffer searching
 * @returns {number}  - the index of the fould token
 */
function indexOf ( map, buffer, index, length, offset ) {
  var fn;
  (fn = _cache.get( map ))
      || _cache.set( map, fn = lookupCreate( map ) );
  fn.lastIndex = fn.offset = 0;
  return (undefined !== fn( buffer, index, length, offset )) ? fn.index : -1
}


/** Generate a indexOf function for the given map
 *
 * This uses caching for the lookup map and function, it can be pretty
 * inificiate if you are using a different map objects, even if they have
 * the same items in them.
 * 
 * @function
 * @param {Map|Object} map    - the map of tokens
 *                              partial buffer searching
 * @returns {indexOf}        - the indexOf function
 */
function indexOfCreate ( map ) {
  var lookup = {}
      , minlen = Number.MAX_SAFE_INTEGER
      , maxlen = 0
      , fn, keys
      ;
  
  assert( map instanceof Object
      , 'invalid map (first argument), Object or Map expected' );
  ( ( map instanceof Map ) ? map.keys( ) : Object.keys( map ) )
      .forEach( key => {
        var lu = lookup;
        if ( 'string' === typeof key ) {
          key.split( '' ).forEach( k => lu = lu[k = k.charCodeAt()]
              || (lu[k] = {}) );
        } else if ( key instanceof Buffer || key instanceof Array ) {
          key.forEach( ( k, i ) => lu = lu[k] || (lu[k] = {}) );
        } else {
          throw new Error( 'unsupported key type ' + typeof key );
        }
        lu[VALUE] = ( map instanceof Map ) ? map.get( key ) : map[key];
        minlen > key.length && (minlen = key.length)
        maxlen < key.length && (maxlen = key.length)
      } );
  
  fn = ( buffer, index, length, offset ) => {
        var value = undefined
            , valuei = undefined
            , c, i, lu
            ;
        isNaN( index ) && (index = fn.lastIndex || 0);
        isNaN( length ) && (length = buffer.length);
        isNaN( offset ) && (offset = fn.offset || 0);
        // console.log( index, length, offset );
        
        assert( buffer instanceof Buffer
            , 'invalid buffer (first argument), Buffer expected' );
        assert( index === index | 0
            , 'invalid [index] (second argument), integer expected' );
        assert( length === length | 0
            , 'invalid [length] (third argument), integer expected' );
        assert( offset === offset | 0
            , 'invalid [offset] (fourth argument), integer expected' );
        
        if ( (length -= offset) > 0 ) {
          (index -= offset) < 0 && (index = 0);
          while ( index < length - minlen ) {
            i = index;
            lu = lookup;
            // console.log( buffer[i] + ' at ' + i );
            while ( i < length && (c = buffer[i++]) in lu ) {
              lu = lu[c];
              if ( VALUE in lu ) {
                value = lu[VALUE];
                valuei = i;
                // console.log( 'found ' + buffer.slice( index, i ) + ' at '
                    // + index + ' with value = ' + value );
              }
            }
            
            if ( undefined !== value ) {
              fn.index = index + offset;
              fn.lastIndex = valuei + offset;
              return value
            }
            
            index++
          }
        }
      };
  
  fn[LOOKUP] = lookup;
  fn[MINLENGTH] = minlen;
  fn[MAXLENGTH] = maxlen;
  
  return fn
}

