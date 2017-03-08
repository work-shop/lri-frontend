"use strict";


module.exports = function($, configuration) {

	var base = configuration.directory_endpoint;
	var $directoryContainer = $('#directory_container');
	var $dCount = $('#d-count');
	var m1 = '<tr class="d-item"><td class="d-name">';
	var m3 = '</td><td class="d-year">';
	var m5 = '</td><td class="d-organization">';
	var m7 = '</td><td class="d-title">';
	var m9 = '</td></tr>';
	var initialType = 'lri';
	var initialYear = '2016';	


	function getAlumni( classType, classYear ){

		emptyDirectory();
		
		if( typeof classType === 'undefined' ){
			var _classType = initialType;
			var _classYear = initialYear;
			requestAlumni( _classType, _classYear );	
		} else{
			requestAlumni( classType, classYear );		
		}

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
		renderMeta( alumni );

		if( typeof alumni !== 'undefined'){
			if ( alumni.length > 0 ){
				for (var i = 0; i < alumni.length; i++) {
					renderItem( alumni[i] );
				}
			}
		}
	}


	function renderItem( item ){
		
		var m2,m4,m6,m8;
		
		if ( item.Name === null){
			m2 = '';
		} else{
			m2 = item.Name;
		}
		if ( item.Class_Year__c === null){
			m4 = '';
		} else{
			m4 = item.Class_Year__c;
		}
		if ( item.Current_Employer__c === null){
			m6 = '';
		} else{
			m6 = item.Current_Employer__c;
		}
		if ( item.Current_Title__c === null){
			m8 = '';
		} else{
			m8 = item.Current_Title__c;
		}

		var markup = m1+m2+m3+m4+m5+m6+m7+m8+m9;

		$directoryContainer.append( markup );

	}	


	function renderMeta( items ){
		
		var count = items.length;

		$dCount.text( count );
		


	}	


	//remove all items from the directory
	function emptyDirectory(){
		$('.d-item').remove();
	}


	function setupAlumni(){
		$( ".d-select" ).change(function() {
			var ct = $('#d-class-type').val();
			var cy = $('#d-class-year').val();
			getAlumni( ct, cy );
		});

	}


	//setup this process
	function initialize() {

		$( document ).ready( function() {
			getAlumni( initialType, initialYear);	
			setupAlumni();	
		});

	}

	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize,
		getAlumni: getAlumni,
	};

};