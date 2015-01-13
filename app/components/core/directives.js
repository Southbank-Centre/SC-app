'use strict';

angular.module('wowApp')
  /**
   * @ngdoc directive
   * @name wowApp.directive:cssEqualHeight
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
   * @name wowApp.directive:lazy
   * @directive
   *
   * @description
   * Lazy load list pages images that have a class of 'lazy'
   * NB - add 'key-up-lazy' direction to any free text filter (see keyUpLazy)
   *
   */
  .directive('lazy', function($timeout) {
    return {
      restrict: 'C',
      link: function (scope, element) {
          $timeout(function() { 
            element.lazyload({
                threshold : 0,
                effect : 'fadeIn'
            }); 
          }, 0); 
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:keyUpLazy
   * @directive
   *
   * @description
   * Triggers scroll on keydown so that lazy-loaded images load
   *
   */
  .directive('keyUpLazy', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.on('keyup', function(event) {
          angular.element('html,body').scroll();
        });
      }
    };
  });
