"use strict";

var messages = require('../structures/error-message-structure.js');

/**
*
*
*
*/
module.exports = function( errorNumber, message ) {
    return function( wp, config, globals ) {
        return function( req,res ) {

            var response = messages["" + errorNumber + ""];

            if ( typeof response === "function" ) {

                res.render('error.html',  {
                    error_code: errorNumber,
                    message: message,
                    description: response( req ),
                    pageTitle: 'Error',
                    pageType: 'error',
                    globals: {
                        site_title: globals.site_title,
                        site_description: globals.site_description,
                        site_url: globals.site_url,
                        development: globals.development
                    },
                });

            } else {

                res.render('error.html', {
                    error_code: errorNumber,
                    message: message,
                    description: response,
                    pageTitle: 'Error',
                    pageType: 'error',
                    globals: {
                        site_title: globals.site_title,
                        site_description: globals.site_description,
                        site_url: globals.site_url,
                        development: globals.development
                    },
                } );

            }

        };
    };
}
