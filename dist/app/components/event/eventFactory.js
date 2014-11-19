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

      getEventSingle: function(eventId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/event/'+eventId
        // $http.get('json-test/event-test-'+eventId+'.json')
        $http.get('/WOW2015/backend/drupal/node/12.json')
          .success(callbackSuccess)
          .error(callbackError);

      }

    };
    
  });