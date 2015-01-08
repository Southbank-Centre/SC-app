'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:PersonSingleCtrl
 * @description
 * # PersonSingleCtrl
 * Controller for the single person page
 */
angular.module('wowApp')
  .controller('PersonSingleCtrl', function ($rootScope, $scope, $stateParams, personFactory, utilitiesFactory) {

    /**
     * Method for getting a single person from the API
     */
    personFactory.getPersonSingle($stateParams.personId, function(person) {

      $scope.person = person;

    }, utilitiesFactory.genericHTTPCallbackError);

  });
