'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:EventFactory
 * @description
 * # EventFactory
 * Factory for loading event data into the wowApp
 */

angular.module('wowApp')
  .factory('eventFactory', function($http) {

    return {

      /* getEventSingle: function(eventId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/event/'+eventId
        $http.get('json-test/event-test-'+eventId+'.json')
          .success(callbackSuccess)
          .error(callbackError);

      }, */

      getEventSingle: function(eventId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/event/'+eventId
        $http.get('/json/node/'+eventId+'.json')
          .success(function(performance) {

            // Make a second call to get the performance's related production
            // using the URL of the production's JSON endpoint
            $http.get('json/node/'+performance.field_production.id+'.json')
              .success(function(production) {

                // inject production data into the event scope
                performance.field_production = production;

                // Make a third call to get the performance's available tickets
                // using the URL of the ticket offer's paragraph JSON endpoint
                // NB this should be in a for loop to load all available JSONs
                $http.get('json/node/'+performance.field_offers[0].id+'.json')
                  .success(function(tickets) {

                    // inject ticket data into the event scope
                    performance.field_offers[0] = tickets;

                  });

                // Make a fourth (?!) call to get the performance's available tickets
                // using the URL of the ticket offer's paragraph JSON endpoint
                $http.get('json/node/'+performance.field_offers[1].id+'.json')
                  .success(function(tickets) {

                    // inject ticket data into the event scope
                    performance.field_offers[1] = tickets;
                    
                    var event = performance;
                    // Call the callback which is passed in from EventSingleCtrl
                    callbackSuccess(event);

                  });


              });

          })

          .error(callbackError);

      },

      getEventList: function (callbackSuccess, callbackError){

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'
        $http.get('json-test/events-list-test.json')
          .success(callbackSuccess)
          .error(callbackError)

      }

    };
    
  });