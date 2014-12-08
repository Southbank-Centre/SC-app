'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:eventFactory
 * @description
 * # eventFactory
 * Factory for loading event data into the wowApp
 */

angular.module('wowApp')
  .factory('eventFactory', function($http, $rootScope, $filter) {

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

        var loadData = function() {
          $http.get('/json/node.json?type=performance&sort=field_start_time&direction=ASC')

          .success(function(performances) {

            angular.forEach(performances.list, function(item) {

              // Correct date format for start and end dates
              item.field_start_time = utilities.timestampSecondsToMS(item.field_start_time);
              item.field_end_time = utilities.timestampSecondsToMS(item.field_end_time);
              
              // Get time from event start time for use in view filters
              if (item.field_start_time) {
                
                // Use angular date filters

                // add event day to scope for use in event list view filter  
                var eventTimestamp = item.field_start_time;
                var eventStartDate = $filter('date')(eventTimestamp, 'EEEE d MMMM yyyy');
                item.field_start_day = new Date(eventStartDate).getTime().toString();

                // add event hour to scope for use in event list hour grouping  
                var eventHour = $filter('date')(eventTimestamp, 'ha');
                item.field_start_hour = eventHour;

                // *temporary* - add event type to first level of scope as cannot access from nested json
                var eventType = item.field_production.field_event_type.name;
                item.eventType = eventType;

              }

            });

            // console.log(performances);

            callbackSuccess(performances);

          })

          .error(callbackError);
        };

        // If festival data already loaded, load event list data
        if ($rootScope.festivalDataLoaded) {
          loadData();
        // If not, wait for festival data to be loaded before loading event list data
        } else {
          $rootScope.$on('event:festivalDataLoaded', function() {
            loadData();
          });
        }

      },

      getEventCount: function(callbackSuccess, callbackError) {

        $http.get('/json/node.count?type=performance&field_festival='+$rootScope.festivalId)

          .success(function(eventCount) {

            callbackSuccess(eventCount.count);

          })

          .error(callbackError);

      }

    };
    
  });