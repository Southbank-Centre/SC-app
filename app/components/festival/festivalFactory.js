'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:festivalFactory
 * @description
 * # festivalFactory
 * Factory for loading festival data into the wowApp
 */

angular.module('wowApp')
  .factory('festivalFactory', function ($http, $rootScope) {

    return {

      getFestivalSingle: function (callbackSuccess, callbackError) {

        // Get request URL will be something like: 'http://wow.southbankcentre.co.uk/api/festival/'+festivalId
        $http.get('/json-test/festival-json-' + $rootScope.festivalId + '.json')
          .success(function (festival) {

            // Correct date format for start and end dates
            if (festival.field_date_start) {
              // festival.field_date_start = festival.field_date_start * 1000;
            }
            if (festival.field_date_end) {
              // festival.field_date_end = festival.field_date_end * 1000;
            }

            // Convert festival duration into array of days for use by events list filter
            // function getAllDays() {
              //var festStart = Date.parse(festival.startDate);
              //var festEnd = Date.parse(festival.endDate);
              var s = new Date(festival.startDate);
              var e = new Date(festival.endDate);
              var a = [];

              while (s <= e) {
                a.push({ 
                  'day' : s.toJSON()
                });
                s = new Date(s.setDate(
                  s.getDate() + 1
                ));
              }
              // return a;
            // }
            festival.festivalDays = a;

            console.log(a);

            callbackSuccess(festival);


          })
          .error(callbackError);

      }

    };

  });