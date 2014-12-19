'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:pageFactory
 * @description
 * # pageFactory
 * Factory for loading page data into the wowApp
 */

angular.module('wowApp')
  .factory('pageFactory', function($http, $rootScope, $filter) {

    return {

      getPage: function(pageId, callbackSuccess, callbackError) {

        $http.get('/json-test/'+pageId)
          .success(function(page) {

            // Correct date format for start and end dates
            /* if (performance.field_start_time) {
              performance.field_start_time = utilities.timestampSecondsToMS(performance.field_start_time);
            }
            if (performance.field_end_time) {
              performance.field_end_time = utilities.timestampSecondsToMS(performance.field_end_time);
            } */

            callbackSuccess(page);

          })

          .error(callbackError);

      }

    };
    
  });