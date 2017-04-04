"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
 module.exports = function( news, news_categories, options, globals ) {

 	return baseStructure({

 		pageType: 'archive', 
 		pageTitle: 'News',   
 		items: news,
 		paging: news._paging,
 		// pageNumber: pageNumber,
 		categories: news_categories,
 		arrayOfLength: function( n ) {
 			try {
 				if(typeof n === 'string') n = parseInt(n);
 				return Array.apply( Array, new Array( n )  );
 			} catch( err ) {
 				globals.log.error( err, 'news.html' );
 			}
 		}        

 	}, options, globals);

 };
