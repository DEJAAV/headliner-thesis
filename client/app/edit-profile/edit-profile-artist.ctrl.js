(function() {
  angular.module('headliner.editArtist', [])

  .controller('EditArtistController', EditArtistController);

  function EditArtistController($scope, $window, $location, $rootScope, Edit) { // Edit is the injected service     

    $scope.song = {};

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function (state) { 
        return { abbrev: state }; 
        });

    $scope.user = {
      username: "ellie.matsusaka@gmail.com",
      password: '9854376054673657'
    }
    
    $scope.updateArtistInfo = function(artist) {
      Edit.updateArtistInfo(artist);
      console.log('successfully updated artist info');
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
      console.log('successfully updated user password');
    };  


  }
})();