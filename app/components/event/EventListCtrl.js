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
  .controller('EventListCtrl', function ($rootScope, $scope, $stateParams, eventFactory, utilitiesFactory, $filter) {

    /**
     * Method for getting event list from the API
     */
    eventFactory.getEventList( function(data) {

      // Number of items to load each time
      // when infinite scroll point has been reached
      var numToLoad = 10;

      // Success
      // Attach the event data to the scope
      $scope.allEvents = data;
      $scope.events = $scope.allEvents.list.slice(0, numToLoad);

      /**
       * Callback for infinite scroll mechanism.
       * Load the next set of events into the page
       * and store how many have been loaded
       */
      $scope.loadNextEvents = function() {

        var len = $scope.events.length;
        $scope.events.push.apply($scope.events, $scope.allEvents.list.slice(len, len + numToLoad));

      };

      /**
       * Sets the number of events loaded to just be the initial
       * 20, so that infinite scrolling can be used
       * after filters are changed
       */
      $scope.resetEvents = function() {

        // If there are select box filters applied,
        // pass through all events
        if ($scope.selectFiltersApplied()) {

          $scope.events = $scope.allEvents.list;

        // If not, pass through the first 20 because
        // infinite scroll will be in use
        } else {

          $scope.events = $scope.allEvents.list.slice(0, numToLoad);

        }

      };

    }, utilitiesFactory.genericHTTPCallbackError);

    /**
     * Define filter comparator which includes all items
     * if the filter option is null, but is strict if 
     * the filter option is not null
     */
    $scope.strictOrAll = function(expected, actual) {
      
      // If moment objects are passed in, format them as strings for comparison
      if (typeof expected === 'object' && actual !== null) {
        if (expected.hasOwnProperty('_isAMomentObject')) {
          if (expected._isAMomentObject) {
            expected = expected.format('YYYYMMDDhhmmss');
          }
        }
      }
      if (typeof actual === 'object' && actual !== null) {
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

    /**
     * Determines whether or not the 'All days' item has been selected
     * from the event day filter
     */
    $scope.showAllDays = function() {

      if (angular.element('#event-day-filter').val() === "") return true;

    };

    /**
     * Determines whether or not any of the select filters are applied
     */
    $scope.selectFiltersApplied = function() {

      var selectFilterApplied = false;
      angular.forEach(angular.element('.event-filter'), function(el) {
        if (angular.element(el).val() !== "") {
          selectFilterApplied = true;
          return false;
        }

      });

      return selectFilterApplied;

    };

  });