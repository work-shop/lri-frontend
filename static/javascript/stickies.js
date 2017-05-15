"use strict";

module.exports = function( $ ){

	var topNavHeight = 50;
	var mainNavHeight = 75;
	var stickies = {};
	var $navTop = $('#nav-top');
	var $navMain = $('#nav-main');
	var $hero = $('#page-hero');
	var $footer = $('#footer');
	var sidebar = false;
	var sidebarPadding = 100;
	var z = mainNavHeight;
	var h = 0;


	function initialize(){

		$( document ).ready( function() {

			if( $('#page-sidebar').length > 0 ){
				sidebar = true;
			}				

			window.requestAnimationFrame( calculatePositions );
			window.requestAnimationFrame( checkNavPosition );

			
			//calculate and check positions again with a delay to make sure its properly setup
			setTimeout(function() {
				window.requestAnimationFrame( calculatePositions );
				window.requestAnimationFrame( checkNavPosition );
			}, 1000);

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

		});

	}



	function calculatePositions(){

		stickies.navTriggerPosition = topNavHeight;
		stickies.nav = $navMain;
		stickies.footerHeight = $footer.outerHeight();
		stickies.documentHeight = $(document).height();

		if( sidebar ){
			if( $hero.length > 0){
				h = $hero.height();
			} else{
				h = 0;
			}
			stickies.sidebar = $('#page-sidebar');
			stickies.sidebarTriggerPosition = h + z;	
			stickies.sidebarFooterTrigger = stickies.documentHeight - stickies.footerHeight - $(window).height() - topNavHeight;
		}

	}


	function checkNavPosition(){

		if( $(window).width() > 767){
			
			//nav
			if ( $('body').scrollTop() >= stickies.navTriggerPosition && stickies.nav.hasClass('static') ){
				toggleNav();
			}else if($('body').scrollTop() < stickies.navTriggerPosition && stickies.nav.hasClass('fixed') ){
				toggleNav();
			}

			//sidebar
			if( sidebar ){
				if ( $('body').scrollTop() >= stickies.sidebarTriggerPosition && stickies.sidebar.hasClass('static') && $('body').scrollTop() < stickies.sidebarFooterTrigger ){
					toggleSidebar();
					console.log('first condition');
				}else if( $('body').scrollTop() < stickies.sidebarTriggerPosition || $('body').scrollTop() >= stickies.sidebarFooterTrigger ){
					if( stickies.sidebar.hasClass('fixed') ){
						toggleSidebar();
					}
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