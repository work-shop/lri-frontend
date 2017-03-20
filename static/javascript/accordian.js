"use strict";


module.exports = function($, jqueryAccordian) {


	//initialize
	function initialize() {

		$( document ).ready( function() {
			console.log('accordian');
			$('.accordion').accordion({
				"transitionSpeed": 400
			});
		});

	}


	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};