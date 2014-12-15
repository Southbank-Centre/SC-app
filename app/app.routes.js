'use strict';

angular.module('wowApp').config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeCtrl'
          },
          'festivalMenu@home' : {
            templateUrl: 'app/components/festival/festivalMenuView.html',
            controller: 'FestivalMenuCtrl'
          }
        }
      })
      .state('eventSingle', {
        url: '/event/:eventId',
        views: {
          '': {
            templateUrl: 'app/components/event/eventSingleView.html',
            controller: 'EventSingleCtrl',
          },
          'festivalMenu@eventSingle' : {
            templateUrl: 'app/components/festival/festivalMenuView.html',
            controller: 'FestivalMenuCtrl'
          }
        }
      })
      .state('eventList', {
        url: '/whats-on',
        views: {
          '': {
            templateUrl: 'app/components/event/eventListView.html',
            controller: 'EventListCtrl'
          },
          'festivalMenu@eventList' : {
            templateUrl: 'app/components/festival/festivalMenuView.html',
            controller: 'FestivalMenuCtrl'
          }
        }
      })
      .state('404', {
        url: '{path:.*}',
        views: {
          '': {
            template: '<div ui-view="festivalMenu"></div><div>NOT FOUND!</div>'
          },
          'festivalMenu@404' : {
            templateUrl: 'app/components/festival/festivalMenuView.html',
            controller: 'FestivalMenuCtrl'
          }
        }
      }).state('500', {
        url: '{path:.*}',
        views: {
          '': {
            template: '<div ui-view="festivalMenu"></div><div>WEBSITE ERROR!</div>'
          },
          'festivalMenu@500' : {
            templateUrl: 'app/components/festival/festivalMenuView.html',
            controller: 'FestivalMenuCtrl'
          }
        }
      });

  });