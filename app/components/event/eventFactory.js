'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:EventFactory
 * @description
 * # EventFactory
 * Factory for loading event data into the wowApp
 */

angular.module('wowApp')
  .factory('eventFactory', function($http, $rootScope) {

    return {

      getEventSingle: function(eventId, callbackSuccess, callbackError) {

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

        // $http.get('/json/node.json?type=performance&sort=field_start_time&direction=ASC')
        $http.get('/json/node.json?type=performance&sort=field_start_time&direction=ASC')

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

            var eventList = performances;
            callbackSuccess(eventList);

          })

          .error(callbackError);

      },

      getEventCount: function(callbackSuccess, callbackError) {

        // $http.get('/json/node.json?type=performance&field_festival='+$rootScope.festivalId)
        $http.get('/json/event-count-test.json')

          .success(function(eventCount) {

            callbackSuccess(eventCount.count);

          })

          .error(callbackError);

      }

    };
    
  });