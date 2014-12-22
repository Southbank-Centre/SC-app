'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of a content page
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
      // If event not found
      if (status === 404) {
        // Broadcast the pageNotFound event
        $rootScope.$broadcast('event:pageNotFound');
      }

    });

  });