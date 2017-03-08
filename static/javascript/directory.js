"use strict";


module.exports = function($, configuration) {


	var base = configuration.directory_endpoint;
	var $directory_container = $('#directory_container');
	var m1 = '<tr class="d-item"><td class="d-name">';
	var m3 = '</td><td class="d-year">';
	var m5 = '</td><td class="d-organization">';
	var m7 = '</td><td class="d-title">';
	var m9 = '</td></tr>';
	var initialType = 'lri';
	var initialYear = '2016';	


	function getAlumni( classType, classYear ){
		
		if( typeof classType === 'undefined' ){
			classType = initialType;
			classYear = initialYear;
		}

		requestAlumni( 'lri', '2016' );		

	}


	//get events from Evenbrite API
	function requestAlumni( classType, classYear ){

		var endpoint = base + '/' + classType + '/' + classYear;
		console.log(endpoint);

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function( data ) {
			console.log("success loading alumni");
			parse( data );
		})
		.fail(function() {
			console.log("error loading alumni");
		})
		.always(function() {
			//console.log("completed request for alumni");
		});
	}


	function parse( response ){

		var alumni = response.content.records;

		if( typeof alumni !== 'undefined'){
			if ( alumni.length > 0 ){
				for (var i = 0; i < alumni.length; i++) {
					render( alumni[i] );
				}
			}
		}
	}


	function render( item ){
		
		var m2,m4,m6,m8;
		
		m2 = item.Name;
		m4 = item.Class_Year__c;
		m6 = item.Current_Employer__c;	
		m8 = item.Current_Title__c;

		var markup = m1+m2+m3+m4+m5+m6+m7+m8+m9;

		$directory_container.append( markup );

	}	


	//setup this process
	function initialize() {

		$( document ).ready( function() {
			window.requestAnimationFrame( getAlumni );	
		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize
	};

};