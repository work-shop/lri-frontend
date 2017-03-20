"use strict";

var configuration = require('../../package.json').frontend;


//get third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');

//assign jquery to the window, so it can be accessed in the console
window.$ = $;
window.jQuery = $;

//get utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var menuUtilities = require('./menu-utilities.js')($);
var slideshows = require('./slideshows.js')($, slick);
var modals = require('./modals.js')($);
var stickies = require('./stickies.js')($);
var jqueryAccordian = require('./jquery-accordian.js');


//setup utilities
jumpUtilities.setupJumpEvents('.jump', 155, 567, 50, true);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();
stickies.initialize();


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results===null){
		return null;
	}
	else{
		return results[1] || 0;
	}
};	


//site
if( $('#page-hero') ){
	var heroShift = require('./hero-shift.js')($);
	jumpUtilities.setupJumpEvents('.page-hero-scrolly', 75, 567, 50, true);		
	heroShift.initialize();
}

//page specific
if( $('#page-sidebar').length > 0 ){
	jumpUtilities.setupJumpEvents('.sidebar-jump', 175, 567, 100, true);
}

if( $('body').hasClass('archive-events') || $('body').hasClass('page-make-ri-stronger')  ){
	var events = require('./events.js')($, configuration);
	events.initialize();
}

if($('body').hasClass('page-home')){
	var wwd = require('./wwd.js')($);
	wwd.initialize();
}

if($('body').hasClass('page-alumni-directory')){
	var directory = require('./directory.js')($, configuration);
	directory.initialize();
}

if($('body').hasClass('page-make-ri-stronger')){
	var accordian = require('./accordian.js')($);
	accordian.initialize();
}


