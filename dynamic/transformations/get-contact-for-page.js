"use strict";

/**
 * This function is parameterized by a WP database cms instance.
 * Given an raw about page response, this routine maps its (potentially null)
 * contact instance into a fully-fledged contact object from the database.
 *
 */
module.exports = function( wp ) {
    return function( about, callback ) {

        if ( about.acf.page_contact ) {

            wp.people().id( about.acf.page_contact.ID ).embed()
              .then( function( person ) {

                  about.acf.page_contact = person;

                  callback( null, about );

              })
              .catch( function( e ) {
                  callback( e );
              });

        } else {

            callback( null, about[0] );

        }

    };
};
