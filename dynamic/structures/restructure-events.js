"use strict";

var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
module.exports = function( page, options, globals ) {

    return baseStructure({
 		
 		pageType: 'page', 
 		pageTitle: 'Events',   
        item: page,
        itemUpcomingEvents: page.acf.upcoming_events,
        itemPastEvents: page.acf.past_events

    }, options, globals);

};
