"use strict";

var extend = require('util-extend');

/**
 *
 *
 *
 */
module.exports = function( compiled, options, globals ) {

    return extend({
        options: options.acf,
        globals: globals,
        featured_image: function( item ) {
            return "Not Implemented";
        }
    }, compiled);

};
