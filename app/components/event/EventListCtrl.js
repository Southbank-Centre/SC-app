'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('EventListCtrl', function($rootScope, $scope, $stateParams, festivalFactory, eventFactory) {

    /**
     * Method for getting one festival from the API
     */
    festivalFactory.getFestivalSingle(function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      /* if (!data.startDate || !data.festivalName) {
        $rootScope.$broadcast('event:pageNotFound');
      } */

      // Success
      // Attach the event data to the scope
      $scope.festival = data;

    }, function(festData, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

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

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });


  });