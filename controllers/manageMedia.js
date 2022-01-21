const mmedia = require('../models/managePhotoVideo');
const logoM = require('../models/manageMedia')
const watermarkM = require('../models/watermarkManagement')
var moment = require("moment");
const aws = require("aws-sdk");
var _ = require("lodash");
const multer = require("multer");
const multerS3 = require("multer-s3");

exports.addManageMedia = (req, res) => {

  var transactionPrefix = "manageMedia";
  var mmediaId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { photosVideo, animals, location, yearType, Trips} = req.body;
  let mmedias = new mmedia({ mmediaId, photosVideo, animals, location, yearType, Trips, DateCreated});


  mmedias.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("Manage Media added! " + mmediaId); // dont do this res.json({ tag: data });
  });
};

exports.getAllManageMedia = (req, res) => {
   
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const animals = req.query.animals;
  const location = req.query.location;
  if (animals) {
    mmedia.count({}).exec((err, total) => {
      mmedia.find({ $or: [{ animals: { $regex: animals, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'detachments not found'
                  });
              }

              res.json({
                  "identifier": "get all manage media", tag,
                  pagination, page, total
              });

          });
      });
  } else if (location) {
    mmedia.count({}).exec((err, total) => {
      mmedia.find({
              $or: [
                  { location: { $regex: location, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'employee not found'
                  });
              }
              res.json({
                  "identifier": "get all manage media", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    mmedia.count({}).exec((err, total) => {

      mmedia.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'detachments not found'
                  });
              }
              res.json({
                "identifier": "get all manage media", tag,
                pagination, page, total
            });
        });
      });
  }

};

exports.getOneManageMedia = (req, res) => {
const mmediaId = req.query.mmediaId;

mmedia.findOne({ mmediaId: mmediaId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One all manage media", tag});
});
};

exports.updateOneManageMedia = (req, res) => {
 const mmediaId = req.query.mmediaId;
var myquery = { mmediaId: mmediaId }
var newV = req.body;

mmedia.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Trips'
        });
    }
    res.json("Message: Successfully updated Manage Media " + tripId);
});
};


exports.deleteOneManageMedia = (req, res) => {
    var mmediaId = req.query.mmediaId;
    mmedia.deleteOne({ mmediaId: mmediaId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One Manage Media :" + mmediaId});
    });
    };

exports.addLogo = (req, res) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_BUCKET_REGION,
      });  

  var transactionPrefix = "logoDive";
  var logoId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();
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
      "croppedLogo"
    );
  
    uploadSingle(req, res, async (err) => {
      var fileName = req.file.location;
      var imageCaption = 'dasdasdsadas dasdasdasd';
      var loadedImage;

      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      await logoM.create({ logoId: logoId, logoInputs: fileName , DateCreated: DateCreated});
  
      res.status(200).json({ data: fileName });
    });
  }

  exports.getLogo = (req, res) => {
      logoM.findOne({}).sort({ "_id":-1 }).exec((err, tag) => {
            if (_.isEmpty(tag)) {
                return res.status(400).json({
                    error: 'lookup not found'
                });
            }
            res.json({ "identifier": "Get archives", tag});
        });
    
    };
  
    exports.deleteLogo = (req, res) => {
      var logoId = req.query.logoId;
      logoM.deleteOne({ logoId: logoId }).exec((err, tag) => {
          if (err) {
              return res.status(400).json({
                  error: 'product not found'
              });
              
          }
          res.json({ "identifier": "Delete One Photo Video"});
      });
      };



      exports.addWaterMarkPhoto = (req, res) => {
            const s3 = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: process.env.AWS_BUCKET_REGION,
              });  
        
          var transactionPrefix = "watermarkDive";
          var watermarkId = transactionPrefix + moment().format("x");
          let DateCreated = new Date();
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
              "croppedLogo"
            );
          
            uploadSingle(req, res, async (err) => {
              var fileName = req.file.location;
              var watermarkLocation = req.body.watermarkLocation
              if (err)
                return res.status(400).json({ success: false, message: err.message });
          
              await watermarkM.create({ watermarkId: watermarkId, watermarkLocation: watermarkLocation, watermark: fileName, isWatermarkPhoto: 1, DateCreated: DateCreated});
          
              res.status(200).json({ data: fileName });
            });
        }
    
        exports.addWaterMarkLetter = (req, res) => {
        var transactionPrefix = "watermarkDive";
        var watermarkId = transactionPrefix + moment().format("x");
        let DateCreated = new Date();

        const { letterWatermark, watermarkLocation } = req.body;
        let postwaterMark = new watermarkM({watermarkId, watermarkLocation, letterWatermark, DateCreated, isWatermarkPhoto: 0});


        postwaterMark.save((err, data) => {
            console.log("check" + err)
            if (err) {
                return res.status(400).json({
                    error: err.errmsg
                });
            }

            res.json("watermark added! " + watermarkId); // dont do this res.json({ tag: data });
        });
    }

      exports.getWatermark = (req, res) => {
        watermarkM.findOne({}).sort({ "_id":-1 }).exec((err, tag) => {
                if (_.isEmpty(tag)) {
                    return res.status(400).json({
                        error: 'lookup not found'
                    });
                }
                res.json({ "identifier": "Get watermark", tag});
            });
        
        };
      
        exports.deleteWatermark = (req, res) => {
          var watermarkId = req.query.watermarkId;
          watermarkM.deleteOne({ watermarkId: watermarkId }).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'product not found'
                  });
                  
              }
              res.json({ "identifier": "Delete One watermark"});
          });
          };