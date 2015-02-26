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
        //controller: 'EventListCtrl',
        reloadOnSearch: false,
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html',
            //controller: 'EventListCtrl'
          }
        }
      })
      /* .state('wow.eventListsearchDay', {
        url: '^/whats-on?day',
        //controller: 'EventListCtrl',
        //reloadOnSearch: false,
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html'
          }
        },
        onEnter: function() {
            //console.log("OnEnter: contacts.content");
            //alert('search initiated');
        }
      }) */
      /* .state('wow.eventList.searchType', {
        url: '?type',
        reloadOnSearch: false,
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html'
          }
        }
      }) */

      /* .state('wow.eventList.search', {
        // url: '/?type',
        url:  "/{d}/{t}",
        params: {
            d: {value: 'day'},
            t: {value: 'type'}
        },
        onEnter: function() {
            //console.log("OnEnter: contacts.content");
            alert('search initiated');
        }
      }) */

      /* .state('wow.eventListFiltered', {
        url: '^/events/:eventTypeParam',
        reloadOnSearch: false,
        views: {
          '@': {
            templateUrl: 'app/components/event/eventListView.html'
          }
        },
        onEnter: function() {
            //console.log("OnEnter: contacts.content");
            //alert('search initiated');
        }
      }) */

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
            template: '<div ui-view="festivalMenu"></div><h2 style="padding:20px">We&apos;re undergoing maintenance at the moment. Please check back a bit later.</h2>'
          }
        }
      })
      .state('wow.404', {
        url: '{path:.*}',
        views: {
          '@': {
            template: '<div ui-view="festivalMenu"></div><h1 style="padding-left:20px">Page not found.</h1>'
          }
        }
      });

  });