'use strict';

describe('Controller: EventSingleCtrl', function() {

  var EventSingleCtrl, stateParams, mockEventFactorySuccess, mockEventFactoryFailure;
  
  // load the controller's module
  beforeEach(module('wowApp'));

  // setup mock event factory for successful HTTP request
  mockEventFactorySuccess = {
    'event_0': {},
    'event_1': {startDate: 'startDate value', title: 'title value'},
    'event_2': {location: 'location value', title: 'title value'},
    'event_3': {location: 'location value', startDate: 'startDate value'},
    'event_4': {location: 'location value', startDate: 'startDate value', title: 'title value'},
    getEventSingle: function(eventId, callbackSuccess) {

      // Run the success callback that is passed into this method
      // by the real eventSingleController
      callbackSuccess(this['event_'+eventId]);

    }
  };

  it('should route to 404 page if none of the required fields are present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 0};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create EventSingleCtrl
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should route to 404 page if location field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 1};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create EventSingleCtrl
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should route to 404 page if startDate field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 2};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create EventSingleCtrl
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should route to 404 page if title field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 3};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create EventSingleCtrl
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactorySuccess});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

  it('should add the event data to the scope if the required fields are present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 4};

      // while creating the controller we have to inject the dependencies too.
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactorySuccess});

      // the event object should be defined
      expect(scope.event).toBeDefined();
    })
  );

  // setup mock event factory for failed HTTP request
  mockEventFactoryFailure = {
    getEventSingle: function(eventId, callbackSuccess, callbackFailure) {

      // Run the failure callback that is passed into this method
      // by the real eventSingleController
      callbackFailure(null, 404);

    }
  };

  it('should route to 404 page if title field not present',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // set the event ID
      stateParams = {eventId: 'not-a-real-event-ID'};

      // spy on $broadcast
      spyOn(scope, '$broadcast');

      // create EventSingleCtrl
      EventSingleCtrl = $controller('EventSingleCtrl', {$rootScope: scope, $scope: scope, $stateParams: stateParams, eventFactory:mockEventFactoryFailure});

      // the 'event:pageNotFound' event should have been broadcast
      expect(scope.$broadcast).toHaveBeenCalledWith('event:pageNotFound');
    })
  );

});
