'use strict';

angular.module('wowApp').config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeCtrl'
      })
      /*
      .state('events', {
        url: '/events',
        templateUrl: 'app/components/event/eventListView.html',
        controller: 'EventController'
      })
      */
      .state('eventSingle', {
        url: '/event/:eventId',
        templateUrl: 'app/components/event/eventSingleView.html',
        controller: 'EventSingleCtrl',
      })
      .state('404', {
        url: '{path:.*}',
        template: '<div>NOT FOUND!</div>'
      });

  });