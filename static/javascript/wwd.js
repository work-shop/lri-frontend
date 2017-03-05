"use strict";

module.exports = function($) {


	function wwdToggle( target, link ){

		var $target = $(target);

		$('.wwd-tab-link').removeClass('active');
		$('.wwd-tab').removeClass('active');
		$target.addClass('active');
		link.addClass('active');

	}


	function initialize() {

		$( document ).ready( function() {
			$(".wwd-tab-link").click(function(e){
				e.preventDefault();
				var target = $(this).attr('href');
				var link = $(this);
				wwdToggle( target, link );	
			});
		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};