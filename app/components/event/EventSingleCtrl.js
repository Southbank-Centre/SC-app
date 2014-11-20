'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventController
 * @description
 * # EventController
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('EventSingleCtrl', function($rootScope, $scope, $stateParams, eventSingleFactory) {

    /**
     * Method for getting one event from the API
     */
    eventSingleFactory.getEventSingle($stateParams.eventId, function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      if (!data.location || !data.startDate || !data.nameTitle) {
        $rootScope.$broadcast('event:pageNotFound');
      }

      // Success
      // Attach the event data to the scope
      $scope.event = data;

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });