"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( page, people, news, options, globals ) {

    return baseStructure({

        item: page,

        coaches: people['coach'],

        news: news['make-ri-stronger-news']

    }, options, globals);

};
