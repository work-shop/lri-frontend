"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( page, people, news, options, globals ) {

    return baseStructure({

 		pageType: 'page', 
 		pageTitle: 'Make RI Stronger',   
        item: page,
        coaches: people['coach'],
        news: news['make-ri-stronger-news']

    }, options, globals);

};
