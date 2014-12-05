'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:homeFactory
 * @description
 * # homeFactory
 * Factory for loading festival homepage data into the wowApp
 */

angular.module('wowApp')
  .factory('homeFactory', function ($http, $rootScope) {

    return {

      getHomepageSingle: function (callbackSuccess, callbackError) {

        var loadData = function() {
          $http.get('/json/api/landing/'+$rootScope.festival.field_homepage.id)
            .success(callbackSuccess)
            .error(callbackError);
        };

        // If festival data already loaded, load homepage data
        if ($rootScope.festivalDataLoaded) {
          loadData();
        // If not, wait for festival data to be loaded before loading homepage data
        } else {
          $rootScope.$on('event:festivalDataLoaded', function() {
            loadData();
          });
        }

      }

    };

  });