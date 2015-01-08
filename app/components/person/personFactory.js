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
  .factory('personFactory', function ($http) {

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

      }

    };

  });