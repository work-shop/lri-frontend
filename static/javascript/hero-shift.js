"use strict";

module.exports = function($) {

	var $hero = $('.page-hero-text');
	var heroShiftRatio = .61;


	//move the hero text a certain amount, using margin top
	function heroShift(){
		var heroHeight = $hero.outerHeight();
		var heroMarginTop = (heroHeight * heroShiftRatio) * -1;
		$hero.css('margin-top', heroMarginTop);
	}	


	//initialize
	function initialize() {

		$( document ).ready( function() {
			window.requestAnimationFrame( heroShift );	
		});

		$( window ).resize( function() {
			window.requestAnimationFrame( heroShift );	
		});		

	}


	//return an object with methods that correspond to above defined functions
	return {
		heroShift: heroShift,
		initialize: initialize
	};

};