'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventSingleCtrl
 * @description
 * # EventSingleCtrl
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('PageCtrl', function($rootScope, $scope, $stateParams, pageFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageId, function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      /* if (!data.location || !data.startDate || !data.nameTitle) {
        $rootScope.$broadcast('event:pageNotFound');
      } */

      // SUCCESS
      // Attach the event data to the scope
      $scope.page = data;

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });