'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowApp
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, festivalFactory, eventFactory) {
    
    /**
     * Method for getting one festival from the API
     */
    festivalFactory.getFestivalSingle(function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      if (!data.field_date_start || !data.title) {
        $rootScope.$broadcast('event:pageNotFound');
      }

      // Success
      // Attach the event data to the scope
      $scope.festival = data;

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
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
