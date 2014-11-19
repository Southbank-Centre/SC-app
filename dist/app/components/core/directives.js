'use strict';

angular.module('wowApp').directive('cssEqualHeight', function () {
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