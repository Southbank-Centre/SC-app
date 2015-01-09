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

  });
