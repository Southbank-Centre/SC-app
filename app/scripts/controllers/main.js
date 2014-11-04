'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowApp
 */
angular.module('wowApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // SEO REQUIREMENT: 
	// PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
	// we are finished with this controller. 
	// See: http://lawsonry.com/p?11040
	// $scope.htmlReady();
  });
