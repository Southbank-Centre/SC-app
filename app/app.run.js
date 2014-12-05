'use strict';

angular
  .module('wowApp')
  .run(['$rootScope', '$state', 'festivalFactory', function(scope, state, festivalFactory) {

    // Setup pageNotFound event
    scope.$on('event:pageNotFound', function() {
      
      // Show 404 state
      state.go('404');

    });

    // ID of WOW Festival stored in the backend
    scope.festivalId = 1;

    /**
     * Method for getting one festival from the API
     */
    festivalFactory.getFestivalSingle(function(data) {

      // Validation
      // Location, event name and start date must be present for the event to display
      if (!data.field_date_start || !data.title) {
        scope.$broadcast('event:pageNotFound');
      }

      // Success
      // Attach the festival data to the scope
      scope.festival = data;

      // Set festivalDataLoaded to true and broadcast the festivalDataLoaded event
      scope.festivalDataLoaded = true;
      scope.$broadcast('event:festivalDataLoaded');

    }, function(data, status) {

      // Failure
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        scope.$broadcast('event:pageNotFound');
      }

    });

  }]);