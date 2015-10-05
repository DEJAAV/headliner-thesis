(function() {
  angular.module('headliner.profile', []).controller('ProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope,
    Profile) { // Profile is the injected service 

    $scope.request = {};

    var homepageUrl = $location.$$path.slice(0, ($location.$$path).length-1)
    var id = $location.$$path.slice(($location.$$path).length-1)

    $scope.getArtistById = function(id){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].band_id.toString() === id) {
            $scope.artist = artists[artist]
          }
        }
      })
    };
    $scope.getVenueById = function(id){
      Profile.getAllVenues().then(function(venues) {
        for (var venue in venues) {
          if (venues[venue].venue_id.toString() === id) {
            $scope.venue = venues[venue]
          }
        }
      })
    };
    if (homepageUrl === '/profile-artist/') {
      $scope.getArtistById(id);
    };
    if (homepageUrl === '/profile-venue/') {
      $scope.getVenueById(id)
    };
    $scope.sendRequest = function() {
      if (homepageUrl === '/profile-artist/') {
        $scope.request.band_id = id;
        $scope.request.receiver = 'band';
        $scope.request.sender = 'venue';
      };
      if (homepageUrl === '/profile-venue/') {
        $scope.request.venue_id = id;
        $scope.request.receiver = 'venue';
        $scope.request.sender = 'band';
      };
      Profile.sendRequest($scope.request);
    }
    $scope.init = function() {
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });
    }; 
  };
})();
