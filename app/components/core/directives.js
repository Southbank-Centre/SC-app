'use strict';

angular.module('wowApp').directive('cssEqualHeight', function () {
    return {
        restrict: 'A',
        scope: {
        },
        link: function (scope, element, attr) {
            var elementToCopyProperty = attr.cssEqualHeight,
                source = document.getElementById(elementToCopyProperty.toString());
            //set height
            element[0].style.height = source.clientHeight + 'px';
        }
    };
});