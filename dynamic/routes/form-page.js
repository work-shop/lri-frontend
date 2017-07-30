"use strict";

var async = require('async');
var cheerio = require('cheerio');

var request = require('requestretry');
var single = require('./generic/single.js');
/**
 * This routine gets a single, top-level wordpress page object, resolved it,
 * and renders it using the basic single.js logic.
 *
 * {
 *     type: (string) the wordpress post-type that you'd like to resolve.
 *     template: (string) the name of the template to be rendered
 *     restructure: (function) the restructuring function that maps this post-type's API results to usable template contexts.
 *     resolveArchive: [optional] a (function) that implements custom route resolution logic.
 * }
 */
module.exports = function( wp, config, globals ){
    return single({
        type: "forms",
        template: "form-page.html",
        resolvePost: function( callback, req ) {
            wp.forms().embed().filter( "name", req.params.id )
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

                      console.log( post[0].guid.rendered );

                      var formid = (typeof post[0].acf.form === "number") ? post[0].acf.form : post[0].acf.form.id;

                      async.parallel({
                        form: function( next ) {

                            request({
                                    url: config.external_api + '/custom/forms?form=' + formid,
                                    json: true,
                                    maxAttempts: config.retries.attempts,
                                    retryDelay: config.retries.delay,
                                    retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
                                    fullResponse: false
                                }).then( function( formHtml ) {

                                    console.log ( formHtml );

                                    next( null, formHtml );

                                })
                                .catch( function( err ) {

                                    next( err );

                                });

                        },
                        scripts: function( next ) {

                            request({
                                    url: config.external_api + '/custom/form-scripts?form=' + formid,
                                    json: true,
                                    maxAttempts: config.retries.attempts,
                                    retryDelay: config.retries.delay,
                                    retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
                                    fullResponse: false
                                }).then( function( formScripts ) {

                                    console.log ( formScripts );

                                    next( null, formScripts );

                                })
                                .catch( function( err ) {

                                    next( err );

                                });
                        }
                      },
                      function( err, results ) {
                          if ( err ) callback( err );
                          
                          var form = cheerio.load(results.form);
                          post[0].formscripts = results.scripts;
                          post[0].formhtml = form.html();

                          callback( null, post[0]);

                      }
                  );

                  }

              })
              .catch( function( err )  {

                  callback( err );

              });
        },
        restructure: require('../structures/restructure-form-page.js')
    })( wp, config, globals );
};
