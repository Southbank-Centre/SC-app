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
       * For getting data for a single homepage based on the landing page id stored in $rootScope.festival.field_homepage.id
       */
      getHomepageSingle: function (callbackSuccess, callbackError) {

        var loadData = function() {
          $http.get('/json/api/landing/'+$rootScope.festival.field_homepage.id)

            // Loop through component perfomance list (featured events) JSON and correct date format for event start and end dates
            .success(function(components) {

              angular.forEach(components.field_component, function(fieldComponent) {

                angular.forEach(fieldComponent.field_component_performance_list.field_performance_list, function(event) {

                  if (event.field_start_time) {
                    event.field_start_time = utilitiesFactory.timestampSecondsToMS(event.field_start_time);
                  }
                  if (event.field_end_time) {
                    event.field_end_time = utilitiesFactory.timestampSecondsToMS(event.field_end_time);
                  }

                });

              });

              components.component_content_page_list = [
                {
                  "title": "Test pages",
                  "field_content_page_list": [
                    {
                      "nid": 11,
                      "title": "test page",
                      "subtitle": "This is the subtitle",
                      "field_image": {
                        "file": {
                          "url": "https://farm9.staticflickr.com/8497/8379887392_65bdf6b754_b.jpg"
                        }
                      }
                    },
                    {
                      "nid": 12,
                      "subtitle": "This is the subtitle!"
                    },
                    {
                      "nid": 22,
                      "title": "Berlin",
                      "field_image": {
                        "file": {
                          "url": "data:image/jpeg;base64,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"
                        }
                      }
                    },
                    {
                      "nid": 11,
                      "title": "test page",
                      "subtitle": "This is the subtitle",
                      "field_image": {
                        "file": {
                          "url": "https://farm9.staticflickr.com/8497/8379887392_65bdf6b754_b.jpg"
                        }
                      }
                    },
                    {
                      "nid": 11,
                      "title": "Shouldn't be here",
                      "subtitle": "This is the subtitle",
                      "field_image": {
                        "file": {
                          "url": "https://farm9.staticflickr.com/8497/8379887392_65bdf6b754_b.jpg"
                        }
                      }
                    }
                  ]
                }
              ];

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