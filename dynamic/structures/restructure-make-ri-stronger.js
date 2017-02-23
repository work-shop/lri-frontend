"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( page, people, options, globals ) {

    return baseStructure({

        item: page,

        coaches: people.coaches,

        staff: people.staff

    }, options, globals);

};
