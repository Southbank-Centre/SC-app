'use strict';

angular
  .module('wowApp')
  /**
   * @ngdoc filter
   * @name wowApp.filter:unsafe
   * @filter
   *
   * @description
   * To allow ng-bind-html to accept iframes (just add '| unsafe' to bind)
   */
  .filter('unsafe', function($sce) {

    return $sce.trustAsHtml;

  })
  /**
   * @ngdoc filter
   * @name wowApp.filter:twoDecimalPlacesIfFixed
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
   * @name wowApp.filter:betterLimitTo
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

      if ((input.constructor === Object)) {
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

      if (input.constructor !== Array && typeof input !== 'string' && input.constructor !== Object) {
        return input;
      }

      return limit >= 0 ? input.slice(0, limit) : input.slice(limit);

    };

  });
