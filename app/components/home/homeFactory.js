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
  .factory('homeFactory', function ($http, $rootScope) {

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
       * For getting data for a single homepage based on the landing page id stored in $rootScope.festival.field_homepage.id
       */
      getHomepageSingle: function (callbackSuccess, callbackError) {

        var loadData = function() {
          $http.get('/json/api/landing/'+$rootScope.festival.field_homepage.id)

            // .success(callbackSuccess)

            // Loop through component perfomance list (featured events) JSON and correct date format for event start and end dates
            .success(function(components) {

              angular.forEach(components.field_component, function(fieldComponent) {            

                angular.forEach(fieldComponent.field_component_performance_list.field_performance_list, function(event) {

                  if (event.field_start_time) {
                    event.field_start_time = utilities.timestampSecondsToMS(event.field_start_time);
                  }
                  if (event.field_end_time) {
                    event.field_end_time = utilities.timestampSecondsToMS(event.field_end_time);
                  }

                });

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