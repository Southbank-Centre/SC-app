'use strict';

angular.module('wowApp').config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('wow', {
        url: '',
        views: {
          'scNav' : {
            templateUrl: 'app/components/festival/scNavView.html'
          },
          'festivalNav' : {
            templateUrl: 'app/components/festival/festivalNavView.html',
            controller: 'FestivalNavCtrl'
          }
        }
      })
      .state('wow.home', {
        url: '/',
        views: {
          'festivalBanner@': {
            templateUrl: 'app/components/home/festivalBannerView.html'
          },
          'componentFeaturedEvents@wow.home': { 
            templateUrl: 'app/components/content_components/featuredEventsView.html' 
          },
          '@': {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('wow.eventSingle', {
        url: '^/event/:eventId',
        views: {
          '@': {
            templateUrl: 'app/components/event/eventSingleView.html',
            controller: 'EventSingleCtrl',
          }
        }
      })
      .state('wow.eventList', {
        url: '^/whats-on',
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html',
            controller: 'EventListCtrl'
          }
        }
      })
      .state('wow.person', {
        url: '^/person/:personId',
        views: {
          '@': {
            templateUrl: 'app/components/person/personSingleView.html',
            controller: 'PersonSingleCtrl'
          }
        }
      })
      .state('wow.500', {
        views: {
          '@': {
            template: '<div ui-view="festivalMenu"></div><div>WEBSITE ERROR!</div>'
          }
        }
      })
      .state('wow.404', {
        url: '{path:.*}',
        views: {
          '@': {
            template: '<div ui-view="festivalMenu"></div><div>NOT FOUND!</div>'
          }
        }
      });

  });