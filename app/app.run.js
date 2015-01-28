'use strict';

angular
  .module('wowApp')
  
  .run(['$rootScope', '$state', '$window', '$location', 'festivalFactory', 'utilitiesFactory', function (scope, state, $window, $location, festivalFactory, utilitiesFactory) {

    // Alias of WOW Festival stored in the backend
    scope.festivalAlias = 'wow-women-world-1';

    // Get ID of WOW Festival (should be last part of Alias above)
    scope.festivalId = scope.festivalAlias.substr(scope.festivalAlias.lastIndexOf('-') + 1);

    //console.log(festId);

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

    scope.$on('$stateChangeSuccess', function() {
      $window.scrollBy(0,0);

      // Get virtual url for Google Tag Manager pageview
      var path = $location.path(),
      absUrl = $location.absUrl(),
      virtualUrl = absUrl.substring(absUrl.indexOf(path));

      // Push url to GTM dataLayer
      dataLayer.push({ 
        event: 'pageview',
        virtualUrl: virtualUrl 
      });

    });

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
    festivalFactory.getNavigation(function(data) {

      // Failure
      // If there is no menu for this festival, show website error
      if (data.festivalNav.length > 0) {
        for (var i in data) {
          scope[i] = data[i];
        }
        if (typeof scope.festivalFooter !== 'undefined') {
          if (typeof scope.festivalFooter.field_component !== 'undefined' && scope.festivalFooter.field_component.length > 0) {
            scope.festivalFooter.field_component.reverse();
          }
        }
      } else {
        // Broadcast the serverError event
        scope.$broadcast('event:error');
      }

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);

