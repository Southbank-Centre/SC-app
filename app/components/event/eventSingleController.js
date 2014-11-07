'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventController
 * @description
 * # EventController
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('EventSingleCtrl', function($rootScope, $scope, $stateParams, eventFactory) {

    /**
     * Method for getting one event from the API
     */
    eventFactory.getEventSingle($stateParams.eventId, function(data) {

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