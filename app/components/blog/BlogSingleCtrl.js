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
  .controller('BlogSingleCtrl', function ($rootScope, $scope, $stateParams, $location, blogFactory, utilitiesFactory) {

    // Prevent the diqus directive from trying to load the comments until the page has fully loaded
    $scope.disqus = {
      blogLoaded : false
    };

    /**
     * Method for getting one event from the API
     */
    blogFactory.getBlogSingle($stateParams.blogId, function(data) {

      // SUCCESS
      // Attach the bog data to the scope
      $scope.blogPost = data;
      $rootScope.$broadcast('event:displayingBlogPage');

      // Check the hostname so that we can load comments for the correct environment
      var host = $location.host();

      // Check if the hostname start with 'dev', if so make the Disqus directive load the test comment stream
      // otherwise load in the live sire comment stream
      if(host.indexOf('dev') === 0) {
        $scope.disqus.shortname = 'wow2015dev';
      } else {
        $scope.disqus.shortname = 'wow2015';
      }

      // Set the Disqus unique identifier to the nid of the blog post.
      // This will be used to load the commetns stream in the first instance followed by the url property
      $scope.disqus.identifier = data.nid;
      $scope.disqus.url = $location.absUrl();

      // Build a title for the Disqus comment stream. This will default to the page title tag or the URL.
      // Use the blog post h1 title
      $scope.disqus.title = data.title;

      // Tell the disqus directive to load
      $scope.disqus.blogLoaded = true;

    }, utilitiesFactory.genericHTTPCallbackError);

  });