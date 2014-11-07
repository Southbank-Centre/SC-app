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
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeCtrl'
      })
      .state('events', {
        url: '/events',
        templateUrl: 'app/components/event/eventListView.html',
        controller: 'EventController'
      })
      .state('eventSingle', {
        url: "/event/:eventId",
        templateUrl: 'app/components/event/eventSingleView.html',
        controller: 'EventController',
        /* controller: function ($stateParams) {
            // If we got here from a url of /contacts/42
            // expect($stateParams).toBe({contactId: 42});
            console.log($stateParams);
        } */
        /* resolve: {
            promiseObj2:  function($http){
            return $http({method: 'GET', url: '/someUrl'})
               .then (function (data) {
                   return doSomeStuffFirst(data);
               });
         }
        } */
      })
      .state('404', {
        url: '{path:.*}',
        template: '<div>NOT FOUND!</div>'
      });

  });