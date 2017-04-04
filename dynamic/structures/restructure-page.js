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
 		
 		pageType: 'page', 
 		pageTitle: page.title.rendered,   
        item: page,
        createArray: function( length ){
        	var arr = new Array( length );
        	return arr;
        },
        createArraySpan: function( start, end ){

        	var length = end - start;
        	var upperBound =  end;
        	var arr = new Array(length);
        	var j = 0;

        	for (var i = start; i <= upperBound; i++) {
        		arr[j] = i;
        		j++;
        	}

        	return arr;
        }        

    }, options, globals);

};
