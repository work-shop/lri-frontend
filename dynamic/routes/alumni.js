"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var restructurePage = require('../structures/restructure-alumni.js');
var filterAlumniNews = require('../transformations/filter-term-by-taxonomy.js')('alumni-news', 'news_categories');
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
             wp.pages().embed().filter('name', 'alumni' ),
             wp.news().embed()
         ],

        /**
         * Process the options to resolve the thoughts that should
         * be embedded on the main page.
         */
         [
             passOptions,
             function( options, page, news, callback )  { try{ getContactForPage( page[0], callback ); } catch( e ) { callback(e); } },
             function( options, page, news, callback ) { filterAlumniNews( news, callback ); }
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
         function( req, res, options, page, news ) {

            globals.log.log( 'Successful request to alumni.', 'route-make-ri-stronger:success-handler');

            try {
                res.render('page.html', urlReplace( restructurePage( page, news, options, globals ) ) );
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

/**
 * This routine acts as the identity on the options type, simply passing it along to the
 * next processing step.
 */
var passOptions = function( options, page, people, callback ) { callback( null, options ); };
