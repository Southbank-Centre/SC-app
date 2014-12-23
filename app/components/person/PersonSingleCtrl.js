'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:PersonSingleCtrl
 * @description
 * # PersonSingleCtrl
 * Controller for the single person page
 */
angular.module('wowApp')
  .controller('PersonSingleCtrl', function ($rootScope, $scope, $stateParams, personFactory) {

    /**
     * Method for getting a single person from the API
     */
    personFactory.getPersonSingle($stateParams.personId, function(person) {

      $scope.person = person;

    }, function(data, status) {

      // Failure
      // If person not found
      if (status === 404 || status === 403) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });
