"use strict";

module.exports = function( $ ){

	var topNavHeight = 50;
	var mainNavHeight = 75;
	var nav = {};
	var $navTop = $('#nav-top');
	var $navMain = $('#nav-main');


	function calculatePositions(){

		nav.triggerPosition = topNavHeight;
		nav.element = $navMain;

		// stickyNav.offset = stickyNav.element.offset();
		// stickyNav.offset = stickyNav.offset.top;

		// if( $(window).width() > 768){
		// 	stickyNav.triggerPosition = stickyNav.offset - stickyNav.navHeight;	
		// }
		// else{
		// 	stickyNav.triggerPosition = stickyNav.offset - stickyNav.mobileNavHeight;				
		// }

		// console.log('calculatePositions');
		// console.log('stickyNav.triggerPosition = ' + stickyNav.triggerPosition); 	
	}


	function checkNavPosition(){



		if( $(window).width() > 768){

			if ( $('body').scrollTop() >= nav.triggerPosition && nav.element.hasClass('static') ){
				
				toggleNav();

			}else if($('body').scrollTop() < nav.triggerPosition && nav.element.hasClass('fixed') ){
				
				toggleNav();
			
			}			
		}

	}


	function toggleNav(){

		if ( nav.element.hasClass('static') ){
			nav.element.removeClass('static').addClass('fixed');
			$('body').removeClass('before').addClass('after');
		}else if( nav.element.hasClass('fixed') ){
			nav.element.removeClass('fixed').addClass('static');
			$('body').removeClass('after').addClass('before');			
		}	

	}


	function setupNav() {

		$('body').on({ 'touchmove': function(e) { 
			window.requestAnimationFrame( checkNavPosition ); } 
		});

		$( window ).scroll( function() {
			window.requestAnimationFrame( checkNavPosition );
		});

		$( window ).resize( function() {
			window.requestAnimationFrame( calculatePositions );
			window.requestAnimationFrame( checkNavPosition );
		});		

	}


	//return an object with methods that correspond to above defined functions
	return {
		setupNav: setupNav
	};

};