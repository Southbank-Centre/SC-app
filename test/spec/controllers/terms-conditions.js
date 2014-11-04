'use strict';

describe('Controller: TermsConditionsCtrl', function () {

  // load the controller's module
  beforeEach(module('scAppApp'));

  var TermsConditionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TermsConditionsCtrl = $controller('TermsConditionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
