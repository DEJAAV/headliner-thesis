/* $scope.songs = [
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
    */

(function(){

  angular.module('headliner.musicService', [])

  .factory('Music', Music)

  function Music ($http, $location, $window) {
  
    var songs = [];

    var makeSong = function (song) {
      var newSong = {};
      newSong.url = song.url;
      newSong.title = song.title;
      newSong.artist = song.artist;
      return newSong;
    }

    var addSongtoList = function (song) {
      songs.push(song);
      console.log('song added to list');
    }

    return {
      songs: songs,
      makeSong: makeSong,
      addSongtoList: addSongtoList
    }
  }
})();