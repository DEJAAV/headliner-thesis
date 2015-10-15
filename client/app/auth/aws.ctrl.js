(function(){

  angular.module('headliner.aws', [])

  .controller('AWSController', AWSController);

  function AWSController ($scope, $window, Auth) {
    $scope.uploadFile = function(file, signed_request, url) {
      console.log('These are your arguments...');
      console.log('file: ', file);
      console.log('signed_request: ', signed_request);
      console.log('url: ', url);
      //this is the PUT request using the signed request allowing us to upload something to our bucket on s3
      Auth.uploadFile(file, signed_request)
        .then(function() {
          //this is a syntax fix for a working url
          var fixedUrl = url.replace('headliner', 'headliner/');
          fixedUrl = fixedUrl.split(' ').join('+');
          //sets the src for the img tag based off of the fixed url
          $window.document.getElementById('preview').src = fixedUrl;
          $scope.profilePic = fixedUrl;
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