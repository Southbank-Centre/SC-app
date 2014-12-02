'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:festivalFactory
 * @description
 * # festivalFactory
 * Factory for loading festival data into the wowApp
 */

angular.module('wowApp')
  .factory('festivalFactory', function($http, $rootScope) {

    return {

      getFestivalSingle: function(callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/festival/'+festivalId
        $http.get('/json/api/festival/'+festivalId)
          .success(callbackSuccess)
          .error(callbackError);

      }

    };
    
  });