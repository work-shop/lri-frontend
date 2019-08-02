"use strict";


var request = require('requestretry');
var jsforce = require('jsforce');

var generateConfig = require('./config.js');
var routes = require('./routes.js');
var listen = require('./listen.js'); //listen is responsible for actually starting the server
var Logger = require('./logging/index.js');


module.exports = function( express, app, config ) {
    return function() {

        require('dnscache')({
            'enable': true,
            'ttl': 300,
            'cachesize': 1000
        });

        var log = new Logger( config );

        request({
            url: config.external_api,
            json: true,
            maxAttempts: config.retries.attempts,
            retryDelay: config.retries.delay,
            retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
            fullResponse: false
        })
            /**
             * The initial API request should result in the set of available namespaces
             * Installed on WordPress' rest endpoint. We request this schema to instantiate
             * the `wp-api` library. This request will retry 5 times in case of a dns resolution issue.
             *
             * @param schema JSON
             */
             .then( function( schema ) {

                var conn = new jsforce.Connection({ loginUrl: config.salesforce.endpoint });

                conn.login(config.salesforce.username, [config.salesforce.password, config.salesforce.token].join(''), function( err ) {

                    if ( err ) {
                        log.error( err, 'initial-salesforce-connection-error');
                       // process.exit( 1 ); //commented out this line so the site wouldn't break if there was a salesforce API Error
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
               // process.exit( 1 ); //commented out this line so the site wouldn't break if there was a salesforce API Error

           });

         };

     };
