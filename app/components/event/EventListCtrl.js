'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:EventListCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the eventListView state
 */

angular.module('wowApp')
  .controller('EventListCtrl', function ($rootScope, $scope, $stateParams, $location, eventFactory, utilitiesFactory, $filter) {

      /* $scope.$on('$stateChangeSuccess', function() {
        alert('hello');
        var input = $('#event-type-filter');
        input.val('xxx');
        input.trigger('input');
      }); */

    /**
     * Method for getting event list from the API
     */
    eventFactory.getEventList( function(data) {

      // Number of items to load each time
      // when infinite scroll point has been reached
      var numToLoad = 10;

      // Success
      // Attach the event data to the scope
      $scope.allEvents = data.list;
      $scope.events = $scope.allEvents.slice(0, numToLoad);

      /**
       * Callback for infinite scroll mechanism.
       * Load the next set of events into the page
       * and store how many have been loaded
       */
      $scope.loadNextEvents = function() {

        var len = $scope.events.length;
        $scope.events.push.apply($scope.events, $scope.allEvents.slice(len, len + numToLoad));

      };

      /**
       * Sets the number of events loaded to just be the initial
       * 20, so that infinite scrolling can be used
       * after filters are changed
       */
      $scope.resetEvents = function() {

        // If there are select box filters applied,
        // pass through all events
        if ($scope.selectFiltersApplied()) {

          $scope.events = $scope.allEvents;

        // If not, pass through the first 20 because
        // infinite scroll will be in use
        } else {

          $scope.events = $scope.allEvents.slice(0, numToLoad);

        }

      };

      /* $scope.filters = {};
      $scope.$watchCollection('filters', function(value) {
          $location.hash($.param(value)); // a jQuery function
      }); */

      // I don't like the function name() syntax - it hides what's really going on, which is this:
      /* var getUrlVars = function() {
        //technically i and len are initialized first due to variable hosisting anyways so Douglass Crockford recommends doing it here 
        //I personally think its ok to declare your variables lower as long as you're comfortable with the concept
        var i, len,  
            params = {}, // no idea why the previous function used an array
            hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        //Array.length is actually a very rare instance of a calculated property, this syntax ensures it is only calculated once at
        //the beginning of looping.
        // Also Crockford recommends not using ++ on account of it being a silly construct that can lead to bad practices
        for(i = 0, len = hashes.length, len; i < len; i+=1) {
          hash = hashes[i].split('=');
          //no idea why there was a push here previously, it gets overridden by the next line
          params[hash[0]] = hash[1];
        }

        return params;
      } */

      //var d = $scope.search.field_start_day;
      //var t = $scope.search.eventType;

      if ($location.search()) {
        $scope.search = $location.search();
      }

      console.dir($scope.search);

      $scope.$watchCollection('search', function(value) {
          // $location.search(value);
          
          var d = $scope.search.field_start_day;
          //var day = $filter('slugify')(d);
          //var day = (moment(d).format('dddd-D-MMMM-YYYY')).toLowerCase();
          var day = $filter('date')(d, "dddd-d-MMMM-yyyy");

          var t = $scope.search.eventType;
          var type = $filter('slugify')(t);
          //console.log(day);

          $location.search({ 'day': day, 'type': t });
      });

      /* $scope.updatePath = function() {
        //var dayParam = $scope.search.field_start_day | slugify;
        //var eventTypeParam = $scope.search.eventType | slugify;
        //var d = $scope.search.field_start_day;
        //var t = $scope.search.eventType;
        //var dayParam = slugify(c);
        //var eventTypeParam = slugify(t);
        var dayParam = $scope.search.field_start_day;
        var eventTypeParam = $scope.search.eventType;
        //$location.search('day', $scope.search.field_start_day);
        //$location.search({ 'day': $scope.search.field_start_day, 'type': $scope.search.eventType });
        
        //$location.search({ 'day': dayParam, 'type': eventTypeParam });

        $location.hash(dayParam);
        // $location.search({dayParam, eventTypeParam});

        //$location.path( '/events/'+eventTypeParam+'/'+dayParam );
        
        //$location.search({ 'day': $scope.search.field_start_day });
        //$location.search({ 'type': $scope.search.eventType });
        //$location.search() => {day: 'search.field_start_day', type: 'event.field_production.field_event_type.name'}
      }; */

      // filter items
      /* $scope.field_start_day = items.field_start_day.filter(function (item){
        if ($stateParams.field_start_day){
          return item.toLowerCase().indexOf($stateParams.field_start_day) > -1 ||
                 item.indexOf($stateParams.field_start_day) > -1
        }
      });
      $scope.event.field_production.field_event_type.name = items.event.field_production.field_event_type.name.filter(function (item){
        if ($stateParams.event.field_production.field_event_type.name){
          return item.toLowerCase().indexOf($stateParams.event.field_production.field_event_type.name) > -1 ||
                 item.indexOf($stateParams.event.field_production.field_event_type.name) > -1
        }
      }); */



    }, utilitiesFactory.genericHTTPCallbackError);

    /**
     * Define filter comparator which includes all items
     * if the filter option is null, but is strict if 
     * the filter option is not null
     */
    $scope.strictOrAll = function(expected, actual) {
      
      // If moment objects are passed in, format them as strings for comparison
      if (typeof expected === 'object' && actual !== null) {
        if (expected.hasOwnProperty('_isAMomentObject')) {
          if (expected._isAMomentObject) {
            expected = expected.format('YYYYMMDDhhmmss');
          }
        }
      }
      if (typeof actual === 'object' && actual !== null) {
        if (actual.hasOwnProperty('_isAMomentObject')) {
          if (actual._isAMomentObject) {
            actual = actual.format('YYYYMMDDhhmmss');
          }
        }
      }

      if (actual === null) {

       return true;

      // Only compare strings and numbers
      } else if (typeof expected !== 'string' && typeof expected !== 'number') {

       return false;

      } else {

       // Convert numbers to strings so that they can be compared
       if (typeof expected === 'number') {
         expected = expected.toString();
       }

       // Search for a match
       return expected.match(new RegExp(actual, 'i')) !== null;
      }
    }

    /**
     * Determines whether or not the 'All days' item has been selected
     * from the event day filter
     */
    $scope.showAllDays = function() {

      if (angular.element('#event-day-filter').val() === "") return true;

    };

    /**
     * Determines whether or not any of the select filters are applied
     */
    $scope.selectFiltersApplied = function() {

      var selectFilterApplied = false;
      angular.forEach(angular.element('.event-filter'), function(el) {
        if (angular.element(el).val() !== "") {
          selectFilterApplied = true;
          return false;
        }

      });

      return selectFilterApplied;

    };

  });