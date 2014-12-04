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

        $http.get('/json/api/festival/'+$rootScope.festivalId)
          .success(function(festival) {

            var s1 = festival.field_date_start*1000; // need start date as number, not string
            var e1 = festival.field_date_end*1000; //// need end date as number, not string

            // Correct date format for start and end dates
            festival.field_date_start = utilities.timestampSecondsToMS(festival.field_date_start);
            festival.field_date_end = utilities.timestampSecondsToMS(festival.field_date_end);

            // Convert festival duration into array of days for use by events list filter
            // function getAllDays() {
              var s = new Date(s1);
              var e = new Date(e1);
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


            callbackSuccess(festival);


          })
          .error(callbackError);

      }

    };

  });