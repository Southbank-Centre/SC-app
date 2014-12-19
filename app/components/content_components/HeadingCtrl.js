'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:EventSingleCtrl
 * @description
 * # EventSingleCtrl
 * Controller of a single event
 */

angular.module('wowApp')
  .controller('HeadingCtrl', function($rootScope, $scope, $stateParams, pageFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageId, function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      /* if (!data.location || !data.startDate || !data.nameTitle) {
        $rootScope.$broadcast('event:pageNotFound');
      } */

      // SUCCESS
      // Attach the page data to the scope
      //$scope.heading = data.list.field_component_field_subheading;
      $scope.page = data;

        //angular.forEach($scope.paragraph, function(item) {

          if ($scope.paragraph.bundle === 'subheading') {

            $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

            // console.log($scope.paragraph);

          } else {
            // console.log($scope.paragraph);
          }

        // });


    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });