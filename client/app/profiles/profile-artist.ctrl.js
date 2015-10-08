(function() {
  angular.module('headliner.artistProfile', []).controller('ArtistProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope,
    Profile, Messages) { // Profile is the injected service 

    $scope.request = {};
    $scope.request.message = "We want you to play!"


    $scope.getArtistById = function(id){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].artist_id.toString() === Profile.id) {
            $scope.artist = artists[artist]
          }
        }
      })
    };

    $scope.getArtistById(Profile.id);

    $scope.sendRequest = function() {
      $scope.request.artist_id = Profile.id;
      $scope.request.receiver = 'artist';
      $scope.request.sender = 'venue';
      $scope.request.date = $scope.date
      Profile.sendRequest($scope.request);
    }

    $scope.sendMessage = function() {
      $scope.message.date = new Date().toISOString();
      $scope.message.id = $location.$$path.slice(16);
      Messages.sendMessage($scope.message);
    };

    $scope.init = function() {
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });
    };
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
