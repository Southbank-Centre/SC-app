'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventController
 * @description
 * # EventController
 * Controller of a single event
 */


angular.module('wowApp')
  .controller('EventController', function($scope, eventFactory) {

    eventFactory.success(function(data) {
      // $scope.events = data;

      // $scope.eventId = $stateParams.eventId;
      
      //if (event.id == $stateParams.eventId) 
      $scope.events = data;
    });

  });