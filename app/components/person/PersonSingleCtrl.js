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

      /* TEMPORARY */
      person.field_image = {
        file: {
          url: 'http://collider.com/wp-content/uploads/die-hard-with-a-vengeance-bruce-willis.jpg'
        },
        caption: 'Yippeekiyay Yippeekiyay Yippeekiyay'
      }

      $scope.person = person;

      console.log($scope.person);

    }, function(data, status) {

      // Failure
      // If homepage not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });
