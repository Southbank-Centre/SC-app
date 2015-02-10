'use strict';

angular.module('wowApp').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.when('', '/');

    // Enable HTML5 mode to remove # from URL in browsers that support history API
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('wow', {
        url: '',
        views: {
          'scNav' : {
            templateUrl: 'app/components/festival/scNavView.html'
          },
          'festivalNav' : {
            templateUrl: 'app/components/festival/festivalNavView.html'
          },
          'festivalFooter' : {
            templateUrl: 'app/components/festival/festivalFooterView.html'
          }
        }
      })
      .state('wow.home', {
        url: '/',
        views: {
          'festivalBanner@': {
            templateUrl: 'app/components/home/festivalBannerView.html'
          },
          '@': {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('wow.eventSingle', {
        url: '^/whats-on/:eventId',
        views: {
          '@': {
            templateUrl: 'app/components/event/eventSingleView.html'
          }
        }
      })
      .state('wow.eventList', {
        url: '^/whats-on',
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html'
          }
        }
      })
      .state('wow.person', {
        url: '^/speakers-artists/:personId',
        views: {
          '@': {
            templateUrl: 'app/components/person/personSingleView.html'
          }
        }
      })
      .state('wow.personList', {
        url: '^/speakers-artists',
        views: {
          '@': {
            templateUrl: 'app/components/person/personListView.html'
          }
        }
      })
      .state('wow.page', {
        url: '^/page/:pageId',
        views: {
          '@': {
            templateUrl: 'app/components/page/pageView.html'
          }
        }
      })
      .state('wow.festivalPLanner', {
        url: '^/festival-planner',
        views: {
          '@': {
            templateUrl: 'app/components/planner/plannerView.html'
          }
        }
      })
      .state('wow.error', {
        views: {
          '@': {
            template: '<div ui-view="festivalMenu"></div><div>It looks like something went wrong...</div>'
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