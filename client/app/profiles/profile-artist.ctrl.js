(function() {
  angular.module('headliner.artistProfile', []).controller('ArtistProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope, Profile, Messages, Auth) {
    $scope.request = {};
    $scope.request.message = "We want you to play!";
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

    $scope.getArtistById = function(){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].artist_id.toString() === Profile.id) {
            $scope.artist = artists[artist]
          }
        }
      })
    };

    $scope.getArtistById();

    $scope.shows = {};

    $scope.getShowsById = function(){
      Profile.getShows().then(function(shows){
        for (var i = 0 ; i < shows.length; i++) {
          if (shows[i].artist_id.toString() === Profile.id) {
            $scope.shows[i] = shows[i]
          };
        };
      });
      Profile.getAllVenues
    }

    $scope.getShowsById();

    $scope.getVenuesById = function() {
      Profile.getAllVenues().then(function(venues) {
        for (var show in $scope.shows) {
          console.log($scope.shows[show].venue_id, 'id');
          var id = $scope.shows[show].venue_id;
          for (var venue in venues) {
            console.log(venues[venue], 'venue')
            if (venues[venue].venue_id === id) {
              $scope.shows[show].venue_name = venues[venue].venue_name
            }
          }
        }
      });
    }

    $scope.getVenuesById()

    $scope.sendRequest = function() {
      $scope.request.artist_id = Profile.id;
      $scope.request.receiver = 'artist';
      $scope.request.sender = 'venue';
      $scope.request.date = new Date($scope.date).toLocaleString().split(',')[0]
      Profile.sendRequest($scope.request);
    }

    $scope.sendMessage = function() {
      $scope.message.date = new Date().toISOString();
      $scope.message.id = parseInt($location.$$path.slice($location.$$path.lastIndexOf('/')+1));
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

    $scope.checkType = function() {
      return $window.localStorage.getItem('type') !== $location.$$path.slice($location.$$path.lastIndexOf('-')+1,$location.$$path.lastIndexOf('/'));
    };

  };
})();
