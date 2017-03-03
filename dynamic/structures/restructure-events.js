"use strict";

var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( options, globals ) {

    return baseStructure({
 		
 		pageType: 'archive', 
 		pageTitle: 'Events',   
        item: options.acf,

    }, options, globals);

};
