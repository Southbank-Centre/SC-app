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


              // Add &enablejsapi=1 to youtube url
              var iframe = angular.element(scope.component.field_youtube_embed_code.value);
              var url = iframe.attr('src');
              url = url + '&enablejsapi=1';
              var player_id = 'player_' + Date.now();
              iframe.attr('src', url);
              iframe.attr('id', player_id);
              scope.component.field_youtube_embed_code.value = iframe[0].outerHTML;

              element.html($compile(response.data)(scope));

              var waitForYouTubeIframeAPI = function() {

                setTimeout(function() {

                  // If the YouTube Iframe API is ready, wait again
                  if (!window.youTubeIframeAPIReady) {

                    waitForYouTubeIframeAPI();

                  } else {

                    var player;

                    player = new YT.Player(player_id, {
                      events: {
                        onReady: function() {
                          // Attach playVideo to scope, which is used on
                          // big play button
                          scope.playVideo = function(el) {
                            player.playVideo();
                            //element.find('#play-button').css('display','none');
                          }
                        }
                      }
                    });

                  }
                  
                }, 200);

              };

              waitForYouTubeIframeAPI();

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
   * @name wowApp.directive:scrollPosition
   * @directive
   *
   * @description
   * Adds the scroll position to the scope to allow for scroll events (eg show/hide element)
   *
   */
  .directive('scrollPosition', function($window) {
    return {
      scope: {
        scroll: '=scrollPosition'
      },
      link: function(scope, element, attrs) {
        var windowEl = angular.element($window);
        var handler = function() {
          scope.scroll = windowEl.scrollTop();
        }
        windowEl.on('scroll', scope.$apply.bind(scope, handler));
        handler();
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:websiteTitle
   * @directive
   *
   * @description
   * Adds the title of the website into the title element
   *
   */
  .directive('websiteTitle', function($rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.$on('event:festivalDataLoaded', function() {
          element.html($rootScope.websiteTitle);
        });   
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:websiteMetaDescription
   * @directive
   *
   * @description
   * Adds the wesbite description meta tag
   *
   */
  .directive('websiteMetaDescription', function($rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.$on('event:festivalDataLoaded', function() {
          element.attr('content', $rootScope.websiteDescription);
        });

        scope.$on('event:displayingEventPage', function() {
          element.attr('content', $rootScope.eventDescription);
        });

        scope.$on('$stateChangeStart', function() {
          $rootScope.eventDescription = '';
          element.attr('content', $rootScope.websiteDescription);
        });
      }
    };
  });
