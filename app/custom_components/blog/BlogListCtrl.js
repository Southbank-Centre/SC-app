'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:BlogSingleCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the blogSingleView state
 */

angular.module('wowApp')
  .controller('BlogListCtrl', [
    '$rootScope',
    '$scope',
    '$stateParams',
    'blogFactory',
    'utilitiesFactory',
    function ($rootScope, $scope, $stateParams, blogFactory, utilitiesFactory) {

      // Get a listing of blog posts and bind them to the scope.
      blogFactory.getBlogList(
          function(data) {
            $scope.blogItems = data.list;
            $rootScope.$broadcast('event:displayingBlogListingPage');
          },
          utilitiesFactory.genericHTTPCallbackError
      );

    }]
  );