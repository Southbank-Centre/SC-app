'use strict';

/**
 * @ngdoc overview
 * @name SC-app
 * @description
 */
angular
  .module('SC-app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angular.filter',
    'duScroll',
    'angularMoment',
    'SC-app-utils',
    'infinite-scroll',
    'angular-data.DSCacheFactory',
    'angularUtils.directives.dirDisqus',
    'SC-app-utils',
    'SC-app-content-components',
    'SC-app-header',
    'SC-app-footer',
    'SC-app-festival',
    'SC-app-landing-page',
    'SC-app-event',
    'SC-app-page',
    'SC-app-person',
    'SC-app-blog',
    'SC-app-planner'
  ]);