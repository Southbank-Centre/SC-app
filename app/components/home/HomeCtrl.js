'use strict';

/**
 * @ngdoc controller
 * @name wowApp.controller:HomeCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the homeView state
 */
angular.module('wowApp')
  .controller('HomeCtrl', function ($rootScope, $scope, $window, homeFactory, eventFactory, personFactory, utilitiesFactory) {

    /**
     * Method for getting the homepage landing page for this festival from the API
     */
    homeFactory.getHomepageSingle(function(homepage) {

      $scope.homepage = homepage;

    }, utilitiesFactory.genericHTTPCallbackError);
    
    /**
     * Method for getting the count of events for this festival from the API
     */
    eventFactory.getEventCount(function(eventCount) {

      $scope.eventCount = eventCount;

    }, function() {

      $scope.eventCount = 0;

    });

    /**
     * Method for getting the count of persons for this festival from the API
     */
    personFactory.getPersonCount(function(personCount) {

      $scope.personCount = personCount;

    }, function() {

      $scope.personCount = 0;

    });

    // SEO REQUIREMENT: 
    // PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
    // we are finished with this controller. 
    // See: http://lawsonry.com/p?11040
    // 
    // $scope.htmlReady();

    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* var player;

    // this function gets called when API is ready to use
    //function onYouTubePlayerAPIReady() {
    document.onYouTubeIframeAPIReady = function() {
      // create the global player from the specific iframe (#video)
      player = new YT.Player('video', {
        events: {
          // call this function when player is ready to use
          'onReady': onPlayerReady
        }
      });
    }

    //function onPlayerReady(event) {

      $scope.playVideo = function() {
          console.log('hello');
          player.playVideo();
      }

    // } */

    var player;

    $window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('video', {
        //height: '38',
        //width: '640',
        //videoId: '',
        events: {
          'onReady': onPlayerReady, 
          'onStateChange': onPlayerStateChange
        }
      });

      console.log('api ready');
    }
    
    $window.onPlayerReady = function(event) {
      player.playVideo();
      
      $scope.playVideo = function() {
        // TODO use service
        player.playVideo();
      }

      console.log('ready');
    }
    
    $window.onPlayerStateChange = function(event) {
      if (event.data == YT.PlayerState.ENDED) {
        $timeout(function() {
          $scope.setPlayerVolume($scope.playerVolume);
          $scope.selectNextEntry();
        });
      }
    }
    
    $scope.pauseVideo = function() {
      //player.pauseVideo();
    }
    
    $scope.playVideo = function() {
      //player.playVideo();
    }

});
