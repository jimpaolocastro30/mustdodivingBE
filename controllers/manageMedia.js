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
  var photosId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { photosVideo, animals, location, yearType, Trips, description} = req.body;
  let mmedias = new mmedia({ photosId, photosVideo, animals, location, yearType, Trips,description, DateCreated});


  mmedias.save((err, data) => {
      // console.log("check" + err)
      // if (err) {
      //     return res.status(400).json({
      //         error: err.errmsg
      //     });
      // }

      // res.json("Manage Media added! " + photosId); // dont do this res.json({ tag: data });
      mmedia.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    });
    });
};

exports.getAllManageMedia = (req, res) => {
   
  // const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  // const page = req.query.page ? parseInt(req.query.page) : 1;

  // const animals = req.query.animals;
  // const location = req.query.location;
  // if (animals) {
  //   mmedia.count({}).exec((err, total) => {
  //     mmedia.find({ $or: [{ animals: { $regex: animals, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
  //             if (err) {
  //                 return res.status(400).json({
  //                     error: 'detachments not found'
  //                 });
  //             }

  //             res.json({
  //                 "identifier": "get all manage media", tag,
  //                 pagination, page, total
  //             });

  //         });
  //     });
  // } else if (location) {
  //   mmedia.count({}).exec((err, total) => {
  //     mmedia.find({
  //             $or: [
  //                 { location: { $regex: location, $options: 'i' } }
  //             ]
  //         }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
  //             if (err) {
  //                 return res.status(400).json({
  //                     error: 'employee not found'
  //                 });
  //             }
  //             res.json({
  //                 "identifier": "get all manage media", tag,
  //                 pagination, page, total
  //             });
  //         });
  //     });

  // } else {

  //   mmedia.count({}).exec((err, total) => {

  //     mmedia.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
  //             if (err) {
  //                 return res.status(400).json({
  //                     error: 'detachments not found'
  //                 });
  //             }
  //             res.json({
  //               "identifier": "get all manage media", tag,
  //               pagination, page, total
  //           });
  //       });
  //     });
  // }
     
  mmedia.find({}).sort({ "_id": -1 }).exec((err, tag) => {
    if (_.isEmpty(tag)) {
        return res.status(400).json({
            error: 'lookup not found'
        });
    }
    res.json({ "identifier": "GetAll-location", tag});
});

};

exports.getOneManageMedia = (req, res) => {
const photosId = req.query.photosId;
const slug = req.params.slug;
mmedia.findOne({ _id: slug }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One all manage media", tag});
});
};

exports.updateOneManageMedia = (req, res) => {
  const slug = req.params.slug;
var myquery = { _id: slug }
var newV = req.body;

mmedia.updateOne(myquery, newV).exec((err, tag) => {
  mmedia.find({}).sort({ "_id": -1 }).exec((err, tag) => {
    if (_.isEmpty(tag)) {
        return res.status(400).json({
            error: 'lookup not found'
        });
    }
    res.json({tag});
});
});
};


exports.deleteOneManageMedia = (req, res) => {
      const slug = req.params.slug;
    mmedia.deleteOne({ _id: slug }).exec((err, tag) => {
        // if (err) {
        //     return res.status(400).json({
        //         error: 'product not found'
        //     });
            
        // }
        // res.json({ "identifier": "Delete One Manage Media :" });
        mmedia.find({}).sort({ "_id": -1 }).exec((err, tag) => {
          if (_.isEmpty(tag)) {
              return res.status(400).json({
                  error: 'lookup not found'
              });
          }
          res.json({tag});
      });
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
      var themes = req.body.themes;
      console.log("8===D" + themes)
      var imageCaption = 'dasdasdsadas dasdasdasd';
      var loadedImage;

      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      await logoM.create({ logoId: logoId, logoInputs: fileName, themes: themes, DateCreated: DateCreated});
  
      res.status(200).json({ data: fileName, theme: themes });
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
              var outputS = "yes"
              var watermarkLocation = req.body.watermarkLocation
              if (err)
                return res.status(400).json({ success: false, message: err.message });
          
              await watermarkM.create({ watermarkId: watermarkId, watermarkLocation: watermarkLocation, watermark: fileName, isWatermarkPhoto: outputS, DateCreated: DateCreated});
          
              res.status(200).json({ data: fileName });
            });
        }
    
        exports.addWaterMarkLetter = (req, res) => {
        var transactionPrefix = "watermarkDive";
        var watermarkId = transactionPrefix + moment().format("x");
        let DateCreated = new Date();
        var outputS = "no"
        const { letterWatermark, watermarkLocation } = req.body;
        let postwaterMark = new watermarkM({watermarkId, watermarkLocation, letterWatermark, DateCreated, isWatermarkPhoto: outputS});


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