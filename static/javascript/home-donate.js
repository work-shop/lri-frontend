"use strict";

module.exports = function($) {

	var $donateLink = $('#donate-section-link');
	var base = '#donate';
	var end = '#once';


	function updateDonateLink( amount, option ){

		if ( typeof amount === 'undefined' ){
			amount = $('.donate-option.active').data('amount');
		} else{
			$('.donate-option').removeClass('active');
			option.addClass('active');
		}

		var href = base + amount + end;
		$donateLink.attr('href', href);


	}


	function initialize() {

		$( document ).ready( function() {
			
			updateDonateLink();

			$(".donate-option").click(function(e){
				e.preventDefault();
				var amount = $(this).data('amount');
				var option = $(this);
				updateDonateLink( amount, option );
			});

		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};