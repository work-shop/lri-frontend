"use strict";

var configuration = require('../../package.json').frontend;


//get third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');

//assign jquery to the window, so it can be accessed in the console
window.$ = $;

//get utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var menuUtilities = require('./menu-utilities.js')($);
var slideshows = require('./slideshows.js')($, slick);
var modals = require('./modals.js')($);
// var stickyNav = require('./sticky-nav.js')($);
// var stickyNavSidebar = require('./sticky-nav.js')($);
var scrollSpy = require('./scroll-spy.js')($);


//setup utilities
jumpUtilities.setupJumpEvents('.jump', 155, 567, 50, true);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();


//site
if( $('#page-hero') ){
	var heroShift = require('./hero-shift.js')($);
	jumpUtilities.setupJumpEvents('.page-hero-scrolly', -100, 567, 50, true);		
	heroShift.initialize();
}

//page specific
if($('body').hasClass('page')){
	jumpUtilities.setupJumpEvents('.sidebar-jump', 220, 567, 100, true);	
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 113);
}

if($('body').hasClass('page-events')){
	var events = require('./events.js')($, configuration);
	events.initialize();
}


