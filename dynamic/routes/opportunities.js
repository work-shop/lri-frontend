"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var restructureOpportunities = require('../structures/restructure-opportunities.js');
var pass = require('../transformations/pass.js');
/**
 *
 *
 */
 module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );
    var getContactForPage = require('../transformations/get-contact-for-page.js')( wp );

    return base.route(
        /**
         * Get initial set of resources we need to render the page.
         */
         [
             wp.namespace( 'acf/v2' ).options().embed(),
             wp.pages().embed().filter('name', 'opportunities' ),
             wp.jobs().embed()
         ],

        /**
         * Process the options to resolve the thoughts that should
         * be embedded on the main page.
         */
         [
             function( options, opportunities, jobs, callback ) { pass( options, callback ); },
             function(  options, opportunities, jobs, callback )   { try{ getContactForPage( opportunities[0], callback ); } catch( e ) { callback(e); } },
             function( options, opportunities, jobs, callback ) { pass( jobs, callback ); },
         ],
        /**
         * Success Case. All of the needed resources were properly resolved,
         * And the data is available for use immediately in the callback, along
         * with the request and the response.
         *
         * @param req the Express Request Object
         * @param res the Express Response Object
         * @param options JSON, the requested options data
         */
         function( req, res, options, opportunities, jobs ) {

            //console.log( opportunities );

            globals.log.log( 'Successful request to opportunities.', 'route-about:success-handler');

            try {
                res.render('page.html', urlReplace( restructureOpportunities( opportunities, jobs, options, globals ) ) );
            } catch( e ) {
                globals.log.error( e, 'route-index:error-handler');
                error( 500, e.message )( wp, config, globals )( req, res );
            }


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
