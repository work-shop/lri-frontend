"use strict";

var base = require('./generic/base-route.js')();
var error = require('./error.js');
var restructureNewsletters = require('../structures/restructure-newsletters.js');
/**
 *
 *
 */
 module.exports = function( wp, config, globals ) {

     var urlReplace = require('../utilities/resource-map.js')( config );

     var paginationNumber;

     return base.route(
         [
             wp.namespace( 'acf/v2' ).options().embed(),
             resolveRequestedArchivePage
         ],
         /**
          * Success Handler
          * ===============
          * Receives the resolved post object, and calls the appropriate
          * success handler, rendering the passed template.
          */
         function( req, res, options, newsletters ) {

             globals.log.log( 'successful request to newsletters archive', 'route-newsletters-archive:success-handler');

             res.render( 'newsletters.html', urlReplace( restructureNewsletters( newsletters, options, globals, paginationNumber ) ) );

         },
         /**
          * Error Handler
          * ===============
          * Receives the caught error object, and calls the
          * error handler, rendering the generic error template.
          */
         function( req, res, err ) {

            globals.log.error( err, 'route-generic-paginated-archive:error-handler');

            error( err.code || 500, err.message )( wp, config, globals )( req, res );

         }
     );


    /**
    *
    *
    *
    */
    function resolveRequestedArchivePage( callback, req ) {

        if ( req.params.id > 1 ){
            paginationNumber = req.params.id;
        }else{
            paginationNumber = 1;
        }

        wp.newsletters().perPage( 100 )
            .page( paginationNumber ).embed()
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
