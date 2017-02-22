"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( about, people, options, globals ) {

    return baseStructure({

        item: about,

        board: people.board,

        staff: people.staff

    }, options, globals);

};
