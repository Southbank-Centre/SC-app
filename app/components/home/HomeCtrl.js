'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowApp
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, festivalFactory) {
    
    /**
     * Method for getting one festival from the API
     */
    
    // ID of WOW Festival stored in the backend
    var festivalId = 1;

    festivalFactory.getFestivalSingle(festivalId, function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      if (!data.startDate || !data.festivalName) {
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

    // SEO REQUIREMENT: 
    // PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
    // we are finished with this controller. 
    // See: http://lawsonry.com/p?11040
    // 
    // $scope.htmlReady();
  });
