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
     * Method for getting the homepage landing page for this festival from the API
     */
    personFactory.getPersonSingle($stateParams.personId, function(person) {

      $scope.person = person;

    }, function(data, status) {

      // Failure
      // If homepage not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });
