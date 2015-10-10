(function(){

  angular.module('headliner.aws', [])

  .controller('AWSController', AWSController);

  function AWSController ($scope) {

  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  // needs to be stored somewhere else 
  $scope.creds          = {
    access_key: 'AKIAIKHYK5CEUV6TLYSA',
    secret_key: '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',
    bucket: 'headliner'
  };
     
  $scope.upload = function() {
    AWS.config.region = 'us-west-2';
    var bucket = new AWS.S3({ 
      params: { 
        Bucket: $scope.creds.bucket 
      } 
    });
    
    if($scope.file) {
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

        var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {
          if(err) {
            toastr.error(err.message,err.code);
            return false;
          }
          else {
            console.log('params:', params)
            console.log('data: ', data)
            // Upload Successfully Finished
            toastr.success('File Uploaded Successfully', 'Done');

            // save the url it's going to be
            $scope.url = 'https://s3-us-west-2.amazonaws.com/headliner/' + params.Key.replace(' ', '+');
            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })

        .on('httpUploadProgress',function(progress) {
          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
          $scope.$digest();
        });
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    }

    $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

  $scope.uniqueString = function() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text, 'uniqueString')
    return text;
  }

  }
})();