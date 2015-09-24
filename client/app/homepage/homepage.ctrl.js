
(function(){

  angular.module('headliner.homepage', [])

  .controller('HomepageController', HomepageController);

  function HomepageController ($scope, $window, $location, Homepage) { // Homepage is the injected service     
    $scope.getAllArtists = function () {
      Homepage.getAllArtists()
    }

    $scope.getAllArtists = function () {
      Homepage.getAllVenues()
    }  
  }
})();