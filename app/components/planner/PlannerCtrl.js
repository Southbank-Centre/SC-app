/**
 * @ngdoc controller
 * @name wowApp.controller:PageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageView state
 */

angular.module('wowApp')
  .controller('PlannerCtrl', function ($rootScope, $scope, $http) {

    $scope.$on('$stateChangeSuccess', function() {
      
      $http.get('/app/components/planner/plannerEmbed.js')
        .then(function(response) {

          eval(response.data);

        });

    });

  });