"use strict";

var extend = require('util-extend');

/**
 *
 *
 *
 */
module.exports = function( compiled, options ) {

    return extend({
        options: options.acf,
        featured_image: function( item ) {
            return "Not Implemented";
        }
    }, compiled);

};
