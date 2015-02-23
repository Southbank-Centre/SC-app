'use strict';

/**
 * @ngdoc service
 * @name wowApp.factory:utilitiesFactory
 *
 * @description
 * Utilities that are generic and useful at various points through the app
 */

angular.module('wowApp')
  .factory('utilitiesFactory', function($rootScope) {

    return {

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:utilitiesFactory
       * @name wowApp.factory:utilitiesFactory#timestampSecondsToMS
       * @returns {string} timestampMS The timestamp in milliseconds
       * @param {string | number} timestamp A timestamp in seconds
       *
       * @description
       * Converts timestamp given in seconds to timestamp given in milliseconds
       */
      timestampSecondsToMS: function(timestamp) {
        console.log(timestamp);
        var timestampMS = timestamp;

        // Convert to string for validation
        timestamp = timestamp.toString();

        // Only convert timestamp to milliseconds if the string
        // represents a 10 digit integer
        if (/^\d+$/.test(timestamp) && timestamp.length === 10) {
          timestampMS = Number(timestamp * 1000);
        }

        console.log(timestampMS);
        return timestampMS;
      },

      /**
       * @ngdoc method
       * @methodOf wowApp.factory:utilitiesFactory
       * @name wowApp.factory:utilitiesFactory#genericHTTPCallbackError
       * @returns {undefined} Undefined
       * @param {object} data The data returned by the server
       * @param {number} status The status code returned by the server
       * @param {object} headers NOT USED. The headers returned by the server. Not currently used but this method could be extended to use this parameter
       * @param {object} config NOT USED. Request configuration settings. Not currently used but this method could be extended to use this parameter
       *
       * @description
       * A generic method that can be passed as the error callback function to an $http request function
       */
      genericHTTPCallbackError: function(data, status) {

        // If not found or forbidden
        if (status === 404 || status === 403) {
          // Broadcast the pageNotFound event
          $rootScope.$broadcast('event:pageNotFound');
        } else {
          // Broadcast the error event
          $rootScope.$broadcast('event:error');
        }

      }

    };

  });