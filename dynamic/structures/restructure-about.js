"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( about, options ) {

    console.log( about );

    return baseStructure({
        options: options.acf,
        about: about.acf
    }, options);

};
