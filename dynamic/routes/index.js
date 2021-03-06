"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var async = require('async');

var restructureIndex = require('../structures/restructure-index.js');
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
         [ getNewsStories ],
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

            globals.log.log( 'Successful request to index.', 'route-index:success-handler');

            res.render('index.html', urlReplace( restructureIndex( options, globals ) ) );

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


    function getNewsStories( options, callback ) {

        async.map(( options.acf.featured_news || []), function( story, next ){
            wp.news().param('_embed', true).filter( 'name', story.news_story.post_name )
            .then( function( data ) {
                next( null, data[0] );
            }).catch( function( err ) {
             next( err );
         });

        },
        function( err, result ) {

            options.acf.featured_news = result;

            callback( err, options );

        });
    }

};
