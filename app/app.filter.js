'use strict';

angular
  .module('wowApp')
  /**
   * @ngdoc filter
   * @name wowApp.filter:unsafe
   * @filter
   *
   * @description
   * To allow ng-bind-html to accept iframes (just add '| unsafe' to bind)
   */
  .filter('unsafe', function($sce) {

    return $sce.trustAsHtml;

  });
