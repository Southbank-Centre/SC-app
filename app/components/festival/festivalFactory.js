'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:festivalFactory
 * @factory
 *
 * @description
 * Factory for loading festival data into the wowApp
 */

angular.module('wowApp')
  .factory('festivalFactory', function ($http, $rootScope, utilitiesFactory) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:festivalFactory
       * @name wowApp.factory:festivalFactory#getFestivalSingle
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for the app's festival, using the festival ID stored in $rootScope.festivalId
       */
      getFestivalSingle: function (callbackSuccess, callbackError) {

        $http.get('/json/api/festival/'+$rootScope.festivalAlias)

          .success(function(festival) {

            // Correct date format for start and end dates
            festival.field_date_start = utilitiesFactory.timestampSecondsToMS(festival.field_date_start);
            festival.field_date_end = utilitiesFactory.timestampSecondsToMS(festival.field_date_end);

            // Convert festival duration into array of days for use by events list filter
            var s = new Date(Number(festival.field_date_start));
            var e = new Date(Number(festival.field_date_end));
            var a = [];

            while (s <= e) {
              a.push({ 
                'day' : new Date(s.toDateString()).getTime().toString()
              });
              s = new Date(s.setDate(
                s.getDate() + 1
              ));
            }

            festival.festivalDays = a;

            callbackSuccess(festival);


          })
          .error(callbackError);

      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:festivalFactory
       * @name wowApp.factory:festivalFactory#getNavigation
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting navigation data for the app's festival
       */
      getNavigation: function (callbackSuccess, callbackError) {

        $http.get('/json/node.json?type=navigation&field_festival='+$rootScope.festivalId)
          .success(function(data) {

            if (data.list[0]) {
              var navigation = {
                festivalNav: data.list[0].field_navigation_link,
                festivalFooter: data.list[0].field_footer
              };
              
              callbackSuccess(navigation);

            } else {

              $rootScope.$broadcast('event:error');

            }

          })
          .error(callbackError);

      }

    };

  });