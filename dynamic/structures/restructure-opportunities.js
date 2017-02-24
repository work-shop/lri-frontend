"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( opportunities, jobs, options, globals ) {

    return baseStructure({

        item: opportunities,

        jobs: jobs,

    }, options, globals);

};
