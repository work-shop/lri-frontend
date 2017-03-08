"use strict";


var getAlumniByType = require('../../transformations/salesforce-get-alumni.js');

var base = require('../generic/base-route.js')();


module.exports = function( wp, config, globals ) {

    return base.route(

        /**
         * Get the alumni by :type and optional :year parameter.
         * This transformation does some checking to make sure the passed
         * :type is one of "lri", "clri", or "lcf", and year is Something
         * that looks remotely like a recent year.
         */
        [ getAlumniByType( globals.salesforce ) ],

        /**
         * Success Handler
         * ===============
         * Receives the resolved post object, and calls the appropriate
         * success handler, rendering the recovered json.
         */
        function( req, res, alumni ) {

            globals.log.log( 'Successful request to json - alumni endpoint.', 'route-json-alumni-type:success-handler');

            globals.log.log( alumni, "route-json-alumni-type:success-handler" );

            res.json( { result: "success", content: alumni } );

        },

        /**
         * Error Handler
         * ===============
         * Receives the caught error object, and calls the
         * error handler, rendering the generic error json.
         */
        function( req, res, err ) {

            globals.log.error( err, 'route-json-alumni-type:error-handler');

            res.status(400).json( { result: "failure", message: err.message } );

        }
    );
};
