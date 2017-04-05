"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var restructureNews = require('../structures/restructure-news.js');
/**
 *
 *
 */
 module.exports = function( wp, config, globals ) {

     var urlReplace = require('../utilities/resource-map.js')( config );

     return base.route(
         [
             wp.namespace( 'acf/v2' ).options().embed(),
             resolveRequestedArchivePage,
             wp.news_categories().embed()
         ],
         /**
          * Success Handler
          * ===============
          * Receives the resolved post object, and calls the appropriate
          * success handler, rendering the passed template.
          */
         function( req, res, options, news, news_categories ) {

             globals.log.log( 'successful request to news archive', 'route-news-archive:success-handler');

             res.render( 'news.html', urlReplace( restructureNews( news, news_categories, options, globals ) ) );

         },
         /**
          * Error Handler
          * ===============
          * Receives the caught error object, and calls the
          * error handler, rendering the generic error template.
          */
         function( req, res, err ) {

            globals.log.error( err, 'route-generic-paginated-archive:error-handler');

            error( 500, err.message )( wp, config, globals )( req, res );

         }
     );


    /**
    *
    *
    *
    */
    function resolveRequestedArchivePage( callback, req ) {

        wp.news().perPage( 10 )
            .page( req.params.id || 1 ).embed()
            .then( function( data ) {

                if ( data.length === 0 ) {

                    var e404 = new Error("404: couldn't find the requested archive page");

                    e404.code = 404;

                    callback( e404 );

                } else {

                    callback( null, data );

                }

            })
            .catch( callback );

    }

};
