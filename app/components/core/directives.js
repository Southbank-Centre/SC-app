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
  });
  /*
  .directive('scroll', function($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind("scroll", function() {
        var $el = angular.element( document.querySelector('#' + attrs.scroll))[0];
        console.log($el.offsetTop)
        if (this.pageYOffset >= $el.offsetTop) {
          scope.scrolledDown = true;
        } else {
          scope.scrolledDown = false;
        }
        scope.$apply();
      });
    };
  });
  */