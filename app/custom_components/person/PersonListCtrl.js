'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:PersonListCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the personListView state
 */

angular.module('wowApp')
  .controller('PersonListCtrl', function($rootScope, $scope, $stateParams, personFactory) {

    /**
     * Method for getting person list from the API
     */
    personFactory.getPersonList( function(data) {

      // Success
      // Attach the person data to the scope
      $scope.persons = data;

    }, function(data, status) {

      // Failure
      // If persons not found
      if (status === 404 || status === 403) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

});