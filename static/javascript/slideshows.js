"use strict";

module.exports = function($, slick) {

	function createSlideshows(){

		$('.slick-default').slick({
			slidesToShow: 1,
			dots: true,
			autoplay: true,
			autoplaySpeed: 7000,
			speed: 400
		});

		$('.slick-home').slick({
			slidesToShow: 1,
			dots: false,
			arrows: false,
			autoplay: true,
			fade: true,
			autoplaySpeed: 4000,
			speed: 2500
		});		

		$('.slick-default').on('afterChange', function(){
			$('.slick-default').slick('slickPause');
		});
		
	}

	function setupSlideshows() {

		$( document ).ready( function() {
			createSlideshows();
		});

	}

	return {
		createSlideshows: createSlideshows,
		setupSlideshows: setupSlideshows
	};
};