'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:EventFactory
 * @description
 * # EventFactory
 * Factory for a single event to load in JSON data
 */


angular.module('wowApp')
  .factory('eventFactory', function($http) {

    return {
      getEventAsync: function(callback) {
        $http.get('json-test/event-test.json').success(callback);
      }
    };
    
  });