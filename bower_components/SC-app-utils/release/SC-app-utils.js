'use strict';

/**
 * @ngdoc overview
 * @name SC-app-event
 * @description
 *
 * Provides the app with utilities that are used by lots of the other modules
 */
angular
  .module('SC-app-utils', [
    'angular.filter',
    'angularMoment',
]);;'use strict';

angular.module('SC-app-utils')
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:cssEqualHeight
   * @directive
   *
   * @description
   * To get the height of an adjacent element to create equal height columns
   * 
   * NB - not currently used - use css table-cell property instead if possible
   */
  .directive('cssEqualHeight', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {

        var elementToCopyProperty = attr.cssEqualHeight,
          source = document.getElementById(elementToCopyProperty.toString());
        // Set height
        element[0].style.maxHeight = source.clientHeight + 'px';
        
      }
    };
  })
  /**
   * @ngdoc directive
   * @name SC-app-utils.directive:lazy
   * @directive
   *
   * @description
   * Lazy load list pages images that have a class of 'lazy'
   * NB - add 'key-up-lazy' direction to any free text filter (see keyUpLazy)
   *
   */
  .directive('lazy', ["$timeout", function($timeout) {
    return {
      restrict: 'C',
      link: function (scope, element) {
        $timeout(function() { 
          element.lazyload({
              threshold : 300,
              effect : 'fadeIn'
          }); 
        }, 0); 
      }
    };
  }]);;'use strict';

angular
  .module('SC-app-utils')
  /**
   * @ngdoc filter
   * @name SC-app-utils.filter:unsafe
   * @filter
   *
   * @description
   * To allow ng-bind-html to accept iframes (just add '| unsafe' to bind)
   */
  .filter('unsafe', ["$sce", function($sce) {

    return $sce.trustAsHtml;

  }])
  /**
   * @ngdoc filter
   * @name SC-app-utils.filter:twoDecimalPlacesIfFixed
   * @filter
   *
   * @description
   * Add 2 decimal points if the number requires them.
   * E.g. 20.00 = 20; 40.5 = 40.50
   */
  .filter('twoDecimalPlacesIfFixed', function() {

    return function (number) {

      var num = parseFloat(number);
      var num2 = num.toFixed(2);
      var num0 = num.toFixed(0);

      if ((num2 - num0) !== 0) {
        return num2.toString();
      } else {
        return num0.toString();
      }

    };

  })
  /**
   * @ngdoc filter
   * @name SC-app-utils.filter:betterLimitTo
   * @filter
   *
   * @description
   * Angular's 'limitTo' filter only limits strings and arrays.
   * This filter also limits objects
   */
  .filter('betterLimitTo', function() {

    return function(input, limit) {

      if (Math.abs(Number(limit)) === Infinity) {
        limit = Number(limit);
      } else {
        limit = parseInt(limit, 10);
      }

      if (isNaN(limit)) {
        return input;
      }

      if ((typeof input === 'number')) {
        input = input.toString();
      }

      if (typeof input === 'undefined') {
        return input;
      }

      if (input.constructor !== Array && typeof input !== 'string' && input.constructor !== Object) {
        return input;
      }

      if (input.constructor === Object) {
        var keys = Object.keys(input);
        if (keys.length < 1) {
          return [];
        }

        var ret = {}, count = 0;
        angular.forEach(keys, function(key){
          if (count >= limit) {
            return false;
          }
          ret[key] = input[key];
          count++;
        });

        return ret;
      }

      return limit >= 0 ? input.slice(0, limit) : input.slice(limit);

    };

  });
;'use strict';

/**
 * @ngdoc service
 * @name SC-app-utils.factory:utilitiesFactory
 *
 * @description
 * Utilities that are generic and useful at various points through the app
 */

angular.module('SC-app-utils')
  .factory('utilitiesFactory', ["$rootScope", function($rootScope) {

    return {

      /**
       * @ngdoc method
       * @methodOf SC-app-utils.factory:utilitiesFactory
       * @name SC-app-utils.factory:utilitiesFactory#timestampSecondsToMS
       * @returns {string} timestampMS The timestamp in milliseconds
       * @param {string | number} timestamp A timestamp in seconds
       *
       * @description
       * Converts timestamp given in seconds to timestamp given in milliseconds
       */
      timestampSecondsToMS: function(timestamp) {
        var timestampMS = timestamp;

        // Convert to string for validation
        timestamp = timestamp.toString();

        // Only convert timestamp to milliseconds if the string
        // represents a 10 digit integer
        if (/^\d+$/.test(timestamp) && timestamp.length === 10) {
          timestampMS = Number(timestamp * 1000);
        }

        return timestampMS;
      },

      /**
       * @ngdoc method
       * @methodOf SC-app-utils.factory:utilitiesFactory
       * @name SC-app-utils.factory:utilitiesFactory#genericHTTPCallbackError
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

  }]);