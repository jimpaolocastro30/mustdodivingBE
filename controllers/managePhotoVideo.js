// const mPv = require('../models/managePhotoVideo');
var moment = require("moment");
 var _ = require("lodash");
// const fs = require('fs')
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)

// const { uploadFile, getFileStream } = require('./s3')

// exports.addPhotosVideo = (req, res) => {

//   let DateCreated = new Date();
//   const file = req.file
//   console.log(file)
// //   const { animals, location, yearType,Trips } = req.text;
// const animals = req.body.animals;
// const location = req.body.location;
// const yearType = req.body.yearType;
// const Trips = req.body.Trips;


//   const result = uploadFile(file)
//  unlinkFile(file.path)
//   console.log(result)
//   res.send({imagePath: `/images/${result.Key}`})
//   const photosVideo = `/images/${result.Key}`

//   let mpv = new mPv({photosVideo, animals, location, yearType,Trips, DateCreated});


//   mpv.save((err, data) => {
//       console.log("check" + err)
//       if (err) {
//           return res.status(400).json({
//               error: err.errmsg
//           });
//       }

//       res.json("image/video added! " + photosVideo); // dont do this res.json({ tag: data });
//   });
// };



const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const User = require("../models/managePhotoVideo");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
  });
  
  const upload = (bucketName) =>
    multer({
      storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, `image-${Date.now()}.jpeg`);
        },
      }),
    });
  
  exports.addPhotosVideo = (req, res, next) => {
    var isVideo = req.query.isVideo;
    const { video } = req.body;
    //let Datesd = new Date();


   // let DateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
   let DateCreated = moment().format('l');
   DateCreated = new Date(
    `${DateCreated.split('/')[2]}-${DateCreated.split('/')[0]}-${DateCreated.split('/')[1]}`,
 );

    console.log("dasdada " + DateCreated)
    if(isVideo == 1){

      let videos = new User({ photosVideo: video, isVideo: 1, DateCreated: DateCreated});

      videos.save((err, data) => {
        console.log("check" + err)
        if (err) {
            return res.status(400).json({
                error: err.errmsg
            });
        }
  
        res.json("video added! " + video); // dont do this res.json({ tag: data });
    });

    }else {
      const uploadSingle = upload("mdodive").single(
        "croppedImage"
      );
    
      uploadSingle(req, res, async (err) => {
        if (err)
          return res.status(400).json({ success: false, message: err.message });
    
        await User.create({ photosVideo: req.file.location , isVideo: 0, DateCreated: DateCreated});
    
        res.status(200).json({ data: req.file.location });
      });
  
    }

      };

  
exports.getArchived = (req, res) => {

  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 20;
    console.log("dasdadsa " + pagination)
    User.find({}).sort({ "_id":-1 }).limit(pagination).exec((err, tag) => {
          if (_.isEmpty(tag)) {
              return res.status(400).json({
                  error: 'lookup not found'
              });
          }
          res.json({ "identifier": "Get archives", tag});
      });
  
  };

  exports.deletePhotoVid = (req, res) => {
    var vidPicId = req.query.vidPicId;
    console.log("dasdas " + vidPicId)
    User.deleteOne({ _id: vidPicId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One Photo Video"});
    });
    };