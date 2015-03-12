'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:HeadingCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the HeadingView state
 */

angular.module('wowApp')
  .controller('HeadingCtrl', function($rootScope, $scope, $stateParams, pageFactory) {

    if ($scope.paragraph.bundle === 'subheading') {

      $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

    }

  });