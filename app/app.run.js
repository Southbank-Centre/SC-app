'use strict';

angular
  .module('wowApp')
  

  /*
     Whitelist urls to allow iframe embeds (ng-bind-html sanitizes html by default)
     NB only works if iframe defined in view template (they aren't currently)
  */

  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      '*://www.youtube.com/**'
    ]);
  })
  // $sceProvider.enabled(false);


  /* 
    Filter to allow ng-bind-html to accept iframes (just add '| unsafe' to bind)
  */
  .filter('unsafe', function($sce) { return $sce.trustAsHtml; })



  .run(['$rootScope', '$state', 'festivalFactory', function(scope, state, festivalFactory) {

    // Setup pageNotFound event
    scope.$on('event:pageNotFound', function() {
      // Show 404 state
      state.go('wow.404');
    });

    // Setup serverError event
    scope.$on('event:serverError', function() {
      // Show 500 state
      state.go('wow.500');
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
      // If festival not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        scope.$broadcast('event:pageNotFound');
      }
    });

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
        scope.$broadcast('event:serverError');
      }

    }, function(data, status) {
      // Failure
      // If 404 from API
      if (status === 404) {
        // Broadcast the pageNotFound event
        scope.$broadcast('event:pageNotFound');
      }
    });

  }]);

