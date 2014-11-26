'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:festivalFactory
 * @description
 * # festivalFactory
 * Factory for loading festival data into the wowApp
 */

angular.module('wowApp')
  .factory('festivalFactory', function($http) {

    return {

      getFestivalSingle: function(festivalId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/festival/'+festivalId
        $http.get('json/festival-json-'+festivalId+'.json')
          .success(callbackSuccess)
          .error(callbackError);

      }

    };
    
  });