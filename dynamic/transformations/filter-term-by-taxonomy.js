"use strict";

/**
 * This routine takes the set of people off of the API, splits them up into buckets
 * and then returns an object with the people broken up by their taxonomies.
 *
 */
module.exports = function( terms, taxonomy ) {
    return function( items, callback ) {

        terms = (typeof terms === "string" ) ? [ terms ] : terms;

        var result = {};

        terms.forEach( function( term ) {
            result[ term ] = items.filter( function( item ) {
                return scanTerms( item, term, taxonomy );
            });
        });

        callback( null, result );

    };
};



/**
 * This routine determines whether a given person API response object
 * belongs to a specified term in the people_categories taxonomy.
 *
 * @param person JSON Person API Response
 * @param slug String the slug of the term to check the person against
 * @return boolean true if the given person belongs to this passed category.
 */
var scanTerms = function( item, slug, taxonomy ) {
    return (item['_embedded'] || {'wp:term': [[]]})['wp:term'][0].reduce( function( p, term ) {
        return p || (term.taxonomy === taxonomy && term.slug === slug );
    }, false);
};
