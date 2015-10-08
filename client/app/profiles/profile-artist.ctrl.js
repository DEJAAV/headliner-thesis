(function() {
  angular.module('headliner.artistProfile', []).controller('ArtistProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope,
    Profile) { // Profile is the injected service 

    $scope.request = {};
    $scope.request.message = "We want you to play!"


    $scope.getArtistById = function(id){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].band_id.toString() === Profile.id) {
            $scope.artist = artists[artist]
          }
        }
      })
    };

    $scope.getArtistById(Profile.id);

    $scope.sendRequest = function() {
      $scope.request.band_id = Profile.id;
      $scope.request.receiver = 'band';
      $scope.request.sender = 'venue';
      Profile.sendRequest($scope.request);
    }

    $scope.minDate = new Date();
    $scope.opened = false;

    $scope.open = function() {
      $scope.opened = true;
    };

    $scope.disabled = function(date) {
      if ($scope.artist.venue){
        return $scope.artist.shows.map(function(show) {return show.date;}).indexOf(date.toISOString().split('T')[0]) > -1;   
      }
    };

  };
})();
