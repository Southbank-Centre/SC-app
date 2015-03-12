'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:homeFactory
 * @factory
 *
 * @description
 * Factory for loading homepage data into the wowApp
 */

angular.module('wowApp')
  .factory('homeFactory', function ($http, $rootScope, utilitiesFactory) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:homeFactory
       * @name wowApp.factory:homeFactory#getHomepageSingle
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single homepage based on the landing page url stored in $rootScope.festival.field_homepage.url
       */
      getHomepageSingle: function (callbackSuccess, callbackError) {

        var loadData = function() {

          // Get homepage alias 
          var homeUrl = $rootScope.festival.field_homepage.url;
          var homeAlias = homeUrl.substr(homeUrl.lastIndexOf('/') + 1);
          
          $http.get('/json/api/landing/'+homeAlias)

            // Loop through component perfomance list (featured events) JSON and correct date format for event start and end dates
            .success(function(components) {

              angular.forEach(components.field_component, function(fieldComponent) {

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
        };

        // If festival data already loaded, load homepage data
        if ($rootScope.festivalDataLoaded) {
          loadData();
        // If not, wait for festival data to be loaded before loading homepage data
        } else {
          $rootScope.$on('event:festivalDataLoaded', function() {
            loadData();
          });
        }

      }

    };

  });