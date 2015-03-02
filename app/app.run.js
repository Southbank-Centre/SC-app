'use strict';

angular
  .module('wowApp').constant('angularMomentConfig', {

    timezone: 'Europe/London'
    
  })  
  .run(['$rootScope', '$state', '$window', '$location', 'festivalFactory', 'utilitiesFactory', '$http', 'DSCacheFactory', function (scope, state, $window, $location, festivalFactory, utilitiesFactory, $http, DSCacheFactory) {

    // Alias of WOW Festival stored in the backend
    scope.festivalAlias = 'women-world-festival-1';

    // Get ID of WOW Festival (should be last part of Alias above)
    scope.festivalId = scope.festivalAlias.substr(scope.festivalAlias.lastIndexOf('-') + 1);

    // ID of the ticketing vocabulary in the backend
    scope.ticketingVocabularyId = 4;

    // Configure all $http requests to use a cache created by DSCacheFactory by default:
    new DSCacheFactory('defaultCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 6000000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });

    $http.defaults.cache = DSCacheFactory.get('defaultCache');

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
      $window.scrollTo(0,0);

      // Get virtual url for Google Tag Manager pageview
      var virtualUrl = $location.path();

      // Push url to GTM dataLayer
      $window.dataLayer.push({ 
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

      // Set the website title and description meta tag
      scope.websiteTitle = scope.festival.title + ' at Southbank Centre';
      scope.websiteDescription = scope.festival.field_description.value.replace(/(<([^>]+)>)/ig,'');

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

    /**
     * Method for getting the ticket types from the API
     */
    festivalFactory.getTicketTypes(function(data) {

      angular.forEach(data.list, function(ticketType, i) {

        // Remove 'free ticketed' from list
        if (ticketType.name === 'Free ticketed') {
          data.list.splice(i, 1);
        }

      });

      // Add ticket types to root scope
      scope.ticketTypes = data;

      // Set festivalDataLoaded to true and broadcast the festivalDataLoaded event
      scope.ticketingDataLoaded = true;
      scope.$broadcast('event:ticketingDataLoaded');

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);

