'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:EventFactory
 * @description
 * # EventFactory
 * Factory for loading event data into the wowApp
 */

angular.module('wowApp')
  .factory('eventFactory', function($http) {

    return {

      getEventSingle: function(eventId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/event/'+eventId
        // $http.get('json-test/'+eventId+'.json')
        $http.get('/json/api/performance/'+eventId)
          .success(function(performance) {

            // Correct date format for start and end dates
            if (performance.field_start_time) {
              performance.field_start_time = performance.field_start_time * 1000;
            }
            if (performance.field_end_time) {
              performance.field_end_time = performance.field_end_time * 1000;
            }

            var event = performance;
            var duration = (performance.field_end_time/60000) - (performance.field_start_time/60000);

            callbackSuccess(event, duration);

          })

          .error(callbackError);

      },

      getEventList: function (callbackSuccess, callbackError){

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'
        $http.get('/json/events-list-test.json')
          .success(callbackSuccess)
          .error(callbackError)

      }

    };
    
  });