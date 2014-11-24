'use strict';

describe('Controller: HomeCtrl', function() {

  var HomeCtrl, stateParams, mockFestivalFactorySuccess, mockFestivalFactoryFailure;
  
  // load the controller's module
  beforeEach(module('wowApp'));

  // setup mock festival factory for successful HTTP request
  mockFestivalFactorySuccess = {
    'festival_0': {},
    'festival_1': {startDate: 'startDate value'},
    'festival_2': {festivalName: 'festivalName value'},
    'festival_3': {startDate: 'startDate value', festivalName: 'festivalName value'},
    getFestivalSingle: function(festivalId, callbackSuccess) {

      // Run the success callback that is passed into this method
      // by the real HomeCtrl
      callbackSuccess(this['festival_'+festivalId]);

    }
  };

  it('should route to 404 page if none of the required fields are present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {festivalId: 0};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create HomeCtrl
      HomeCtrl = $controller('HomeCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, festivalFactory:mockFestivalFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should route to 404 page if festivalName field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {festivalId: 1};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create HomeCtrl
      HomeCtrl = $controller('HomeCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, festivalFactory:mockFestivalFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should route to 404 page if startDate field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {festivalId: 2};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create HomeCtrl
      HomeCtrl = $controller('HomeCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, festivalFactory:mockFestivalFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should add the event data to the scope if the required fields are present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {festivalId: 3};

      // create HomeCtrl
      HomeCtrl = $controller('HomeCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, festivalFactory:mockFestivalFactorySuccess});

      // the event object should be defined
      expect(scope.festival).toBeDefined();
    })
  );

  // setup mock festival factory for failed HTTP request
  mockFestivalFactoryFailure = {
    getFestivalSingle: function(festivalId, callbackSuccess, callbackFailure) {

      // Run the failure callback that is passed into this method
      // by the real HomeCtrl
      callbackFailure(null, 404);

    }
  };

  it('should route to 404 page if title field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {festivalId: 'not-a-real-festival-ID'};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create HomeCtrl
      HomeCtrl = $controller('HomeCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, festivalFactory:mockFestivalFactoryFailure});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

});
