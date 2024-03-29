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
global.__basedir = __dirname; 


const aws = require("aws-sdk");
const multer = require("multer");
const Jimp = require("jimp");
const multerS3 = require("multer-s3");
const User = require("../models/managePhotoVideo");
const imageFilter = require("../helpers/")
const fs = require('fs')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});


exports.addPhotosVideo = (req, res) => {
//   const s3 = new aws.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_KEY,
//       region: process.env.AWS_BUCKET_REGION,
//     });  

let DateCreated = new Date();
var isVideo = req.query.isVideo;
const { video } = req.body;

//   const upload = (bucketName) =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: bucketName,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//     }),
//   });

//   const uploadSingle = upload("mdodive").single(
//     "croppedImage"
//   );
  var transactionPrefix = "manageMedia";
  var photoId = transactionPrefix + moment().format("x");

  if(isVideo == 1){

    let videos = new User({ photoId: photoId, photosVideo: video, isVideo: 1, DateCreated: DateCreated});

    videos.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("video added! " + video); // dont do this res.json({ tag: data });
  });
  } else {

    // uploadSingle(req, res, async (err) => {
    //   var fileName = req.file.location;
    //   if (err)
    //     return res.status(400).json({ success: false, message: err.message });
  
    //   await User.create({ photoId: photoId, photosVideo: fileName , isVideo: 0, isWatermark: 0, DateCreated: DateCreated});
  
    //   res.status(200).json({ data: fileName });
    // });
    const fileName = req.file.filename;
    const baseUrls = "https://mustdo-diving.onrender.com/uploads/"
    let photo = new User({ photoId: photoId, photosVideo: baseUrls+fileName , isVideo: 0, isWatermark: 0, DateCreated: DateCreated});


    photo.save((err, data) => {
   
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("video added! " + baseUrls+fileName);
  });
}
};

exports.updatePhotoWatermark = async(req, res, next) => {
  var isVideo = req.query.isVideo;
  var picId = req.query.picId
  const { video, watermark, croppedImage, watermarkLetter, watermarkPosition, isWatermark } = req.body;
  //let Datesd = new Date();

   let DateCreated = moment().format('l');
   DateCreated = new Date(
    `${DateCreated.split('/')[2]}-${DateCreated.split('/')[0]}-${DateCreated.split('/')[1]}`,
 );
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
    }
    else if (isWatermark) {
      try {    
        const image = await Jimp.read(croppedImage)
        let w = image.bitmap.width
        let h = image.bitmap.height
        const position = watermarkPosition || 'top-left'
        let x = position.includes('left') ? (w-w) + 10 : w * .85
        let y = position.includes('top') ? (h-h) + 10 : h - 40

        if(watermarkLetter) {
          const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
          image.print(font, x, y,
            { text: watermarkLetter }, w * .80, h/2
          )
        }
        else {
          const watermarkImage = await Jimp.read(watermark)
          let squareSize = 60
          watermarkImage.resize(squareSize, squareSize);
          watermarkImage.grayscale()
          x = position.includes('left') ? (w-w) + 10 : w - watermarkImage.bitmap.width
          y = position.includes('top') ? (h-h) + 10 : y - watermarkImage.bitmap.height
          image.composite(watermarkImage, x, y, {
              mode: Jimp.BLEND_MULTIPLY,
              opacitySource: 0.5,
              opacityDest: 0.9
            }
          )
        }

        const uploadpath = `./uploads/image-${Date.now()}.jpeg`
        image.resize(800, Jimp.AUTO).quality(100).write(uploadpath, () => {
          const stream = fs.createReadStream(uploadpath);
          const params = {
            Bucket: 'mdodive',
            Key: `image-${Date.now()}.jpeg`,
            ContentType: 'image/jpg',
            Body: stream,
            ContentEncoding: 'base64',
            Metadata: {
              'Content-Type': 'image/jpeg'
            }
          }

          s3.upload(params, async (err, data) => {
              if(err) {
                console.log({err})
                return res.status(500).json({ success: false, message: err.message });
              }
              var myquery = { photoId: picId }
              var newValues = { photosVideo: data.Location, isVideo: 0, DateCreated: DateCreated }
              console.log("dasda " + myquery)
              console.log("dasda 2 " + newValues)
              await User.updateOne(myquery, newValues);
              // await User.create({ photosVideo: data.Location , isVideo: 0, isWatermark: 1, DateCreated: DateCreated});
              res.status(200).json({ data: data.Location });
            });
        });
   }
    catch(err) {
      console.log({err})
      return res.status(500).json({ success: false, message: err.message });
    }
  } else if (watermark == 1) {

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
  

    const uploadSingle = upload("mdodive").single(
      "croppedImage"
    );
  
    uploadSingle(req, res, async (err) => {
      var fileName = req.file.location;
      var imageCaption = 'dasdasdsadas dasdasdasd';
      var loadedImage;

      Jimp.read(fileName)
          .then(function (image) {
              loadedImage = image;
              return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
          })
          .catch(function (err) {
              console.error(err);
          });
          
          console.log("dasdsadsa " + fileName)
      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      await User.create({ photosVideo: fileName , isVideo: 0, isWatermark: 1, DateCreated: DateCreated});
  
      res.status(200).json({ data: fileName });
    });
  }
};

  
exports.getArchived = (req, res) => {

  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 20;
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