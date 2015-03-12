'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:personFactory
 * @factory
 *
 * @description
 * Factory for loading person data into the wowApp
 */

angular.module('wowApp')
  .factory('personFactory', function($http, $rootScope) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:personFactory
       * @name wowApp.factory:personFactory#getPersonSingle
       * @returns {undefined} Undefined
       * @param {string} personId The ID of the person
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single person by person ID
       */
      getPersonSingle: function (personId, callbackSuccess, callbackError) {

        $http.get('/json/api/person/'+personId)
          .success(callbackSuccess)
          .error(callbackError);

      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:personFactory
       * @name wowApp.factory:personFactory#getPersonList
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data about all published persons, sorted by last name descending
       */
      getPersonList: function (callbackSuccess, callbackError){

        var loadData = function() {
          $http.get('/json/node.json?type=person&sort=field_last_name&direction=ASC&field_festival=' + $rootScope.festivalId)

          .success(function(persons) {

            angular.forEach(persons.list, function(item) {

              if (item.field_last_name) {

                // Get first character of surname for use in list group headings
                var characterHeading = item.field_last_name.charAt(0);
                item.characterHeading = characterHeading;

              }

            });

            callbackSuccess(persons);

          })

          .error(callbackError);
        };

        // If festival data already loaded, load person list data
        if ($rootScope.festivalDataLoaded) {
          loadData();
        // If not, wait for festival data to be loaded before loading person list data
        } else {
          $rootScope.$on('event:festivalDataLoaded', function() {
            loadData();
          });
        }

      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:personFactory
       * @name wowApp.factory:personFactory#getPersonCount
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting the count of all published persons for this festival
       */
      getPersonCount: function(callbackSuccess, callbackError) {

        $http.get('/json/node.count?type=person&field_festival='+$rootScope.festivalId)

          .success(function(personCount) {

            callbackSuccess(personCount.count);

          })

          .error(callbackError);

      }

    };

  });