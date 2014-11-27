'use strict';

// directive to get the height of an adjacent element to create equal height columns
// NB - not currently used - use css table-cell property instead if possible

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