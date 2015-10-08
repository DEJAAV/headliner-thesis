(function() {
  angular.module('headliner.editArtist', [])

  .controller('EditArtistController', EditArtistController);

  function EditArtistController($scope, $window, $location, $rootScope, Edit, Global) { // Edit is the injected service     

    $scope.song = {};

    $scope.allGenres = Global.allGenres;
    $scope.states = Global.states;

    $scope.currentUser = {
      username: "ellie.matsusaka@gmail.com",
      password: '9854376054673657'
    }

    $scope.user = {
      "member":{"Ellie":"drummer","Bob":"lead guitar"},
      "artist_name":"JohnnySwim",
      "bio":"We love all music and dancing.",
      "city":"Austin",
      "state":"TX",
      "zip":"78751",
      "onTour":"Touring",
      "record_label":"Def Jam Records",
      "genre":{"Comedy":true,"Blues":true,"Coverband":true},
      "contact_name":"Ellie Matsusaka",
      "phone":"8327944795",
      "facebook":"http://www.facebook.com/ellie",
      "soundcloud":"http://www.soundcloud.com/ellie",
      "youtube":"http://www.youtube.com/ellie",
      "website":"http://www.website.com/ellie"
      };    
    
    $scope.updateArtistInfo = function(artist) {
      Edit.updateArtistInfo(artist);
      console.log('successfully updated artist info');
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
      console.log('successfully updated user password');
    };  
    $scope.remove = function(index){
      $scope[yourArray].splice(index, 1) //fix this, the member property is an object, not an array..
    };

  }
})();