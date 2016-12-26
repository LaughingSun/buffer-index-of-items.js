/*
 * run from node cli: node test-buffer-index-of-items.js
 * requires: ansi module.  "npm install ansi"
 */

"use strict";

const bufferIndexOf = require( './buffer-index-of-items.js' )
    , util = require('util')
    , ansi = require( 'ansi' )
    , stdout = process.stdout
    , cursor = ansi(stdout)
    , words = {
              'zero': 0, 'one': 1, 'two': 2, 'three' : 3, 'four': 4,
              'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
              'on': 'on', 'our': 'our', 'night': 'night', 'ni': 'ni'
            }
    , indexOfWords = bufferIndexOf.create( words )
    , VALUE = bufferIndexOf.VALUE
    ;

printerase( );
cursor.goto( 1, 2 );
test1( );
test1( 'nine people love our module on nights like these' );
// console.log( util.inspect(indexOfWords.lookup, {showHidden: true, depth: null}) );
printlookup( indexOfWords.lookup, stdout.columns / 2 | 0 );
cursor.goto( 1,stdout.rows - 2 );


function test1 ( content ) {
  var last, buffer, digit
      ;
  content || (content = 
      'zero, one, two, three, four, five, six, seven, eight and nine');
  console.log( content );
  buffer = Buffer.from( content );
  indexOfWords.lastIndex = 0;
  while( last !== (last = indexOfWords.lastIndex)
      && undefined !== (digit = indexOfWords( buffer )) ) {
    console.log( digit + ' at ' + indexOfWords.index
        + ', lastIndex = ' + indexOfWords.lastIndex )
  }
}

function printerase ( ) {
  cursor.goto( 1, 1 ).eraseData( 0 );
}

function printlookup( lookup, x0, y0, x1, y1 ) {
  const width = (x1 || (x1 = stdout.columns)) - (x0 || (x0 = 1))
      , height = (y1 || (y1 = stdout.rows)) - (y0 || (y0 = 1))
      , keys = Object.keys( lookup )
      , rows = keys.length
      , offsetY = ( height / 2 + y0 ) | 0
      , spaceY = ( height / rows ) | 0
      , halfY = ( spaceY / 2 ) | 0
      ;
  if ( spaceY < 2 || height <= rows ) return;
  var i, j, ox, t, x, y
      ;
  x = x0 + 1;
  y = offsetY - ( spaceY * (rows - 1) / 2 ) | 0;
  cursor.goto( x++, offsetY ).write( '-' );
  keys.forEach( ( k, i ) => {
    ox = 0;
    cursor.goto( x, y );
    if ( i ) {
      y += (j = spaceY);
      while ( j-- > 0 ) cursor.down(1).write( '|' ).back(1)
    }
    cursor.write( String.fromCharCode( k ) );
    if ( undefined !== (t = lookup[k][VALUE]) ) {
      cursor.write( t = '=[' + t.toString() + ']' );
      ox = t.length;
    }
    printlookup( lookup[k], x + ox, y - halfY, x1, y - halfY + spaceY );
  } );
}



function print( lookup ) {
  
}
