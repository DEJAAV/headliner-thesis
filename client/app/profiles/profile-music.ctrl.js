(function() {
  angular.module('headliner.music', [])
  .controller('MusicController', MusicController);

  function MusicController($scope, $window, $location, $rootScope, Profile, Auth) { 
    
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);
    
    // hard coded songs TB removed. Songs array ret from getAllSongs()
    $scope.songs = [
      {
        url: "https://s3-us-west-2.amazonaws.com/headliner/01+Wherever+Is+Your+Heart.m4a",
        title: "Wherever is Your Heart"
      },
      {
        url: "https://s3-us-west-2.amazonaws.com/headliner/02+Hot+N_gga.m4a",
        title: "Bobby Shmurda duh you love it"
      },
      {
        url: "https://s3-us-west-2.amazonaws.com/headliner/03+-+Drunk+in+Love+(Explicit+Version)+%5BExplicit%5D.mp3",
        title: "A little Beyonce (4 Vahags)"
      },
      {
        url: "https://s3-us-west-2.amazonaws.com/headliner/07+Peace+Train.m4a",
        title: "Peace Train"
      }
    ];  
    
    $scope.getAllSongs = function() {
      Profile.getAllSongs().then(function(songs) {
        console.log('Object returned from GetAllSongs: ', songs);
        //grab the old length to compare if there are new songs to pushed into the player
        var oldSongs = $scope.songs.length-1;
        for(var i = oldSongs; i < songs.length; i++) {
          //take relevant song information and format an object to push into our scope
          var formattedSong = {
            url: songs[i].url,
            title: songs[i].title,
            artist: songs[i].artist
          };
          $scope.songs.push(formattedSong);
        }
      })
    }

    $scope.getAllSongs();
  };
})();
