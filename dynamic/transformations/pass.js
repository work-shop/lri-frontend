"use strict";
/**
 * This routine acts as the identity on the options type, simply passing it along to the
 * next processing step.
 */
module.exports = function( value, callback ) { callback( null, value ); };
