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
                threshold : 300,
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
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:eventList
   * @directive
   *
   * @description
   * Renders event list component using it's relevant template
   *
   */
  .directive('eventList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/featuredEventsView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:personList
   * @directive
   *
   * @description
   * Renders person list component using it's relevant template
   *
   */
  .directive('personList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/featuredPersonsView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:pageList
   * @directive
   *
   * @description
   * Renders content page list component using it's relevant template
   *
   */
  .directive('pageList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/featuredPagesView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  });
