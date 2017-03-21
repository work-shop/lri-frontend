"use strict";


/**
* This micro-module installs the desired, application-specific routes on
* for the application server.
*
*/

var index = require('./routes/index.js');
var error404 = require('./routes/error.js')( 404 );
var page = require('./routes/generic/page.js');
var about = require('./routes/about.js');
var alumni = require('./routes/alumni.js');
var makeRiStronger = require('./routes/make-ri-stronger.js');
var opportunities = require('./routes/opportunities.js');
var news = require('./routes/news.js');
var newsStory = require('./routes/news-story.js');
// var events = require('./routes/events.js');

var contact = require('./routes/generic/single.js')({
    type: "pages",
    name: "contact",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var partners = require('./routes/generic/single.js')({
    type: "pages",
    name: "partners",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var collegeCurrentClass = require('./routes/generic/single.js')({
    type: "pages",
    name: "college-current-class",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var coreCurrentClass = require('./routes/generic/single.js')({
    type: "pages",
    name: "core-current-class",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var events = require('./routes/generic/single.js')({
    type: "pages",
    name: "events",
    template: "events.html",
    restructure: require('./structures/restructure-events.js')
});


var alumniDirectory = require('./routes/generic/single.js')({
    type: "pages",
    name: "alumni-directory",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var jsonAlumniByType = require('./routes/json/alumni-type.js');

module.exports = function( express, app, config, globals ) {

    /**
    * Routes
    */
    app.get('/', index( globals.wp, config, globals ) );

    app.get('/about', about( globals.wp, config, globals ) );

    app.get('/about/opportunities', opportunities( globals.wp, config, globals ) );

    app.get('/about/partners', partners( globals.wp, config, globals ) );

    app.get('/college-program/college-current-class', collegeCurrentClass( globals.wp, config, globals ) );

    app.get('/core-program/core-current-class', coreCurrentClass( globals.wp, config, globals ) );

    app.get('/alumni', alumni( globals.wp, config, globals ) );

    app.get('/alumni/alumni-directory', alumniDirectory( globals.wp, config, globals ) );

    app.get('/make-ri-stronger', makeRiStronger( globals.wp, config, globals ) );
    app.get('/strengths', makeRiStronger( globals.wp, config, globals ) );// TODO:make this a redirect instead

    app.get('/events', events( globals.wp, config, globals ) );

    app.get('/news', news( globals.wp, config, globals ) );

    app.get('/news/:id', newsStory( globals.wp, config, globals ) );

    app.get('/contact', contact( globals.wp, config, globals ) );

    /**
     * Salesforce JSON Alumni Directory Endpoint
     */
    /**
     * Note on 'LCF'
     * =============
     * There's an issue in which class type "LCF" is not being returned
     * from this endpoint at all. The reason for this is that the 'Class_Year__c'
     * relation in salesforce is null for the 'LCF' Class_Name. This may be because
     * the LCF class only occured during a single year.
     *
     * The best way to fix this is definitely to add the year back into these
     * records on the salesforce end. That means we won't have to change anything here,
     * or make any weird special accomodations that will break things later.
     *
     * Recommend changing the years in the production and sandbox environment.
     */
    app.get('/json/alumni/:type', jsonAlumniByType(globals.wp, config, globals) );

    app.get('/json/alumni/:type/:year', jsonAlumniByType(globals.wp, config, globals) );


    /**
     * Generic page route handler.
     */
    app.get('/:id', page( globals.wp, config, globals ) );



    /**
     * TODO: We need a way to differentiate the sub-pages from the parent pages.
     * Right now, this matches ALL slugs, including slugs that should really be subpages of other slugs.
     * We'll want to get this under control in some way.
     */

    app.get('*', error404( globals.wp, config, globals ) );

    /**
    * Redirects
    */

};
