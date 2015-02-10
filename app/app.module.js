// 'use strict'; - Disabled to allow the festival planner to load (otherwise Uglify adds this to the top fo the minified scripts.js file)

/**
 * @ngdoc overview
 * @name wowApp
 * @description
 *
 * WOW - Women of the World Festival website AngularJS application.
 */
angular
  .module('wowApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angular.filter',
    'duScroll',
    'headroom'
  ]); 