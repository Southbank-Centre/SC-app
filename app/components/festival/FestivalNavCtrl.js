'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:FestivalNavCtrl
 * @description
 * # FestivalNavCtrl
 * Controller for the WOW festival navigation
 */
angular.module('wowApp')
  .controller('FestivalNavCtrl', function ($scope, $location) {

    $scope.isActiveNav = function(path) {
      if ($location.path() === path.replace(/#/g, "")) {
        return "active"
      } else {
        return ""
      }
    }

    $scope.$on('$locationChangeSuccess', function() {
      // Close mobile version of nav on location change
      $scope.navOpen = false;
    });

  });
