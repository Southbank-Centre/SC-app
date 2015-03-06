'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:CoreCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the base state
 */
angular.module('wowApp')
  .controller('CoreCtrl', function($scope, $location, $anchorScroll, $rootScope) {

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };

    $scope.isActiveNav = function(path) {
      // match if on parent and not homepage
      if ($location.path().substr(0, path.length) === path.replace(/#/g, "") && ($location.path().substr(0, path.length) !== '/')) {
        return "active"
      // match homepage
      } else if ($location.path() === path.replace(/#/g, "")) {
        return "active"
      } else {
        return ""
      }
    };

    $scope.scroll = 0;
    
});
