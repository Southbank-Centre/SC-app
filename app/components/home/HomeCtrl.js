'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:HomeCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the homeView state
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, homeFactory, eventFactory, personFactory, utilitiesFactory) {

    /**
     * Method for getting the homepage landing page for this festival from the API
     */
    homeFactory.getHomepageSingle(function(homepage) {

      if (homepage.field_component) {
        angular.forEach(homepage.field_component, function(component_list, i) {

          // Create an array on homepage based on the component list's bundle name,
          // if the object didn't already exist.
          // E.g. homepage.component_performance_list
          homepage[component_list.bundle] = homepage[component_list.bundle] || [];

          // Add the component list to the array
          homepage[component_list.bundle].push(component_list[component_list.bundle.replace('component_', 'field_')]);

        });
      }

      $scope.homepage = homepage;

    }, utilitiesFactory.genericHTTPCallbackError);
    
    /**
     * Method for getting the count of events for this festival from the API
     */
    eventFactory.getEventCount(function(eventCount) {

      $scope.eventCount = eventCount;

    }, function() {

      $scope.eventCount = 0;

    });

    /**
     * Method for getting the count of persons for this festival from the API
     */
    personFactory.getPersonCount(function(personCount) {

      $scope.personCount = personCount;

    }, function() {

      $scope.personCount = 0;

    });

    // SEO REQUIREMENT: 
    // PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
    // we are finished with this controller. 
    // See: http://lawsonry.com/p?11040
    // 
    // $scope.htmlReady();
  });
