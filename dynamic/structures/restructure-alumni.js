"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( page, news, options, globals ) {

    return baseStructure({

 		pageType: 'page', 
 		pageTitle: 'Alumni',  
        item: page,
        news: news['alumni-news'],

    }, options, globals);

};
