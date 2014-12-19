'use strict';

/**
 * @ngdoc function
 * @name wowApp.factory:pageFactory
 * @description
 * # pageFactory
 * Factory for loading page data into the wowApp
 */

angular.module('wowApp')
  .factory('pageFactory', function($http, $rootScope, $filter) {

    return {

      getPage: function(pageId, callbackSuccess, callbackError) {

        $http.get('/json/api/content-page/'+pageId)
          .success(callbackSuccess})
          .error(callbackError);

      }

    };
    
  });