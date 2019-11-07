"use strict";

var modals = require('./modals.js')($);

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
				//console.log('section ' + i + ' has ' + sections[i].section_headshots.length + ' headshots');
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
				renderPerson(personTarget, data, sectionHeadshotsContainer);
			})
			.fail(function() {
				console.log('error');
			})
			.always(function() {
				//console.log('complete');
			});

		}
		
	}


	function renderPerson( personTarget, data, sectionHeadshotsContainer ){

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
		var personLink = $('<a href="#" class="modal-toggle" data-modal-target="modal-person-' + data.slug + '">');
		//var personLinkReplacement = $('<div class="person-link-replacement">');

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

		personLink.append(personHeadshot);
		personLink.append(personInfo);

		//change to personLink when you're ready to use the modal window
		personTarget.append(personLink);

		var personModal = $('<div class="modal modal-person off" id="modal-person-' + data.slug + '">');
		var modalBody = $('<div class="modal-body">');
		var modalRow = $('<div class="row">');

		var m1,m2,m3,m4,m5,m6,m7,m8,m9;
		var person = data; // makes using modal content from html template easier

		m1 = '<div class="modal modal-person off" id="modal-person-' + data.slug + '"><div class="modal-body"><div class="row"><div class="col-md-4 col-xl-3 modal-person-info"><div class="person-headshot">';

		if( data.acf.headshot ){
			m1  += '<img src="' + person.acf.headshot.sizes.person + '">';
		} else{
			m1 += '<img src="/public/images/person.png">';
		}

		m1 += '</div><div class="person-info"><h4 class="person-name">' +  person.title.rendered + '</h4><h4 class="person-title">' + person.acf.job_title;

		if( data.acf.alum === 'clri' || data.acf.alum === 'lri' ){
			if( data.acf.alum === 'clri' ){
				m1 += ',  CLRI ' + data.acf.lri_year;
			} else if( data.acf.alum === 'lri' ){
				m1 += ',  LRI ' + data.acf.lri_year;
			}
		}

		m1 += '</h4>';

		if( person.acf.external === false ){
			if( person.acf.email ){
				m1 += '<h4 class="person-email"><a href="mailto:{{ person.acf.email|safe }}" target="_blank">'+ person.acf.email + '</a></h4>';
			}
			if( person.acf.phone_number ){
				if( person.acf.email ){
					m1 += '<h4 class="person-phone_number">'+ person.acf.phone_number + '</h4>';
				}
			}
		}

		if( person.acf.external ){
			m1 += '<h5 class="person-external person-sub">';
			if( person.acf.external_job_title ){
				m1 += person.acf.external_job_title;
			}
			if (person.acf.external_organization ){
				m1 += ', ';
			}
			if (person.acf.external_organization ){
				m1 += person.acf.external_organization;
			}
		}

		m1 += '</h5>';


		if ( person.acf.contact_about ){
			m1 += '<h5 class="person-contact-about person-sub">' + person.acf.contact_about + '</h5>';
		}

		m1 += '</div>';

		if ( person.acf.strengths ){
			m1 += '<div class="person-strengths"><ul class="person-strenghts-list"><li class="label">CliftonStrenghts Top 5:</li><br><li>' + person.acf.strength_1 + '</li><li>' + person.acf.strength_2 + '</li><li>' + person.acf.strength_3 + '</li><li>' + person.acf.strength_4 + '</li><li>' + person.acf.strength_5 + '</li></ul></div>';
		}
		
		m1 += '</div><div class="col-md-8 col-xl-8"><p class="person-bio">' + person.acf.bio + '</p></div></div></div></div>';

		sectionHeadshotsContainer.append(m1);

		modals.setupModals();

	}


	return {
		initialize: initialize
	};

};