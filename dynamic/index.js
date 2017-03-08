"use strict";

var util = require('util');

var request = require('request-promise');
var jsforce = require('jsforce');

var generateConfig = require('./config.js');
var routes = require('./routes.js');
var listen = require('./listen.js'); //listen is responsible for actually starting the server
var Logger = require('./logging/index.js');


module.exports = function( express, app, config ) {
    return function() {

        var log = new Logger( config );

        request({ uri: config.external_api, json: true, })
            /**
             * The initial API request should result in the set of available namespaces
             * Installed on WordPress' rest endpoint. We request this schema to instantiate
             * the `wp-api` library.
             *
             * @param schema JSON
             */
            .then( function( schema ) {

                var conn = new jsforce.Connection({
                    loginUrl: config.salesforce.endpoint
                });

                conn.login(config.salesforce.username, [config.salesforce.password, config.salesforce.token].join(''), function( err ) {

                    if ( err ) {
                        log.error( err, 'initial-salesforce-connection-error');
                        process.exit( 1 );
                    }

                    log.log( "salesforce connection established.", "salesforce-authentication");

                    var globals = generateConfig( express, app, config, schema, conn, log );

                    routes( express, app, config, globals );

                    listen( app, config, globals );

                });

            })
            /**
             * If the initial API Request fails, there's not much we can do to recover,
             * beyond backing off, and retrying. In this case, it's better for us
             * to fail noisily, and wait for the administrator to relaunch the
             * application server later.
             *
             * @param error Error
             */
            .catch( function( error ) {

                log.error( error, 'initial-api-schema-request' );
                process.exit( 1 );

            });

    };

};
