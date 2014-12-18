'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:personFactory
 * @description
 * # personFactory
 * Factory for loading person data into the wowApp
 */

angular.module('wowApp')
  .factory('personFactory', function ($http, $rootScope) {

    return {

      getPersonSingle: function (personId, callbackSuccess, callbackError) {

        $http.get('/json/api/person/'+personId)
          .success(callbackSuccess)
          .error(callbackError);

      }

    };

  });