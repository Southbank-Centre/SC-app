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
    
    /* 
    eventFactory.getEventAsync(function(results) {
      console.log('EventController async returned value');
      $scope.event = results.event;    
    }); 
    */

    eventFactory.success(function(data) {
      $scope.event = data.event;
    });

  });