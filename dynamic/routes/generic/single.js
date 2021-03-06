"use strict";


var base = require('./base-route.js')();
var error = require('../error.js');
var identity = function( x ) { return x; };
/**
 * Gets a single object from a single wordpress post-type.
 *
 * {
 *     type: (string) the wordpress post-type that you'd like to resolve.
 *     template: (string) the name of the template to be rendered
 *     restructure: (function) the restructuring function that maps this post-type's API results to usable template contexts.
 *     resolvePost: [optional] a (function) that implements custom route resolution logic.
 * }
 */
 module.exports = function( routeOptions ) {

     return function( wp, config, globals ) {

         var getContactForPage = require('../../transformations/get-contact-for-page.js')( wp );
         var urlReplace = require('../../utilities/resource-map.js')( config );

         return base.route(
             [
                 wp.namespace( 'acf/v2' ).options().embed(),
                 routeOptions.resolvePost || resolveRequestedPost
             ],

             [
                 function( options, post, callback ) { callback( null, options ); },
                 function( options, post, callback ) { getContactForPage( post, callback ); }
             ],
             /**
              * Success Handler
              * ===============
              * Receives the resolved post object, and calls the appropriate
              * success handler, rendering the passed template.
              */
             function( req, res, options, post ) {

                 globals.log.log( 'successful generic request', 'route-generic-single:success-handler');

                 res.render( routeOptions.template, urlReplace( (routeOptions.restructure || identity)( post, options, globals ) ) );

             },
             /**
              * Error Handler
              * ===============
              * Receives the caught error object, and calls the
              * error handler, rendering the generic error template.
              */
             function( req, res, err ) {

                globals.log.error( err, 'route-generic-single:error-handler');

                error( err.code || 500, err.message )( wp, config, globals )( req, res );

             }
         );


        /**
        *
        *
        *
        */
        function resolveRequestedPost( callback, req ) {

          wp[ routeOptions.type ]().embed().filter('name', req.params.id || routeOptions.name )

            .then( function( post ) {

                if ( post.length === 0 ) {

                    var e404 = new Error("404: couldn't find the requested resource");

                    e404.code = 404;

                    callback( e404 );

                } else if ( post.length > 1 ) {

                    var e500 = new Error("500: ConsistencyError: the API returned multiple posts with the same slug.");

                    e500.code = 500;

                    callback( e500 );

                } else {

                    callback( null, post[0] );

                }

            })
            .catch( function( err )  {

                callback( err );

            });

        }
     };
};
