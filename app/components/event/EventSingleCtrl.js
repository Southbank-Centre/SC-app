'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventSingleCtrl
 * @description
 * # EventSingleCtrl
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('EventSingleCtrl', function($rootScope, $scope, $stateParams, eventFactory) {

    /**
     * Method for getting one event from the API
     */
    eventFactory.getEventSingle($stateParams.eventId, function(data, duration) {

      // Validation
      // Location, event name and start date must be present for the event to display
      /* if (!data.location || !data.startDate || !data.nameTitle) {
        $rootScope.$broadcast('event:pageNotFound');
      } */

      // SUCCESS
      // Attach the event data to the scope
      $scope.event = data;
      $scope.event.duration = duration;

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });