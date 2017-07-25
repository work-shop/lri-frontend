"use strict";


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
 module.exports = single({
     type: "forms",
     template: "form-page.html",
     restructure: require('../structures/restructure-form-page.js')
 });
