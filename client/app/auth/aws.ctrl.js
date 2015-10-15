(function(){

  angular.module('headliner.aws', [])

  .controller('AWSController', AWSController);

  function AWSController ($scope, $window, $document, Auth) {
    $scope.uploadFile = function(file, signed_request, url) {
      console.log('These are your arguments...');
      console.log('file: ', file);
      console.log('signed_request: ', signed_request);
      console.log('url: ', url);
      Auth.uploadFile(file, signed_request)
        .then(function() {
          var fixedUrl = url.replace('headliner', 'headliner/');
          fixedUrl = fixedUrl.split(' ').join('+');
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

    $scope.sendFile = function(url) {
      var url = url.split(' ').join('+');
      console.log('The url being sent in sendFile controller: ', url2);
      Auth.sendFile(url2)
        .then(function(res) {
          console.log('res status: ', res.status);
        })
    };

    $window.document.getElementById('file_input').onchange = $scope.initUpload;
  }
})();