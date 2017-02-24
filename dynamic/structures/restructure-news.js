"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( news, news_categories, options, globals ) {

    return baseStructure({

        items: news,

        categories: news_categories,

    }, options, globals);

};
