'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('EventListCtrl', function($rootScope, $scope, $stateParams, eventFactory) {

    /**
     * Method for getting one event from the API
     */
    eventFactory.getEventList( function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      // if (!data.location || !data.startDate || !data.nameTitle) {
      //   $rootScope.$broadcast('event:pageNotFound');
      // }

      // Success
      // Attach the event data to the scope
      $scope.events = data;

      $scope.search = {field_start_day: $rootScope.festival.festivalDays[0].day};

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

    /**
    * Define filter comparator which includes all items
    * if the filter option is null, but is strict if 
    * the filter option is not null
    */
    $scope.strictOrAll = function(expected, actual){
     if (actual === null) {

       return true;

     // Only compare strings and numbers
     } else if (typeof expected !== 'string' && typeof expected !== 'number') {

       return false;

     } else {

       // Convert numbers to strings so that they can be compared
       if (typeof expected === 'number') {
         expected = expected.toString();
       }

       // Search for a match
       return expected.match(new RegExp(actual, 'i')) !== null;
     }
   }

  });