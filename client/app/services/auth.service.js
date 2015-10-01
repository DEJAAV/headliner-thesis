// 'headliner.service'


(function(){

  angular.module('headliner.authService', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {

    function signupGeneral(user) {
      console.log('signupGeneral POST: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/local', 
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    function signupVenue(user) {
      console.log('signupVenue POST: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/venues', 
        data: user
      })
      .then(function(resp) {
        $window.localStorage.setItem('type', 'venue');
        return resp.data.token;
      });
    };

    function signupArtist(user) {
      console.log('signupArtist POST: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/artists', 
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };    

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (res) {
      console.log(res, 'the response')
      return res.data;
    });
  };

    // check if a user is authorized when user switch pages on app
    function isAuth () {
      return !!$window.localStorage.getItem('headliner');
    };

    // signout user by removing token that is stored in the client's localStorage
    function signout () {
      console.log('signout is being called in auth service')
      $window.localStorage.removeItem('headliner');
      $window.localStorage.removeItem('type');
      $location.path('/');
    };

    return {
      signupGeneral: signupGeneral,
      signupVenue: signupVenue,
      signupArtist: signupArtist,
      login: login,
      isAuth: isAuth,
      signout: signout
    };
  };

})();