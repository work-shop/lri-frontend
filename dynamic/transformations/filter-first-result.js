"use strict";
/**
 * This routine simply filters the returned set of "about" pages (a set which is always
 * of length 1) down to the the element contained in that set.
 */
module.exports = function( item, callback ) {
    try { callback( null, item[0] ); }
    catch ( e ) { callback( e ); }
};
