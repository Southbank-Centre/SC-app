'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:HomeCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the homeView state
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, homeFactory, eventFactory) {

    /**
     * Method for getting the homepage landing page for this festival from the API
     */
    homeFactory.getHomepageSingle(function(homepage) {

      $scope.homepage = homepage;

    }, function(data, status) {

      // Failure
      // If homepage not found
      if (status === 404 || status === 403) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });
    
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
