'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowApp
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, eventFactory) {
    
    /**
     * Method for getting the count of events for this festival from the API
     */
    eventFactory.getEventCount(function(eventCount) {

      $scope.eventCount = eventCount;

    });

    // SEO REQUIREMENT: 
    // PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
    // we are finished with this controller. 
    // See: http://lawsonry.com/p?11040
    // 
    // $scope.htmlReady();
  });
