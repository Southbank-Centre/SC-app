'use strict';

angular
  .module('wowApp')
  
  .run(['$rootScope', '$state', 'festivalFactory', 'utilitiesFactory', function (scope, state, festivalFactory, utilitiesFactory) {

    // Setup pageNotFound event
    scope.$on('event:pageNotFound', function() {
      // Show 404 state
      state.go('wow.404');
    });

    // Setup serverError event
    scope.$on('event:error', function() {
      // Show 500 state
      state.go('wow.error');
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
    }, utilitiesFactory.genericHTTPCallbackError);

    /**
     * Method for getting the menus for the festival from the API
     */
    festivalFactory.getMenus(function(data) {

      // Failure
      // If there is no menu for this festival, show website error
      if (data.festivalNav.length > 0) {
        scope.menus = data;
      } else {
        // Broadcast the serverError event
        scope.$broadcast('event:error');
      }

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);

