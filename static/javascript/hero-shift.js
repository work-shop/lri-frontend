"use strict";

module.exports = function($) {

	var $hero = $('.page-hero-text');
	var heroShiftRatio = .61;
	var heroShiftRatioMobile = .4;


	//move the hero text a certain amount, using margin top
	function heroShift(){
		var heroHeight = $hero.outerHeight();
		var shift = heroShiftRatio;

		if( $(window).width() <= 767 ){
			shift = heroShiftRatioMobile;
		}

		var heroMarginTop = (heroHeight * shift) * -1;
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


	function jump(destination, offset){

		$('html,body').animate({
			scrollTop: $(destination).offset().top - offset
		},1500);

	}


	//return an object with methods that correspond to above defined functions
	return {
		heroShift: heroShift,
		initialize: initialize
	};

};