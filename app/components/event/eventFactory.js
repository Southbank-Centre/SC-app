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

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'
        // $http.get('/node.json?type=performance&sort=field_start_time&direction=ASC')
        $http.get('/json-test/events-list-test.json')
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
              
              // Get day from event start time for use in view filter
              if (item.field_start_time) {
                
                var eventDate = new Date(item.field_start_time);
                var day = eventDate.getDay();
                var date = eventDate.getDate();
                var month = eventDate.getMonth();
                var year = eventDate.getFullYear();
                item.field_start_day = day + " " + date + " " + month + " " + year;

                // Use angular date filter instead
                // $filter(item.field_start_time)(new Date(), 'yyyy-MM-01');
                // var dateFilter = $filter('date');
                // var filteredDate = dateFilter(new Date(), 'yyyy-MM');
                // item.field_start_day = filteredDate;
              }

            });

            // console.log(performances);

            var eventList = performances;
            callbackSuccess(eventList);

          })

          .error(callbackError);

      },

      getEventCount: function(callbackSuccess, callbackError) {

        $http.get('/json/event-count-test.json')
        // $http.get('/json/node.json?type=performance&field_festival='+$rootScope.festivalId)

          .success(function(eventCount) {

            callbackSuccess(eventCount.count);

          })

          .error(callbackError);

      }

    };
    
  });