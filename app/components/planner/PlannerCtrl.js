/**
 * @ngdoc controller
 * @name wowApp.controller:PlannerCtrl
 * @controller
 *
 * @description
 * Loads the Sched js file for embedding the festival planner
 */

angular.module('wowApp')
  .controller('PlannerCtrl', function ($rootScope, $scope, $http) {

    $scope.$on('$stateChangeSuccess', function() {
      
      $http.get('/assets/sched/sched-embed.js')
        .then(function(response) {

          eval(response.data);

        });

    });

  });