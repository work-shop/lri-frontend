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
//var scrollSpy = require('./scroll-spy.js')($);
var stickies = require('./stickies.js')($);



//setup utilities
jumpUtilities.setupJumpEvents('.jump', 155, 567, 50, true);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();
stickies.initialize();


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

if($('body').hasClass('page-events')){
	var events = require('./events.js')($, configuration);
	events.initialize();
}


