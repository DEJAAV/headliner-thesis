(function(){

  angular.module('headliner.homepage', [])

  .controller('HomepageController', HomepageController);

  function HomepageController ($scope, $window, $location, $rootScope, Homepage) { // Homepage is the injected service     

  $rootScope.initVenue = function () {
    console.log('initVenue is being called')
    Homepage.getAllArtists()
    .then(function (all) {
      $scope.artists = all;
    })
  } 

    $rootScope.initArtist = function () {
      console.log('initArtist is being called')
      Homepage.getAllVenues()
      .then(function (all) {
        $scope.venues = all;
      })
    } 
  }
})();