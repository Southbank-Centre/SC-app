'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:PageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageView state
 */

angular.module('wowApp')
  .controller('PlannerCtrl', function ($rootScope, $scope) {

    $scope.$on('$viewContentLoaded', function() {
      
      if(document.getElementById('sched-embed').style.display==='none'){
        //console.log('iframe loaded');
      } else {
        //console.log('not loaded');
        window.location.reload();
      }

    });

  });