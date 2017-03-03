"use strict";

var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( options, globals ) {

    return baseStructure({
 		
 		pageType: 'home', 
 		pageTitle: 'Home',   
        item: options.acf,

    }, options, globals);

};
