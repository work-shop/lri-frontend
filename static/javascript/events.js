"use strict";


module.exports = function($, configuration) {

	//var dateFormat = require('date-format.js');

	var base = 'https://www.eventbriteapi.com/v3/events/';
	var token = '/?token=' + configuration.eventbrite_token;
	var $upcomingEventsContainer = $('#events-upcoming');
	var $pastEventsContainer = $('#events-past');
	var upcomingEvents = _itemUpcomingEvents;
	var pastEvents = _itemPastEvents;

	var m1 = '<div class="col-xs-6 event event-tile"><a href="';
	var m3 = '" ><h4>';
	var m5 = '</h4><h3>';
	var m7 = '</h3></a></div>';


	function getEvents(){
		//console.log(upcomingEvents);
		for( var i = 0; i < upcomingEvents.length; i++ ){
			requestEvent( upcomingEvents[i].eventbrite_id, true );
		}
		for( var i = 0; i < pastEvents.length; i++ ){
			requestEvent( pastEvents[i].eventbrite_id, false );
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
		.fail(function() {
			console.log("error loading events");
		})
		.always(function() {
			//console.log("completed request for events");
		});
	}


	function renderEvent( response, upcoming ){
		
		var eventMarkup = generateMarkup( response, upcoming );
		
	}


	function generateMarkup( event, upcoming ){
		var m2,m4,m6;
		
		m2 = event.url;
		var d = new Date(event.start.local);
		//m4 = d.format('dddd, mmmm dS, yyyy, h:MM tt');
		m4 = d;
		m6 = event.name.text;
		
		var markup = m1+m2+m3+m4+m5+m6+m7;

		if( upcoming ){
			$upcomingEventsContainer.append( markup );			
		}
		else{
			$pastEventsContainer.append( markup );			
		}
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