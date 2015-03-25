'use strict';

/**
 * @ngdoc overview
 * @name SC-app-landing-page
 * @description
 *
 * Provides the app with the ability to display landing page content and features
 */
angular
  .module('SC-app-landing-page', [
    'SC-app-content-components'
  ]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-landing-page.controller:LandingPageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the landingPageView state
 */
angular.module('SC-app-landing-page')
  .controller('LandingPageCtrl', ["$scope", "$state", "$stateParams", "appConfig", "landingPageFactory", "utilitiesFactory", function ($scope, $state, $stateParams, appConfig, landingPageFactory, utilitiesFactory) {

    var landingPageAlias = $stateParams.landingPageAlias;

    // Override landingPageId if on home state to use the homeLandingPageId
  	if ($state.current.name === 'app.home') {

      landingPageAlias = appConfig.homeLandingPageAlias;

  	}

    /**
     * Method for getting the homepage landing page for this festival from the API
     */
    landingPageFactory.getLandingPageSingle(landingPageAlias, function(landingPage) {

      $scope.landingPage = landingPage;

    }, utilitiesFactory.genericHTTPCallbackError);
    
  }]);
;'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:landingPageFactory
 * @factory
 *
 * @description
 * Factory for loading landing page data
 */

angular.module('SC-app-landing-page')
  .factory('landingPageFactory', ["$http", "$rootScope", "utilitiesFactory", function ($http, $rootScope, utilitiesFactory) {

    return {

      /**
       * @ngdoc method
       * @methodOf SC-app-landing-page.factory:landingPageFactory
       * @name SC-app-landing-page.factory:landingPageFactory#getLandingPageSingle
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single landing page based on the alias passed in
       */
      getLandingPageSingle: function (landingPageAlias, callbackSuccess, callbackError) {
          
        $http.get('/json/api/landing/' + landingPageAlias)

          // Loop through component perfomance list (featured events) JSON and correct date format for event start and end dates
          .success(function(components) {

            angular.forEach(components.field_component, function(fieldComponent) {

              // Converts the start time and end time timestamps from 10 digits 'Second'
              // timestamps to 13 digit 'Millisecond' timestamps
              if (fieldComponent.hasOwnProperty('field_list_performance')) {

                angular.forEach(fieldComponent.field_list_performance.field_performance_list, function(event) {

                  if (event.field_start_time) {
                    event.field_start_time = utilitiesFactory.timestampSecondsToMS(event.field_start_time);
                  }
                  if (event.field_end_time) {
                    event.field_end_time = utilitiesFactory.timestampSecondsToMS(event.field_end_time);
                  }

                });

              }

            });

            callbackSuccess(components);

          })

          .error(callbackError);

      }

    };

  }]);