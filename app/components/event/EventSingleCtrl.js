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
  .controller('EventSingleCtrl', function ($rootScope, $scope, $stateParams, $state, eventFactory, utilitiesFactory) {

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
      
      // If the state parameter does not match event title, then display a 404 page
      /* if ($stateParams.eventTitle !== $scope.event.title) {
        $state.go('wow.404')
      } */

      // console.log($stateParams.eventTitle);

    }, utilitiesFactory.genericHTTPCallbackError);

  });