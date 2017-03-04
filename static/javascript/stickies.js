"use strict";

module.exports = function( $ ){

	var topNavHeight = 50;
	var mainNavHeight = 75;
	var stickies = {};
	var $navTop = $('#nav-top');
	var $navMain = $('#nav-main');
	var sidebar = false;
	var sidebarPadding = 100;


	function initialize(){

		$( document ).ready( function() {

			window.requestAnimationFrame( calculatePositions );
			//call calculate positions again with a delay to make sure its properly setup
			setTimeout(function() {
				window.requestAnimationFrame( calculatePositions );
			}, 1000);

			window.requestAnimationFrame( checkNavPosition );

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

			if( $('#page-sidebar').length > 0 ){
				sidebar = true;
			}	

		});

	}



	function calculatePositions(){

		stickies.navTriggerPosition = topNavHeight;
		stickies.nav = $navMain;

		if( sidebar ){
			stickies.sidebar = $('#page-sidebar');
			stickies.sidebarOffset = stickies.sidebar.offset().top;
			console.log(stickies.sidebarOffset);

			var testOffset = stickies.sidebar.offset();
			testOffset = testOffset.top;
			console.log(testOffset);

			stickies.sidebarTriggerPosition = stickies.sidebarOffset - mainNavHeight - sidebarPadding;			
		}

	}


	function checkNavPosition(){

		if( $(window).width() > 768){
			
			//nav
			if ( $('body').scrollTop() >= stickies.navTriggerPosition && stickies.nav.hasClass('static') ){
				toggleNav();
			}else if($('body').scrollTop() < stickies.navTriggerPosition && stickies.nav.hasClass('fixed') ){
				toggleNav();
			}

			//sidebar
			if( sidebar ){
				console.log( $('body').scrollTop() );
				if ( $('body').scrollTop() >= stickies.sidebarTriggerPosition && stickies.sidebar.hasClass('static') ){
					toggleSidebar();
				}else if($('body').scrollTop() < stickies.sidebarTriggerPosition && stickies.sidebar.hasClass('fixed') ){
					toggleSidebar();
				}	
			}					
		}

	}


	function toggleNav(){

		if ( stickies.nav.hasClass('static') ){
			stickies.nav.removeClass('static').addClass('fixed');
			$('body').removeClass('before').addClass('after');
		}else if( stickies.nav.hasClass('fixed') ){
			stickies.nav.removeClass('fixed').addClass('static');
			$('body').removeClass('after').addClass('before');			
		}	

	}


	function toggleSidebar(){

		if ( stickies.sidebar.hasClass('static') ){
			stickies.sidebar.removeClass('static').addClass('fixed');
			$('body').removeClass('sidebar-before').addClass('sidebar-after');
		}else if( stickies.sidebar.hasClass('fixed') ){
			stickies.sidebar.removeClass('fixed').addClass('static');
			$('body').removeClass('sidebar-after').addClass('sidebar-before');			
		}	

	}	



	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};