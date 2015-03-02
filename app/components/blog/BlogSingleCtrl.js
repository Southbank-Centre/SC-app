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
  .controller('BlogSingleCtrl', function ($rootScope, $scope, $stateParams, blogFactory, utilitiesFactory) {

    /**
     * Method for getting one event from the API
     */
    blogFactory.getBlogSingle($stateParams.blogId, function(data) {

      // SUCCESS
      // Attach the event data to the scope
      $scope.blogPost = data;

      // Set description meta tag to event short description
      // $rootScope.eventDescription = $scope.event.field_teaser.value.replace(/(<([^>]+)>)/ig,"");
      $rootScope.$broadcast('event:displayingBlogPage');

    }, utilitiesFactory.genericHTTPCallbackError);

  });