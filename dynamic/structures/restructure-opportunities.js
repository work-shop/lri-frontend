"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( opportunities, jobs, options, globals ) {

    return baseStructure({

    	pageType: 'page', 
 		pageTitle: opportunities.title.rendered,   
        item: opportunities,
        jobs: jobs,

    }, options, globals);

};
