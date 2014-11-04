'use strict';

/**
 * @ngdoc overview
 * @name wowApp
 * @description
 * # wowApp
 *
 * Main module of the application.
 */
angular
  .module('wowApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    // 'ngRoute', replaced with ui.router
    'ngSanitize',
    'ngTouch',
    'ui.router'
    // 'seo'
  ])

    .config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('404', {
        url: '{path:.*}',
        template: '<div>NOT FOUND!</div>'
      });


  });
