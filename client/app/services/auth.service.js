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
        console.log('Signup venue response: ', resp);
        $window.localStorage.setItem('type', resp.data.category);
        return resp.data;
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

    function who () {
      return $http({
        method: 'GET',
        url: '/auth/init'
      }).then(function(res) {
        return res.data;
      })
    };

    function getUserById () {
      return $http({
        method: 'GET',
        url: '/api/getId'
      }).then(function(res) {
        return res.data;
      })
    }

    return {
      signupGeneral: signupGeneral,
      signupVenue: signupVenue,
      signupArtist: signupArtist,
      login: login,
      isAuth: isAuth,
      signout: signout,
      who: who,
      getUserById: getUserById
    };
  };

})();