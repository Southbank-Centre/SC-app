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
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:youtubePromo
   * @directive
   *
   * @description
   * Renders youtube embed component using youtube promo view template
   *
   */
  .directive('youtubePromo', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/youtubePromoView.html';
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
   * @name wowApp.directive:linkList
   * @directive
   *
   * @description
   * Renders link list component using link list view template
   *
   */
  .directive('linkList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/linkListView.html';
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
   * @name wowApp.directive:htmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('htmlBlock', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var tpl = 'app/components/content_components/htmlBlockView.html';
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
   * @name wowApp.directive:festivalPlanner
   * @directive
   *
   * @description
   * Embed sched.org festival planner
   *
   */
   .directive('festivalPlanner', function($http, $compile, $state, $templateCache) {
      return {
        restrict: 'A',
        //replace: true,
        // template: "<a id='sched-embed' href='http://wowtestv012015.sched.org/''>View the SCTest schedule & directory.</a><script type='text/javascript-lazy' src='http://wowtestv012015.sched.org/js/embed.js'></script>",

        compile: function() {

          return function(scope, element) {

            //$templateCache.removeAll();

            var tpl = '<a id="sched-embed" href="http://wowtestv012015.sched.org/">View the SCTest schedule & directory.</a><script type="text/javascript" src="http://wowtestv012015.sched.org/js/embed.js"><div id="sched-script"></div></script>';
            element.html($compile(tpl)(scope));

            scope.$on('$stateChangeSuccess', function() {  

              // $state.reload();  
              // location.reload();
              // $state.go('wow.home');
              //window.location.reload();
              //$window.location.href = '/festival-planner';
                
            });

            $compile(element.contents())(scope);

          };
        }

      };

    });
    /* .directive('festivalPlanner', function($compile) {
      return {
        restrict: 'A',
        link: function (scope, element, template){
          template = '<iframe src="http://wowtestv012015.sched.org" width="100%" height="400"></iframe>';
          template = '<a id="sched-embed" href="http://wowtestv012015.sched.org/">View the SCTest schedule & directory.</a><script type="text/javascript" src="http://wowtestv012015.sched.org/js/embed.js"></script>';
          element.html(template);
          $compile(element.contents())(scope); 
        }
      };
    }); */
