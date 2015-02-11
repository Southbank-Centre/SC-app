'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:EventListCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the eventListView state
 */

angular.module('wowApp')
  .controller('EventListCtrl', function ($rootScope, $scope, $stateParams, eventFactory, utilitiesFactory) {

    /**
     * Method for getting event list from the API
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

    }, utilitiesFactory.genericHTTPCallbackError);

    /**
    * Define filter comparator which includes all items
    * if the filter option is null, but is strict if 
    * the filter option is not null
    */
    $scope.strictOrAll = function(expected, actual){
      
      // If moment objects are passed in, format them as strings for comparison
      if (typeof expected === 'object') {
        if (expected.hasOwnProperty('_isAMomentObject')) {
          if (expected._isAMomentObject) {
            expected = expected.format('YYYYMMDDhhmmss');
          }
        }
      }
      if (typeof actual === 'object') {
        if (actual.hasOwnProperty('_isAMomentObject')) {
          if (actual._isAMomentObject) {
            actual = actual.format('YYYYMMDDhhmmss');
          }
        }
      }

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