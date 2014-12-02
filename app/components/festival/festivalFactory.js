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

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/festival/'+festivalId
        $http.get('/json-test/festival-json-'+$rootScope.festivalId+'.json')
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