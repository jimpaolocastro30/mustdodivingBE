const trips = require('../models/managePhotoVideo');
var moment = require("moment");
var _ = require("lodash");
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream



exports.addMainTrips = (req, res) => {

  var transactionPrefix = "trips";
  var tripId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { tripName, month, year } = req.body;
  let tripss = new trips({tripId, tripName, month, year, DateCreated});


  tripss.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("animal added! " + tripName); // dont do this res.json({ tag: data });
  });
};

