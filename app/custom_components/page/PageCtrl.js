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
  .controller('PageCtrl', function ($rootScope, $scope, $stateParams, pageFactory, utilitiesFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageId, function(data) {

      // SUCCESS
      // Attach the page data to the scope
      $scope.page = data;

    }, utilitiesFactory.genericHTTPCallbackError);

  });