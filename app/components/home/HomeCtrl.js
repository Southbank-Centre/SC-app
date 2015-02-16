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
  .controller('HomeCtrl', function ($rootScope, $scope, $window, homeFactory, eventFactory, personFactory, utilitiesFactory) {

    /**
     * Method for getting the homepage landing page for this festival from the API
     */
    homeFactory.getHomepageSingle(function(homepage) {

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
