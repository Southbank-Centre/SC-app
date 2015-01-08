'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:PageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageView state
 */

angular.module('wowApp')
  .controller('PageCtrl', function($rootScope, $scope, $stateParams, pageFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageId, function(data) {

      // SUCCESS
      // Attach the page data to the scope
      $scope.page = data;

    }, function(data, status) {

      // Failure
      // If page not found
      if (status === 404 || status === 403) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });