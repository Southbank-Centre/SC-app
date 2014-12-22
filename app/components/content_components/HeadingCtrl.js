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

    if ($scope.paragraph.bundle === 'subheading') {

      $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

    }

  });