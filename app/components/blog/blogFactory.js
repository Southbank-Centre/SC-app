'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:blogFactory
 * @factory
 *
 * @description
 * Factory for loading blog data into the wowApp
 */

angular.module('wowApp')
  .factory('blogFactory', function($http) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:blogFactory
       * @name wowApp.factory:blogFactory#getBlogSingle
       * @returns {undefined} Undefined
       * @param {string} blogId The ID of the blog post
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single blog post by post ID
       */
      getBlogSingle: function(blogId, callbackSuccess, callbackError) {

        //------
        // Currently set to the page route
        // The blog content type isn't on Drupal yet
        //
        //
        $http.get('/json/api/content-page/'+blogId)
          .success(function(blogPost) {

            // Add the date and author data mock objects as the data response passes through this fn
            blogPost.testPostDate = {
              postDate : "1425055719"
            };

            blogPost.testPostAuthor = {
              postAuthor : 'Some post author'
            };

            callbackSuccess(blogPost);
          })
          // .error(callbackError);
          .error(function(err) {
            console.log(err);
          });

      }

    };

  });