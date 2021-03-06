"use strict";


/**
* This micro-module installs the desired, application-specific routes on
* for the application server.
*
*/
var isNormalInteger = require('./utilities/is-normal-integer.js');

var index = require('./routes/index.js');
var error404 = require('./routes/error.js')( 404 );
var page = require('./routes/generic/page.js');
var about = require('./routes/about.js');
var alumni = require('./routes/alumni.js');
var makeRiStronger = require('./routes/make-ri-stronger.js');
var opportunities = require('./routes/opportunities.js');
var news = require('./routes/news.js');
var newsStory = require('./routes/news-story.js');
var newsletters = require('./routes/newsletters.js');
var formPage = require('./routes/form-page.js');


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

var alumniPayDues = require('./routes/generic/single.js')({
    type: "pages",
    name: "pay-dues",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var events = require('./routes/generic/single.js')({
    type: "pages",
    name: "events",
    template: "events.html",
    restructure: require('./structures/restructure-events.js')
});

/**
 * TODO: Uncomment the two constructors below to define route handlers
 * for /donate and /about/history, respectively.
 */
// var donate = require('./routes/generic/single.js')({
//     type: "pages",
//     name: "donate",
//     template: "donate.html",
//     restructure: require('./structures/restructure-page.js')
// });

// var history = require('./routes/generic/single.js')({
//     type: "pages",
//     name: "history",
//     template: "history.html",
//     restructure: require('./structures/restructure-page.js')
// });

var alumniDirectory = require('./routes/generic/single.js')({
    type: "pages",
    name: "alumni-directory",
    template: "page.html",
    restructure: require('./structures/restructure-page.js')
});

var jsonAlumniByType = require('./routes/json/alumni-type.js');

module.exports = function( express, app, config, globals ) {

    /**
     * Universal CORS setting.
     */
    app.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

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

    app.get('/contact', contact( globals.wp, config, globals ) );

    app.get('/alumni/alumni-directory', alumniDirectory( globals.wp, config, globals ) );
    app.get('/alumni/directory', alumniDirectory( globals.wp, config, globals ) );
    app.get('/directory', alumniDirectory( globals.wp, config, globals ) );
    app.get('/alumni/pay-dues', alumniPayDues( globals.wp, config, globals ) );

    app.get('/make-ri-stronger', makeRiStronger( globals.wp, config, globals ) );
    app.get('/strengths', makeRiStronger( globals.wp, config, globals ) );// TODO:make this a redirect instead

    app.get('/events', events( globals.wp, config, globals ) );

    //existing news archive route
    app.get('/news', news( globals.wp, config, globals ) );

    app.get( '/news/:id', function(req, res){
        if( isNormalInteger(req.params.id)  ){
            news( globals.wp, config, globals )( req, res);
        } else{
            newsStory( globals.wp, config, globals )( req, res );
        }
    });

    app.get('/newsletters', newsletters( globals.wp, config, globals ) );

    app.get( '/forms/:id', function(req, res){
        formPage( globals.wp, config, globals )( req, res );
    });



    /**
     * Salesforce JSON Alumni Directory Endpoint
     */
    /**
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
     * TODO: Uncomment the route below to define '/about/history'
     */
    //app.get('/about/history', history( globals.wp, config, globals ) );

    /**
     * TODO: Uncomment the route below to define '/donate'
     */
    // app.get('/donate', donate( globals.wp, config, globals ) );


    /**
    * Redirects
    */

};
