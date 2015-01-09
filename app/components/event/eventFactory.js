'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:eventFactory
 *
 * @description
 * Factory for loading event data into the wowApp
 */

angular.module('wowApp')
  .factory('eventFactory', function($http, $rootScope, $filter, utilitiesFactory) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:eventFactory
       * @name wowApp.factory:eventFactory#getEventSingle
       * @returns {undefined} Undefined
       * @param {string} eventId The ID of the event
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single event by event ID
       */
      getEventSingle: function(eventId, callbackSuccess, callbackError) {

        $http.get('/json/api/performance/'+eventId)
          .success(function(performance) {

            // Correct date format for start and end dates
            if (performance.field_start_time) {
              performance.field_start_time = utilitiesFactory.timestampSecondsToMS(performance.field_start_time);
            }
            if (performance.field_end_time) {
              performance.field_end_time = utilitiesFactory.timestampSecondsToMS(performance.field_end_time);
            }

            // Calculate event duration and attach to event data
            if (performance.field_end_time && performance.field_start_time) {
              performance.duration = (performance.field_end_time/60000) - (performance.field_start_time/60000);
            }

            // var event = performance;
            callbackSuccess(performance);

          })

          .error(callbackError);

      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:eventFactory
       * @name wowApp.factory:eventFactory#getEventList
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data about all published events, sorted by start time ascending
       */
      getEventList: function (callbackSuccess, callbackError){

        var loadData = function() {
          $http.get('/json/node.json?type=performance&sort=field_start_time&direction=ASC&field_festival=' + $rootScope.festivalId)

          .success(function(performances) {

            angular.forEach(performances.list, function(item, i) {

              // Remove item if it isn't related to a production
              if (!item.field_production) {

                performances.list.splice(i, 1);

              } else {

                // Correct date format for start and end dates
                item.field_start_time = utilitiesFactory.timestampSecondsToMS(item.field_start_time);
                item.field_end_time = utilitiesFactory.timestampSecondsToMS(item.field_end_time);
                
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

              }

            });

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

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:eventFactory
       * @name wowApp.factory:eventFactory#getEventCount
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting the count of all published events for this festival
       */
      getEventCount: function(callbackSuccess, callbackError) {

        $http.get('/json/node.count?type=performance&field_festival='+$rootScope.festivalId)

          .success(function(eventCount) {

            callbackSuccess(eventCount.count);

          })

          .error(callbackError);

      }

    };
    
  });