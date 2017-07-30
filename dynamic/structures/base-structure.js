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
        globals: {
            site_title: globals.site_title,
            site_description: globals.site_description,
            site_url: globals.site_url,
            development: globals.development
        },
        featured_image: function( ) {
            return "Not Implemented";
        },
        strip_backslashes: function( item ) {
            return item.replace(/\\/g, "");
        }
    }, compiled);

};
