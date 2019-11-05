"use strict";

module.exports = function($) {

	function initialize() {

		if( $('.headshots-body').length > 0 ){
			checkHeadshots();
		}

	}


	function checkHeadshots(){

		//get page body sections
		var sections = item.acf.page_body_sections;

		//loop through each section, checking if section has headshots
		for (var i = 0; i < sections.length; i++) {
			//if section has headshots, pass section element and headshots object to render headshots
			if( sections[i].show_section_headshots && sections[i].section_headshots.length > 0 ){
				console.log('section ' + i + ' has ' + sections[i].section_headshots.length + ' headshots');
				var sectionPeople = sections[i].section_headshots;
				var sectionHeadshotsContainer = $('#headshots-section-' + i);
				var sectionIndex = i;
				getheadshots(sectionPeople, sectionHeadshotsContainer, sectionIndex );
			}
		}

	}


	function getheadshots(sectionPeople, sectionHeadshotsContainer, sectionIndex){

		var base = 'https://cms.leadershipri.org/wp-json/wp/v2/people/';

		for (var i = 0; i < sectionPeople.length; i++) {

			var personID = sectionPeople[i].ID;
			var personUrl = base + personID; 
			console.log(personUrl);
			var personTargetID = 'person-' + sectionIndex + '-' + personID;
			var personTarget = $('<div>').attr({ id: personTargetID });
			sectionHeadshotsContainer.append(personTarget);

			$.ajax({
				url: personUrl
			})
			.done(function(data) {
				//console.log('success');
				console.log(data);
				var personTargetIDInner = 'person-' + sectionIndex + '-' + data.id;
				var personTarget = $('#' + personTargetIDInner);
				renderPerson(personTarget, data);
			})
			.fail(function() {
				console.log('error');
			})
			.always(function() {
				//console.log('complete');
			});

		}
		
	}


	function renderPerson( personTarget, data ){

		personTarget.addClass('person');
		personTarget.attr({
			id: 'person-' + data.slug
		});

		//leaving out staff class, as staff people are styled larger
		//if( data.acf.external ){
			//personTarget.addClass('person-');
		//} else{
			//personTarget.addClass('person-staff');
		//} 

		//leaving out modal window for now, replacing link with div
		//var personLink = $('<a href="#" class="modal-toggle" data-modal-target="modal-person-' + data.slug + '">');
		var personLinkReplacement = $('<div class="person-link-replacement">');

		var personHeadshot = $('<div class="person-headshot">');
		var personHeadshotImage = $('<img>');

		if( data.acf.headshot ){
			personHeadshotImage.attr({ src: data.acf.headshot.sizes.person });
		} else{
			personHeadshotImage.attr({ src: '/public/images/person.png' });
		}

		personHeadshot.append(personHeadshotImage);

		var personInfo = $('<div class="person-info">');

		var personName = $('<h4 class="person-name">').text(data.title.rendered);

		var personTitle = $('<h4 class="person-title">');

		if( data.acf.alum === 'clri' || data.acf.alum === 'lri' ){
			if( data.acf.alum === 'clri' ){
				personTitle.text(data.acf.job_title + ",  CLRI '" + data.acf.lri_year);
			} else if( data.acf.alum === 'lri' ){
				personTitle.text(data.acf.job_title + ",  LRI '" + data.acf.lri_year);
			}
		} else{
			personTitle.text(data.acf.job_title);
		}

		personInfo.append(personName);
		personInfo.append(personTitle);

		if( data.acf.external ){
			var personExternal = $('<h5 class="person-external person-sub">').text( data.acf.external_job_title + ', ' + data.acf.external_organization);
			personInfo.append(personExternal);
		}

		personLinkReplacement.append(personHeadshot);
		personLinkReplacement.append(personInfo);

		//change to personLink when you're ready to use the modal window
		personTarget.append(personLinkReplacement);

	}


	return {
		initialize: initialize
	};

};