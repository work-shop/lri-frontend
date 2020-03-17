"use strict";

var validTypes = ['LRI', 'CLRI', 'LCF'];

var _ = require('underscore');

module.exports = function alumniByType( salesforce ) {

    return function( callback, req ) {

        if ( validType( req.params.type ) ) {
            if ( validYear( req.params.year ) ) {

                console.log(buildQueryString( req.params.type, req.params.year ));

                salesforce.query( buildQueryString( req.params.type, req.params.year ), callback );

            } else {

                callback( new Error('RestAPIError: Invalid Year \"' + req.params.year + '\" Passed to the endpoint.' ) );

            }

        } else {

            callback( new Error('RestAPIError: Invalid Type \"' + req.params.type + '\" Passed to the endpoint.' ) );

        }

    };

};


function buildQueryString( type, year ) {
    return [
        "SELECT Name,Current_Employer__c,Current_Title__c,Class_Name__c,Class_Year__c ",
        "FROM Contact ",
        "WHERE Program_Status__c = 'Graduated' ",
        makeClassNameQuery( type ),
        makeClassYearQuery( year ),
        "ORDER BY Name ASC NULLS FIRST"
    ].join('');
}

function makeClassNameQuery( type ) {

    type = type.toUpperCase();

    if ( type === "LRI" ) {

        return validTypes
                    .filter( function( x ) { return x !== "LRI"; })
                    .map( function( x ) { return "AND Class_Name__c != '" + x + "' "; })
                    .join('');

    } else {
        return "AND Class_Name__c = '" + type + "' ";
    }
}

function makeClassYearQuery( year ) {
    if ( typeof year === "undefined" ) {
        return "";
    } else {
        return "AND Class_Year__c = '" + year + "' ";
    }
}


function validType( type ) {
    return _.contains( validTypes, type.toUpperCase() );
}

function validYear( year ) {
    try {

        return (typeof year === "undefined") || (year.length === 4 && parseInt( year ) );

    } catch ( e ) {

        return false;

    }
}
