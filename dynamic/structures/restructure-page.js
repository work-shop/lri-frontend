"use strict";


var baseStructure = require('./base-structure.js');

/**
 * This routine restructures a generic page API response into something
 * That's usable at the template layer. It extends the base structure with
 * an item that's defined as the given page's acf object.
 *
 * @param page JSON the API response containing the page to be restructured
 * @param options JSON the API response containing the standard options object
 * @return JSON the context to render an arbitrary page template in.
 */
module.exports = function( page, options, globals ) {

    return baseStructure({

        item: page

    }, options, globals);

};
