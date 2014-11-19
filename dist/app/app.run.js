'use strict';

angular
  .module('wowApp')
  .run(['$rootScope', '$state', function(scope, state) {

    // Setup pageNotFound event
    scope.$on('event:pageNotFound', function() {
      
      // Show 404 state
      state.go('404');

    });

  }]);