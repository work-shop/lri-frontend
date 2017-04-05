"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var async = require('async');

var restructureEvents = require('../structures/restructure-events.js');
/**
 *
 *
 */
 module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return base.route(
        /**
         * Get initial set of resources we need to render the page.
         */
         [ wp.namespace( 'acf/v2' ).options().embed() ],

        /**
         * Process the options to resolve the thoughts that should
         * be embedded on the main page.
         */
         // [ getEvents ],
        /**
         * Success Case. All of the needed resources were properly resolved,
         * And the data is available for use immediately in the callback, along
         * with the request and the response.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param options JSON, the requested options data
         */
         function( req, res, options ) {

            globals.log.log( 'Successful request to events.', 'route-events:success-handler');

            res.render('events.html', urlReplace( restructureEvents( options, globals ) ) );

        },
        /**
         * Error Case. Something went wrong reconciling one or all of the
         * requested resources. The error is supplied to the callback
         * and *you* handle the problem.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param err Error the reason for failure.
         */
         function( req, res, err ) {

            globals.log.error( err, 'route-index:error-handler');

            error( 500, err.message )( wp, config, globals )( req, res );

        });

};
