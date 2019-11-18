"use strict";


module.exports = function($, configuration) {

	var upcomingActivated = false;
	var pastActivated = false;
	var base = 'https://www.eventbriteapi.com/v3/events/';
	var token = '/?token=D2CRROODWJBGMSAFWRJ4'; //updated 8-2-19 after the events page crashed. this token is the "private token" in LRI's eventbrite account, under Developer>Api Keys>LRI Website Events API>Show API key, client secret and tokens
	var upcomingEvents, pastEvents, pastEventsByYear;
	var upcomingEventsMarkup, pastEventsMarkup;
	var upcomingCounter = 0;
	var pastCounter = 0;
	var numPastEvents = 0;

	if($('body').hasClass('page-make-ri-stronger')){
		upcomingEvents = _makeRiStrongerEvents;
	}else{
		upcomingEvents = _itemUpcomingEvents;
		pastEvents = _itemPastEvents;
		pastEventsByYear = _itemPastEventsByYear;
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
			upcomingEventsMarkup = new Array(upcomingEvents.length);
			for( var i = 0; i < upcomingEvents.length; i++ ){
				requestEvent( upcomingEvents[i].eventbrite_id, true, i );
			}
		}
		if( typeof pastEventsByYear !== 'undefined' ){
			pastEventsMarkup = new Array(pastEventsByYear.length);
			for( var i = 0; i < pastEventsByYear.length; i++ ){
				pastEventsMarkup[i] = new Array(pastEventsByYear[i].events);
				var year = pastEventsByYear[i].year;
				var yearEvents = pastEventsByYear[i].events;
				for( var j = 0; j < yearEvents.length; j++ ){
					requestEvent( yearEvents[j].eventbrite_id, false, i, j );
					numPastEvents++;
				}
			}
		}
	}


	//get events from Evenbrite API
	function requestEvent( id, upcoming, index, index2 ){

		var endpoint = base + id + token;
		//console.log(endpoint);

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function( data ) {
			//console.log("success loading events");
			addEvent( data, upcoming, index, index2 );
		})
		.fail(function( ) {
			console.log("error loading events");
		})
		.always(function() {

		});
	}


	function addEvent( event, upcoming, index, index2 ){
		generateMarkup( event, upcoming, index, index2 );
	}


	function generateMarkup( event, upcoming, index, index2 ){
		var m2,m4,m6,m8;

		m2 = event.url;

		m4 = event.logo.url;

		var d = new Date(event.start.local);
		m6 = formatDate(d);

		m8 = event.name.text;

		var markup = m1+m2+m3+m4+m5+m6+m7+m8+m9;

		if( upcoming ){
			upcomingEventsMarkup[index] = markup;
			upcomingCounter++;
			if( upcomingActivated === false && upcomingCounter === upcomingEvents.length ){
				upcomingActivated = true;
				$('#events-upcoming-content .loader-icon.active').removeClass('active');
				renderUpcomingEvents();
			}
		}
		else{
			pastEventsMarkup[index][index2] = markup;
			pastCounter++;
			if( pastActivated === false && pastCounter === numPastEvents ){
				pastActivated = true;
				$('#events-past-content .loader-icon.active').removeClass('active');
				renderPastEvents();
			}
		}

	}


	function renderUpcomingEvents(){
		$upcomingEventsContainer.append( upcomingEventsMarkup );
	}

	function renderPastEvents(){
		for( var i = 0; i < pastEventsByYear.length; i++ ){
			var year = pastEventsByYear[i].year;
			var yearEvents = pastEventsByYear[i].events;
			var $container = $('#events-' + year);
			for( var j = 0; j < yearEvents.length; j++ ){
				$container.append( pastEventsMarkup[i][j] );
			}
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
