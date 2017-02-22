"use strict";

var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( options, globals ) {

    return baseStructure({

        item: options.acf,

    }, options, globals);

};
