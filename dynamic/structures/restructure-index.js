"use strict";

var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( options ) {

    return baseStructure({

        item: options.acf,
        options: options.acf

    }, options);

};
