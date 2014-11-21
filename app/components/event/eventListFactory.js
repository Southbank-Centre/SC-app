'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:EventFactory
 * @description
 * # EventFactory
 * Factory for a single event to load in JSON data
 */


angular.module('wowApp')
  .factory('eventListFactory', function($http){
    return {

      getEventList: function (callbackSuccess, callbackError){

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'+eventsId
        $http.get('json-test/events-list-test.json')
          .success(callbackSuccess)
          .error(callbackError)

      }
      
    };

  });