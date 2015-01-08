'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:EventSingleCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the eventSingleView state
 */

angular.module('wowApp')
  .controller('EventSingleCtrl', function ($rootScope, $scope, $stateParams, eventFactory, utilitiesFactory) {

    /**
     * Method for getting one event from the API
     */
    eventFactory.getEventSingle($stateParams.eventId, function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      /* if (!data.location || !data.startDate || !data.nameTitle) {
        $rootScope.$broadcast('event:pageNotFound');
      } */

      // SUCCESS
      // Attach the event data to the scope
      $scope.event = data;

    }, utilitiesFactory.genericHTTPCallbackError);

  });