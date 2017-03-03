"use strict";


module.exports = function($, configuration) {

	//var dateFormat = require('date-format.js');


	var endpoint = 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + configuration.eventbrite_token;
	var $eventsContainer = $('#events');
	var m1 = '<div class="col-xs-6 event event-tile"><a href="';
	var m3 = '" ><h4>';
	var m5 = '</h4><h3>';
	var m7 = '</h3></a></div>';

	//get events from Evenbrite API
	function getEvents(){
		console.log('get events');

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function(data) {
			console.log("success loading events");
			renderEvents(data);
		})
		.fail(function() {
			console.log("error loading events");
		})
		.always(function() {
			console.log("completed request for events");
		});
	}


	function renderEvents( response ){

		var events = response.events;
		console.log(events);

		for( var i = 0; i < events.length; i++ ){
			var eventMarkup = generateMarkup( events[i] );
			// $eventsContainer.append( eventMarkup );			
		}

	}

	function generateMarkup( event ){
		var m2,m4,m6;

		m2 = event.url;

		var d = new Date(event.start.local);
		//m4 = d.format('dddd, mmmm dS, yyyy, h:MM tt');
		m4 = d;

		m6 = event.name.text;
		console.log(m2 + m4 + m6);
		var markup = m1+m2+m3+m4+m5+m6+m7;
		$eventsContainer.append( markup );			
		//return markup;
	}	


	//setup this process
	function initialize() {

		$( document ).ready( function() {
			window.requestAnimationFrame(getEvents);	
		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};