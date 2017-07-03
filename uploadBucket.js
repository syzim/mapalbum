var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var path = require('path');
var fs = require('fs');
var basePath = "C:\\Users\\Kieran\\Projects\\USA\\dist";

var b = "usastatic";
var bucketParams = {
   Bucket:b 
};                    
                                   
s3 = new AWS.S3({apiVersion: '2006-03-01'});

s3.createBucket(bucketParams, function(err, data) {
   if (err) {
      console.log("Bucket Already created");
   } else {
      console.log("Success", data.Location);
   }
});


fs.readdir(basePath,function(err,items){

items.forEach(function(item){var fileStream = fs.createReadStream(basePath + "\\" +  item);
var fileStream = fs.createReadStream(basePath + "\\" +  item);

var uploadParams = {Bucket: b, Key: item, Body: fileStream};

s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Unable to upload file", err);
  } if (data) {
    console.log("Upload success", data.Location);
  }
})

})
});

// s3.getBucketWebsite(bucketParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else if (data) {
//     console.log("Site Already has config", data);
//   }
// });

// var staticWeb = {
//   Bucket: b,
//   WebsiteConfiguration: {
//     // ErrorDocument: {
//     //   Key: ''
//     // },
//     IndexDocument: {
//       Suffix: 'index.html'
//     },
//   }
// };
// s3.putBucketWebsite(staticWeb, function(err, data) {
//   if (err) {
   
//     console.log("unable to serve as static site", err);
//   } else {
//     console.log("Applied website config to bucket", data);
//   }
// });



