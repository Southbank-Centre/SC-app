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
   * @name wowApp.directive:lazyLoad
   * @directive
   *
   * @description
   * Lazy load list pages images that have a class of 'lazy'
   * NB - add 'onkeyup="$('body,html').scroll();"' to any free text filter 
   * to invoke lazy load again 
   * (see http://stackoverflow.com/questions/16692779/trigger-lazyload-with-fake-scrolling)
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
  });
