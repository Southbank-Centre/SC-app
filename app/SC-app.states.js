'use strict';

angular.module('SC-app').config(function($stateProvider) {

    $stateProvider
      .state('app', {
        url: '',
        views: {
          // 'scNav' : {
          //   templateUrl: 'app/components/festival/scNavView.html'
          // },
          'festivalNav' : {
            templateUrl: 'bower_components/SC-app-festival/release/festivalNavView.html'
          },
          'festivalFooter' : {
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
            templateUrl: 'app/custom_components/home/homeView.html',
            controller: 'HomeCtrl'
          }
        }
      });

  });