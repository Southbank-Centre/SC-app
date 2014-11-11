'use strict';

describe('Controller: EventSingleCtrl', function () {

  // load the controller's module
  beforeEach(module('wowApp'));

  var EventSingleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventSingleCtrl = $controller('EventSingleCtrl', {
      $scope: scope
    });
  }));

});
