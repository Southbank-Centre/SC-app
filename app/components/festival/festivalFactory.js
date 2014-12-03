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
            festival.field_date_start = utilities.timestampSecondsToMS(festival.field_date_start);
            festival.field_date_end = utilities.timestampSecondsToMS(festival.field_date_end);

            callbackSuccess(festival);

           })
          .error(callbackError);

      }

    };
    
  });