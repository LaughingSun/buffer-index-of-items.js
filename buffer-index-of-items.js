"use strict";

const assert = console.assert.bind( console )
    , _cache = new WeakMap
    , VALUE  = Symbol( 'value-key' )
    ;

module.exports = bufferIndexOf;

bufferIndexOf.create = bufferIndexOfCreate;
bufferIndexOf.VALUE = VALUE;


function bufferIndexOf ( map, buffer, index, length, offset ) {
  var fn;
  (fn = _cache.get( map ))
      || _cache.set( map, fn = lookupCreate( map ) );
  fn.lastIndex = fn.index = fn.offset = 0;
  return fn( buffer, index, length, offset )
}


function bufferIndexOfCreate ( map ) {
  var lookup = {}
      , fn, keys
      ;
  
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
      } );
  
  (fn = function ( buffer, index, length, offset ) {
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
          while ( index < length ) {
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
      }).lookup = lookup;
  
  return fn;
}

