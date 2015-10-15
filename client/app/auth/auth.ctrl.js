(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth, Global, Music, Messages, Requests, $rootScope) {
    $scope.venue = {};
    $scope.user = {}; // for artists
    $scope.user.members = {};

    $scope.states = Global.states;
    $scope.allGenres = Global.allGenres;
    $scope.allTypes = Global.allTypes;

    $scope.songs = [];

    $scope.song = {
      url: undefined,
      title: undefined,
      artist: undefined
    }

    $scope.addSongtoList = function (song) {
      $scope.songs.push(song);
      $scope.user.songs = $scope.songs;
      $scope.song = null;
    }

    $scope.signupGeneral = function () {
      Auth.signupGeneral($scope.user)
        .then(function (data) {
          $location.path('/select'); 
          $window.localStorage.setItem('headliner', data.token);
          $window.localStorage.setItem('type', null);
        })
        .catch(function (error) {
            $scope.user.error = 'Username is already taken.'
            console.error(error);
        });
    };

    $scope.signupVenue = function () {
      Auth.signupVenue($scope.venue)
        .then(function (data) {
          $location.path('/homepage-venue');
          $window.localStorage.setItem('type', 'venue');
          $scope.init();
          $window.location.reload();
        })
        .catch(function(error){
          console.log(error);
        });
    };

    $scope.signupArtist = function () {
      Auth.signupArtist($scope.user)
        .then(function (data) {
          $location.path('/homepage-artist');
          $window.localStorage.setItem('type', 'artist');
          $scope.init();
          $window.location.reload();
        })
        .catch(function(error){
          console.log(error);
        });
    };    

    //Sets a artist member's name as a property in the
    //member object, their role as the value
    $scope.addNewMember = function(name, role){
        $scope.user.members[name] = role;
        $scope.name = "";
        $scope.role = "";
     };

    $scope.login = function () {
    Auth.login($scope.user)
      .then(function (data) {
        if(data.error) {
          $scope.login.error = data.error;
        } else {
          if (data.type === 'venue') {
            $location.path('/homepage-venue');
          } else if (data.type === 'artist') {
            $location.path('/homepage-artist');
          } else {
            $location.path('/select');
          }
          $window.localStorage.setItem('headliner', data.token);
          $window.localStorage.setItem('type', data.type);
          $scope.init();
        }
        console.log('dadadata', data)
      })
      .catch(function (error) {
        console.log('error with login: ', error)
      });
    };

    $scope.signout = function() {
      Auth.signout();
      $window.localStorage.removeItem('headliner');
      $window.localStorage.removeItem('type');
    };

    $scope.checkType = function(type) {
      return $window.localStorage.getItem('type') === type;
    };

    $scope.loggedIn = function() {
      return Auth.isAuth();
    };
    
    $scope.init = function() {
      if ($scope.loggedIn()) {
        $scope.type = $window.localStorage.getItem('type');
        Messages.getMessages().then(function(messages) {
          $scope.unreadMessages = messages.reduce(function(unreadMessages, message) {
            return message.unread + unreadMessages;
          },0);
        });
        Requests.getRequests().then(function(requests) {
          $scope.unreadRequests = requests.reduce(function(unreadRequests, request) {
            return !request.read && request.sender !== $scope.type ? unreadRequests + 1 : unreadRequests;
          },0);
        });
        Auth.getUserById().then(function(user) {
          if (user[0].venue_id) {
            $scope.id = user[0].venue_id;
          } else if (user[0].artist_id) {
            $scope.id =  user[0].artist_id;
          }
        });
      }
    };
    $scope.init();

    $rootScope.init = function() {
      $scope.init();
    };

  }
})();
