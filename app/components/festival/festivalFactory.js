'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:festivalFactory
 * @description
 * # festivalFactory
 * Factory for loading festival data into the wowApp
 */

angular.module('wowApp')
  .factory('festivalFactory', function($http, $rootScope) {

    return {

      getFestivalSingle: function(callbackSuccess, callbackError) {

        $http.get('/json/api/festival/'+$rootScope.festivalId)
          .success(function(festival) {

            // Correct date format for start and end dates
            if (festival.field_date_start) {
              festival.field_date_start = festival.field_date_start * 1000;
            }
            if (festival.field_date_end) {
              festival.field_date_end = festival.field_date_end * 1000;
            }

            callbackSuccess(festival);

           })
          .error(callbackError);

      }

    };
    
  });