"use strict";


module.exports = function($, configuration) {

	var base = getBaseUrl();
	var route = configuration.directory_endpoint;
	var $directoryContainer = $('#directory_container');
	var $dCount = $('#d-count');
	var $typeInput = $('#d-class-type');
	var $lriYearInput = $('#d-class-year-lri');
	var $clriYearInput = $('#d-class-year-clri');
	var $lcfYearInput = $('#d-class-year-lcf');
	var $lriOptions = $('#d-options-lri');
	var $clriOptions = $('#d-options-clri');
	var $lcfOptions = $('#d-options-lcf');	
	var m1 = '<tr class="d-item"><td class="d-name">';
	var m3 = '</td><td class="d-year">';
	var m5 = '</td><td class="d-organization">';
	var m7 = '</td><td class="d-title">';
	var m9 = '</td></tr>';
	var initialType = 'lri';
	//replaced with lri end year, set in html template
	var initialYear = LriInitialYear;	


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

		var endpoint = base + route + '/' + classType + '/' + classYear;
		console.log(endpoint);

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function( data ) {
			console.log(data);

			if( data.content.records.length > 0 ){
				parse( data );		
			} else{
				throwError();	
			}
		})
		.fail(function() {
			console.log("error loading alumni");
			throwError();
		})
		.always(function() {
			//console.log("completed request for alumni");
		});
	}


	function throwError(){
		console.log('throwError');
		$('.loader-icon').removeClass('active');
		$('.d-error-message').removeClass('hidden');	
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
		$('.loader-icon').removeClass('active');		

	}	


	function renderMeta( items ){
		var count = items.length;
		$dCount.text( count );
	}	


	//remove all items from the directory
	function emptyDirectory(){
		$('.d-item').remove();
		$('.d-error-message').addClass('hidden');
		$('.loader-icon').addClass('active');
	}


	function getBaseUrl(){
		var url = window.location.origin;
		return url;
	}


	function setupAlumni(){
		
		$( ".d-select-class" ).change(function() {
			var ct = $typeInput.val();
			toggleType( ct );

			setTimeout(function() {
				var cy = $('.d-select-year.active').val();
				getAlumni( ct, cy );
			}, 50);

		});

		//toggle the class year selections
		$( ".d-select-year" ).change(function() {
			var ct = $typeInput.val();
			var cy = $(this).val();
			getAlumni( ct, cy );
		});

	}	


	function toggleType( ct ){

		$('.d-options-year').removeClass('active');
		$('.d-select-year').removeClass('active');

		if( ct === 'lri' ){
			$lriOptions.addClass('active');
			$lriYearInput.addClass('active');
		} else if( ct === 'clri' ){
			$clriOptions.addClass('active');
			$clriYearInput.addClass('active');
		}
		else if( ct === 'lcf' ){
			$lcfOptions.addClass('active');
			$lcfYearInput.addClass('active');
		}  

		setBodyClass( ct );

	}


	function setBodyClass( ct ){
		$('body').removeClass('directory-class-lri').removeClass('directory-class-clri').removeClass('directory-class-lcf');
		var bodyClass = 'directory-class-' + ct;
		$('body').addClass( bodyClass );
	}

	//setup this process
	function initialize() {

		$( document ).ready( function() {

			initialYear = LriInitialYear;

			if ( $.urlParam('class') === 'lri' || $.urlParam('class') === 'clri' || $.urlParam('class') === 'lcf' ){
				initialType = $.urlParam('class');
				initialYear = $.urlParam('year');
				$typeInput.val( initialType );
				toggleType( initialType );
				$('.d-select-year.active').val( initialYear );		
			} 

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