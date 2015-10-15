(function() {
  angular.module('headliner.artistProfile', []).controller('ArtistProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope, Profile, Messages, Auth) {
    $scope.request = {};
    $scope.request.message = "We want you to play!";
    $scope.id = $location.$$path.slice(($location.$$path).lastIndexOf('/')+1)
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

    $scope.getArtistById = function(){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].artist_id.toString() === $scope.id) {
            $scope.artist = artists[artist]
            $window.document.getElementById('profpic').src = $scope.artist.profile_pic || 'https://c2.staticflickr.com/6/5481/11725796704_fb2b9e84f6.jpg';
          }
        }
      })
    };

    $scope.getArtistById();


    $scope.shows = {};

    Profile.getShows().then(function(shows){
      for (var i = 0 ; i < shows.length; i++) {
        if (shows[i].artist_id.toString() === $scope.id) {
          $scope.shows[i] = shows[i]
        };
      };
    });

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

    $scope.sendRequest = function() {
      $scope.request.artist_id = $scope.id;
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
