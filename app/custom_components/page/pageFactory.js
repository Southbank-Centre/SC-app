'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:pageFactory
 * @factory
 *
 * @description
 * Factory for loading page data into the wowApp
 */

angular.module('wowApp')
  .factory('pageFactory', function($http) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:pageFactory
       * @name wowApp.factory:pageFactory#getPageSingle
       * @returns {undefined} Undefined
       * @param {string} pageId The ID of the page
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single content page by page ID
       */
      getPage: function(pageId, callbackSuccess, callbackError) {

        $http.get('/json/api/content-page/'+pageId)
          .success(callbackSuccess)
          .error(callbackError);

      }

    };
    
  });