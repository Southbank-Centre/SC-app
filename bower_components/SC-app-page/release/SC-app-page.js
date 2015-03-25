'use strict';

/**
 * @ngdoc overview
 * @name SC-app-page
 * @description
 *
 * Provides the app with the ability to display page content and features
 */
angular
  .module('SC-app-page', [
    'SC-app-utils',
    'SC-app-content-components'
  ]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-page.controller:PageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageView state
 */

angular.module('SC-app-page')
  .controller('PageCtrl', ["$scope", "$stateParams", "pageFactory", "utilitiesFactory", function ($scope, $stateParams, pageFactory, utilitiesFactory) {

    /**
     * Method for getting one page from the API
     */
    pageFactory.getPage($stateParams.pageAlias, function(data) {

      // SUCCESS
      // Attach the page data to the scope
      $scope.page = data;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);;'use strict';

/**
 * @ngdoc service
 * @name SC-app-page.factory:pageFactory
 * @factory
 *
 * @description
 * Factory for loading page data into the app
 */

angular.module('SC-app-page')
  .factory('pageFactory', ["$http", function($http) {

    return {

      /**
       * @ngdoc method
       * @methodOf SC-app-page.factory:pageFactory
       * @name SC-app-page.factory:pageFactory#getPageSingle
       * @returns {undefined} Undefined
       * @param {string} pageId The ID of the page
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single content page by page ID
       */
      getPage: function(pageAlias, callbackSuccess, callbackError) {

        $http.get('/json/api/content-page/' + pageAlias)
          .success(callbackSuccess)
          .error(callbackError);

      }

    };
    
  }]);