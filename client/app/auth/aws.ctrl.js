(function(){

  angular.module('headliner.aws', [])

  .controller('AWSController', AWSController);

  function AWSController ($scope, $window, Auth, $location) {

    $scope.user.songs = [];
    var song = {};
    $scope.uploadFile = function(file, signed_request, url) {
      //this is the PUT request using the signed request allowing us to upload something to our bucket on s3
      Auth.uploadFile(file, signed_request)
        .then(function() {
          console.log('file type', file.type)
          //this is a syntax fix for a working url
          var fixedUrl = url.replace('headliner', 'headliner/');
          fixedUrl = fixedUrl.split(' ').join('+');
          if(file.type === 'audio/mp3' || file.type === 'audio/x-m4a') {
            var song = {
              url: fixedUrl,
              title: $scope.title
            }
            $scope.user.songs.push(song)
          } else {
          //sets the src for the img tag based off of the fixed url
            $window.document.getElementById('preview').src = fixedUrl;
            if ($location.$$path === "/signup-venue/basic") {
              $scope.venue.profile_pic = fixedUrl
            } else {
              $scope.user.profile_pic = fixedUrl
            }
          }
        })
    };

    $scope.getSignedRequest = function(file) {
      Auth.getSignedRequest(file)
        .then(function(data) {
          $scope.uploadFile(file, data.signed_request, data.url)
        })
    };

    $scope.initUpload = function() {
      var files = $window.document.getElementById('file_input').files;
      var file = files[0];
      if(file === null) {
        $window.alert('No file selected.');
        return;
      }
      console.log('This is what the file looks like: ', file);
      $scope.getSignedRequest(file);
    };
    
    //will be triggered by a submit function passing $scope.profilePic into it
    $scope.sendFile = function(url) {
      var url = url.split(' ').join('+');
      console.log('The url being sent in sendFile controller: ', url);
      var body = {};
      body.url = url;
      Auth.sendFile(body)
        .then(function(res) {
          console.log('res status: ', res.status);
        })
    };

    $window.document.getElementById('file_input').onchange = $scope.initUpload;
  }
})();