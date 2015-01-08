'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of a content page
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