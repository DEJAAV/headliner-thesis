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
    
    $scope.initArtist = function() {
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });
      Auth.getUserById().then(function(user) {
        return user[0].artist_id;
      }).then(function(artist_id) {
        Profile.getAllArtists().then(function(artists) {
          for (var i = 0; i < artists.length; i++) {
            if (artists[i].artist_id === artist_id) {
              $scope.artist = artists[i];
              $scope.shows = artists[i].shows;
            }
          }
        });
      });
    };

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
