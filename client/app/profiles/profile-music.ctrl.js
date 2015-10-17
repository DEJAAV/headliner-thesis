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

    $scope.songs = [
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
        title: "One In A Million",
        artist: "Aaliyah",
      },
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3",
        title: "Age Ain't Nothing But A Number",
        artist: "Aaliyah",
      },
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3",
        title: "Hot Like Fire",
        artist: "Aaliyah",
      },
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3",
        title: "If Your Girl Only Knew",
        artist: "Aaliyah",
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
