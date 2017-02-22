"use strict";

var util = require('util');
var base = require('./generic/base-route.js')();
var async = require('async');

var restructureAbout = require('../structures/restructure-about.js');
var mapResources = require('../utilities/resource-map.js');

/**
 *
 *
 */
 module.exports = function( wp, config, globals ) {
    return base.route(
        /**
         * Get initial set of resources we need to render the page.
         */
         [
             wp.namespace( 'acf/v2' ).options().embed(),
             wp.pages().embed().filter('name', 'about' ),
             wp.people().embed()
         ],

        /**
         * Process the options to resolve the thoughts that should
         * be embedded on the main page.
         */
         [
             passOptions,
             filterAbout,
             splitPeople
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
         function( req, res, options, about, people ) {

            globals.log.log( 'Successful request to index.', 'route-index:success-handler');

            res.render('about.html', restructureAbout( about, people, options, globals ) );

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

            res.render('error.html', {error_code: 500, description: err.message });

        });


};

/**
 * This routine acts as the identity on the options type, simply passing it along to the
 * next processing step.
 */
var passOptions = function( options, about, people, callback ) { callback( null, options ); };


/**
 * This routine simply filters the returned set of "about" pages (a set which is always
 * of length 1) down to the the element contained in that set.
 */
var filterAbout = function( options, about, people, callback ) {
    try { callback( null, about[0] ); }
    catch ( e ) { callback( e ); }
};

/**
 * This routine takes the set of people off of the API, splits them up into buckets
 * and then returns an object with the people broken up by their taxonomies.
 *
 */
var splitPeople = function( options, about, people, callback ) {

    callback( null, {
        board: people.filter( function( person ) {
            return !scanTerms( person, 'board' );
        }),
        staff: people.filter( function( person ) {
            return !scanTerms( person, 'staff' );
        })
    });
};

/**
 * This routine determines whether a given person API response object
 * belongs to a specified term in the people_categories taxonomy.
 *
 * @param person JSON Person API Response
 * @param slug String the slug of the term to check the person against
 * @return boolean true if the given person belongs to this passed category.
 */
var scanTerms = function( person, slug ) {
    return (person['_embedded'] || {'wp:term': [[]]})['wp:term'][0].reduce( function( p, term ) {
        return p || (term.taxonomy === "people_categories" && term.slug === slug );
    }, false);
};
