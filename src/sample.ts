
// Load the SDK and UUID
const AWS = require('aws-sdk');
const uuid = require('uuid');
const bucketName = 'node-sdk-sample-' + uuid.v4();
const keyName = 'hello_world.txt';

var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

bucketPromise
.then(data => {
      var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
      var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();

      uploadPromise
      .then(data => {
          console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
        });
})
.catch(err => {
      console.error(err, err.stack);
});
