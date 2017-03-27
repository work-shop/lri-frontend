"use strict";

module.exports = function($) {

	//set up the menu and events that interact with it 
	function setupMenus() {

		$( document ).ready( function() {
			$('.menu-toggle').click(function(e) {
				e.preventDefault();
				menuToggle();
			});	

			$('#blanket').click(function(e) {
				e.preventDefault();
				var menu = $('.menu-field.open');
				closeFieldMenu( menu );
			});					

			$('.menu-field-toggle').click(function(e) {
				var menu = $(this).data('menu');
				e.preventDefault();
				menuFieldToggle( menu, $(this) );
			});						
		});

	}


	//open and close the menu
	function menuToggle(){

		if($('body').hasClass('menu-closed')){
			$('#mobile-nav').removeClass('closed').addClass('open');
			$('#blanket').removeClass('off').addClass('on');						
			$('body').removeClass('menu-closed').addClass('menu-open');
		}
		else if($('body').hasClass('menu-open')){
			$('#mobile-nav').removeClass('open').addClass('closed');
			$('#blanket').removeClass('on').addClass('off');			
			$('body').removeClass('menu-open').addClass('menu-closed');
		}

	}

	//open and close the menu fields
	function menuFieldToggle( menu, link ){

		menu = '#menu-' + menu;
		var $menu = $(menu);
		var $link = link;

		if( $menu.hasClass('open') && $('body').hasClass('menu-open') ){
			//console.log('the targeted menu is open, so close it');
			closeFieldMenu( $menu );
		} else if ( $menu.hasClass('closed') && $('body').hasClass('menu-open') ){
			//console.log('the targeted menu is closed, but another menu is open. close the other menu(s), and open the target');
			$('.menu-field').removeClass('open').addClass('closed');
			$('.menu-field-link').removeClass('active').addClass('inactive');			
			openFieldMenu( $menu, $link );			
		} else if ( $menu.hasClass('closed') && $('body').hasClass('menu-closed') ){
			//console.log('the targeted menu is closed, and no other menus are open. Open the target');			
			openFieldMenu( $menu, $link );	
		}

	}	

	//close a specific field menu
	function closeFieldMenu( $menu ){		
		$('.menu-field-link').removeClass('active').addClass('inactive');
		$menu.removeClass('open').addClass('closed');
		$('#blanket').removeClass('on').addClass('off');			
		$('body').removeClass('menu-open').addClass('menu-closed');
	}

	//open a specific field menu
	function openFieldMenu( $menu, $link ){		
		$link.removeClass('inactive').addClass('active');
		$menu.removeClass('closed').addClass('open');
		$('#blanket').removeClass('off').addClass('on');			
		$('body').removeClass('menu-closed').addClass('menu-open');
	}


	return {
		menuToggle: menuToggle,
		setupMenus: setupMenus
	};

};