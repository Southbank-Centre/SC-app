'use strict';

/**
 * @ngdoc overview
 * @name wowApp
 * @description
 * # wowApp
 *
 * Main module of the application.
 */
angular.module('wowApp').config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/homeView.html',
        controller: 'HomeCtrl'
      })
      .state('event', {
        url: '/event',
        templateUrl: 'components/event/eventView.html',
        controller: 'eventCtrl'
      })
      .state('404', {
        url: '{path:.*}',
        template: '<div>NOT FOUND!</div>'
      });

  });