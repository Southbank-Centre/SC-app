'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:HeadingCtrl
 * @description
 * # HeadingCtrl
 * Controller of a sub-heading component
 */

angular.module('wowApp')
  .controller('HeadingCtrl', function($rootScope, $scope, $stateParams, pageFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageId, function(data) {

      $scope.page = data;

      if ($scope.paragraph.bundle === 'subheading') {

        $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

      }

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });