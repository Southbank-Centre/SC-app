'use strict';

angular.module('SC-app').config(function($stateProvider) {

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
      });

  });