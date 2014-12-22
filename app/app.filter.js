'use strict';

angular
  .module('wowApp')
  /* 
    Filter to allow ng-bind-html to accept iframes (just add '| unsafe' to bind)
  */
  .filter('unsafe', function($sce) { return $sce.trustAsHtml; });
