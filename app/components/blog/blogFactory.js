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
  .factory('blogFactory', function($http, utilitiesFactory) {

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

        $http.get('/json/api/blog-post/'+blogId)
          .success(function(blogPost) {

            // Correct date format for start and end dates
            if (blogPost.field_published_date) {
              blogPost.field_published_date = utilitiesFactory.timestampSecondsToMS(blogPost.field_published_date);
            }

            callbackSuccess(blogPost);
          })
          // .error(callbackError);
          .error(function(err) {
            callbackError()
          });

      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:blogFactory
       * @name wowApp.factory:blogFactory#getBlogList
       * @returns {undefined} undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds.
       * @param {function} callbackError The function to call when the HTTP request fails.
       *
       * @description
       * Get a list of published blog posts sorted by the value in the published_date field.
       */
      getBlogList: function(callbackSuccess, callbackError) {

        var requestString = 'json/node.json?type=blog_post&status=1&sort=field_published_date&direction=DESC';

        $http.get(requestString)
          .success(function(blogListing) {

            angular.forEach(blogListing.list, function(blogItem){
              if (blogItem.field_published_date) {
                blogItem.field_published_date = utilitiesFactory.timestampSecondsToMS(blogItem.field_published_date);
              }
            });

            callbackSuccess(blogListing);
          })
          .error(function(err) {
            callbackError();
          });
      }

    };

  });