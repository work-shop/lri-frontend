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


module.exports = function( express, app, config, globals ) {

    /**
    * Routes
    */

    app.get('/', index( globals.wp, config, globals ) );

    app.get('/about', about( globals.wp, config, globals ) );

    app.get('/alumni', alumni( globals.wp, config, globals ) );

    app.get('/make-ri-stronger', makeRiStronger( globals.wp, config, globals ) );
    // TODO:make this a redirect instead
    app.get('/strengths', makeRiStronger( globals.wp, config, globals ) );

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
