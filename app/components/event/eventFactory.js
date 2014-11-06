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

    /* 
    return {
      getEventAsync: function(callback) {
        $http.get('json-test/event-test.json').success(callback);
      } 
    */

    return $http.get('json-test/event-test.json'); // use this method as more of an Angular approach?! see here: http://stackoverflow.com/questions/17490561/share-http-get-data-between-factory-and-controller. May need to use a resource service instead to work with RESTful api - check pro angular book, p43


    
  });