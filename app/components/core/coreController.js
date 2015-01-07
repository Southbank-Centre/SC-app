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
  .controller('CoreCtrl', function($scope, $location, $anchorScroll) {

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };
    
});
