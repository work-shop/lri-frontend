"use strict";

/**
 * This function is parameterized by a WP database cms instance.
 * Given an raw about page response, this routine maps its (potentially null)
 * contact instance into a fully-fledged contact object from the database.
 *
 */
module.exports = function( wp ) {
    return function( page, callback ) {

        if ( page.acf.page_contact ) {

            wp.people().id( page.acf.page_contact.ID ).embed()
              .then( function( person ) {

                  page.acf.page_contact = person;

                  callback( null, page );

              })
              .catch( function( e ) {
                  callback( e );
              });

        } else {

            callback( null, page );

        }

    };
};
