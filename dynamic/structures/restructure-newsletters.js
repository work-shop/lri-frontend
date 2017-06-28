"use strict";


var baseStructure = require('./base-structure.js');

/**
 *
 *
 *
 */
 module.exports = function( newsletters, options, globals, paginationNumber ) {

 	return baseStructure({

 		pageType: 'archive', 
 		pageTitle: 'Newsletters',   
 		items: newsletters,
 		paging: newsletters._paging,
 		paginationNumber: paginationNumber,
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
