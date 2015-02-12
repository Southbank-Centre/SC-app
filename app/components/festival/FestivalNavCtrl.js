'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:FestivalNavCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the festivalNavView state
 */
angular.module('wowApp')
  .controller('FestivalNavCtrl', function ($scope) {

    $scope.$on('$stateChangeSuccess', function() {
      // Close mobile version of nav on location change
      $scope.navOpen = false;
    });

  });
