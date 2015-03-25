'use strict';

angular.module('SC-app').config(function($stateProvider) {

    $stateProvider
      .state('app', {
        url: '',
        views: {
          'header' : {
            templateUrl: 'bower_components/SC-app-header/release/headerView.html'
          },
          'festivalNav@app' : {
            templateUrl: 'bower_components/SC-app-festival/release/festivalNavView.html'
          },
          'footer' : {
            templateUrl: 'bower_components/SC-app-festival/release/festivalFooterView.html'
          }
        }
      })
      .state('app.home', {
        url: '/',
        views: {
          'festivalBanner@': {
            templateUrl: 'bower_components/SC-app-festival/release/festivalBannerView.html'
          },
          '@': {
            templateUrl: 'bower_components/SC-app-landing-page/release/landingPageView.html'
          }
        }
      })
      .state('app.eventSingle', {
        url: '^/whats-on/:eventAlias',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-event/release/eventSingleView.html'
          }
        }
      })
      .state('app.eventList', {
        url: '^/whats-on',
        reloadOnSearch: false,
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-event/release/eventListView.html'
          }
        }
      })
      .state('app.personSingle', {
        url: '^/speakers-artists/:personAlias',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-person/release/personSingleView.html'
          }
        }
      })
      .state('app.personList', {
        url: '^/speakers-artists',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-person/release/personListView.html'
          }
        }
      })
      .state('app.pageSingle', {
        url: '^/page/:pageAlias',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-page/release/pageView.html'
          }
        }
      })
      .state('app.festivalPLanner', {
        url: '^/festival-planner',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-planner/release/plannerView.html'
          }
        }
      })
      .state('app.blogSingle', {
        url: '^/blog/:blogAlias',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-blog/release/blogSingleView.html'
          }
        }
      })
      .state('app.blogList', {
        url: '^/blog',
        views: {
          '@': {
            templateUrl: 'bower_components/SC-app-blog/release/blogListView.html'
          }
        }
      });

  });