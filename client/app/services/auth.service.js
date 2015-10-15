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
      .then(function(res) {
        return res.data;
      });
    };

    function signupVenue(user) {
      console.log('signupVenue POST: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/venues', 
        data: user
      })
      .then(function(res) {
        return res.data;
      });
    };

    function signupArtist(user) {
      console.log('signupArtist POST: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/artists', 
        data: user
      })
      .then(function(res) {
        return res.data.token;
      });
    };    

    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function(res) {
        return res.data;
      });
    };

    // check if a user is authorized when user switch pages on app
    function isAuth () {
      return !!$window.localStorage.getItem('headliner');
    };

    // signout user by removing token that is stored in the client's localStorage
    function signout() {
      return $http({
        method: 'GET',
        url: '/logout'
      }).then(function(res) {
        return res.data;
      })
    };

    function who() {
      return $http({
        method: 'GET',
        url: '/auth/init'
      }).then(function(res) {
        return res.data;
      })
    };

    function getUserById() {
      return $http({
        method: 'GET',
        url: '/api/getId'
      }).then(function(res) {
        return res.data;
      })
    };

    function getSignedRequest(file) {
      return $http({
        method: 'GET',
        url: '/sign_s3?file_name='+file.name+'&file_type='+file.type
      }).then(function(res) {
        return res.data;
      })
    };

    function uploadFile(file, signed_request) {
      return $http({
        method: 'PUT',
        url: signed_request,
        headers: {
          'x-amz-acl': 'public-read',
          'content-type': file.type
        },
        data: file
      }).then(function(res) {
        return res;
      }, function(err) {
        if(err) {
          $window.alert('Could not upload file');
        }
      })
    };

    function sendFile(url) {
      return $http({
        method: 'POST',
        url: '/submit_form',
        data: url
      }).then(function(res) {
        console.log('the response from sendFile: ', res);
        return res;
      })
    };

    return {
      signupGeneral: signupGeneral,
      signupVenue: signupVenue,
      signupArtist: signupArtist,
      login: login,
      isAuth: isAuth,
      signout: signout,
      who: who,
      getUserById: getUserById,
      getSignedRequest: getSignedRequest,
      uploadFile: uploadFile,
      sendFile: sendFile
    };
  };

})();
