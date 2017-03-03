"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( news, news_categories, options, globals ) {

    return baseStructure({

 		pageType: 'archive', 
 		pageTitle: 'News',   
        items: news,
        categories: news_categories,

    }, options, globals);

};
