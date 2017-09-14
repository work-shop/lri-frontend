"use strict";


module.exports = function($, configuration) {

    console.log("hi");

	var activated = false;
	var base = 'https://www.eventbriteapi.com/v3/events/';
	var token = '/?token=' + configuration.eventbrite_token;

	var upcomingEvents, pastEvents;

	if($('body').hasClass('page-make-ri-stronger')){
		upcomingEvents = _makeRiStrongerEvents;
	}else{
		upcomingEvents = _itemUpcomingEvents;
		pastEvents = _itemPastEvents;
	}

	var $upcomingEventsContainer = $('#events-upcoming');
	var $pastEventsContainer = $('#events-past');

	var m1 = '<div class="col-xs-6 event event-tile"><a href="';
	var m3 = '" target="_blank"><div class="event-image"><img src="';
	var m5 = '"></div><div class="event-text"><h5 class="event-date">';
	var m7 = '</h5><h3 class="event-title">';
	var m9 = '</h3></div></a></div>';


	function getEvents(){
		if( typeof upcomingEvents !== 'undefined' ){
			for( var i = 0; i < upcomingEvents.length; i++ ){
				requestEvent( upcomingEvents[i].eventbrite_id, true );
			}
		}
		if( typeof pastEvents !== 'undefined' ){
			for( var i = 0; i < pastEvents.length; i++ ){
				requestEvent( pastEvents[i].eventbrite_id, false );
			}
		}
	}


	//get events from Evenbrite API
	function requestEvent( id, upcoming ){

		var endpoint = base + id + token;

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function( data ) {
			//console.log("success loading events");
			renderEvent( data, upcoming );
		})
		.fail(function( ) {
			console.log("error loading events");
		})
		.always(function() {

		});
	}


	function renderEvent( response, upcoming ){
		generateMarkup( response, upcoming );
	}


	function generateMarkup( event, upcoming ){
		var m2,m4,m6,m8;

		m2 = event.url;

		m4 = event.logo.url;

		var d = new Date(event.start.local);
		m6 = formatDate(d);

		m8 = event.name.text;

		var markup = m1+m2+m3+m4+m5+m6+m7+m8+m9;

		if( upcoming ){
			$upcomingEventsContainer.append( markup );
		}
		else{
			$pastEventsContainer.append( markup );
		}

		if( activated === false ){
			activated = true;
			$('.loader-icon.active').removeClass('active');
		}


	}


	function formatDate( d ){
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var month = d.getMonth();
		var date = months[month] + ' ' + d.getDate() + ', ' + d.getFullYear();
		return date;
	}


	//setup this process
	function initialize() {

		$( document ).ready( function() {
			window.requestAnimationFrame( getEvents );
		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};
