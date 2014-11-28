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

      getEventSingle: function(eventId, callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/event/'+eventId
        // $http.get('json-test/'+eventId+'.json')
        $http.get('/json/api/performance/'+eventId)
          .success(function(performance) {

            // Correct date format for start and end dates
            if (performance.field_start_time) {
              performance.field_start_time = performance.field_start_time * 1000;
            }
            if (performance.field_end_time) {
              performance.field_end_time = performance.field_end_time * 1000;
            }

            // Make a second call to get the performance's related production
            // using the URL of the production's JSON endpoint
            // $http.get('json-test/'+performance.field_production.id+'.json')
            $http.get('/json/api/production/'+performance.field_production.id)
              .success(function(production) {

                // inject production data into the event scope
                performance.field_production = production;

                // Make a third call to get the performance's available tickets
                // using the URL of the ticket offer's paragraph JSON endpoint
                if (production.field_offers.length > 0) {
                  var ticketsJSON = [];
                  angular.forEach(production.field_offers, function(value, key) {
                    $http.get('/json/paragraphs_item/'+production.field_offers[key].id+'.json')
                      .success(function(ticket) {

                        ticketsJSON[key] = ticket;

                        // Only run the success callback if we have all of the tickets
                        if (ticketsJSON.length === production.field_offers.length) {
                          // inject ticket data into the event scope
                          performance.field_production.field_offers = ticketsJSON;

                          // Call the callback which is passed in from EventSingleCtrl
                          var event = performance;
                          callbackSuccess(event);
                        }

                      });
                  });
                } else {
                  // Call the callback which is passed in from EventSingleCtrl
                  var event = performance;
                  callbackSuccess(event);
                }

              });

          })

          .error(callbackError);

      },

      getEventList: function (callbackSuccess, callbackError){

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/events/'
        $http.get('/json/events-list-test.json')
          .success(callbackSuccess)
          .error(callbackError)

      }

    };
    
  });