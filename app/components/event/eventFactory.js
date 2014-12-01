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

            // Calculate event duration and attach to event data
            if (performance.field_end_time && performance.field_start_time) {
              performance.duration = (performance.field_end_time/60000) - (performance.field_start_time/60000);
            }

            var event = performance;
            callbackSuccess(event);

          })

          .error(callbackError);

      },

      getEventList: function (callbackSuccess, callbackError){

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'
        // $http.get('/node.json?type=performance&sort=field_start_time&direction=ASC')
        $http.get('/json/events-list-test.json')
          //.success(callbackSuccess)

          .success(function(performances) {

            angular.forEach(performances.list, function(item) {
              
              // Correct date format for start and end dates
              if (item.field_start_time) {
                item.field_start_time = item.field_start_time * 1000;
              }
              if (item.field_end_time) {
                item.field_end_time = item.field_end_time * 1000;
              }

            });

            // console.log(performances);

            var eventList = performances;
            callbackSuccess(eventList);

          })

          .error(callbackError)

      }

    };
    
  });