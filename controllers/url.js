const trips = require('../models/urlMain');
const subUrl = require('../models/urlSub');
const pages = require('../models/managePage')
const mphotoVid = require('../models/managePhotoVideo')
var moment = require("moment");
var _ = require("lodash");

exports.addMainUrl = (req, res) => {

  var transactionPrefix = "url";
  var urlId = transactionPrefix + moment().format("x");

  const { urlMain} = req.body;
  let tripss = new trips({urlId, urlMain});


  tripss.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("url added! " + urlId); // dont do this res.json({ tag: data });
  });
};

exports.getAllMainUrl = (req, res) => {
   
//   trips.find({}).exec((err, tag) => {
//         if (_.isEmpty(tag)) {
//             return res.status(400).json({
//                 error: 'lookup not found'
//             });
//         }
//         res.json({ "identifier": "GetAll-Trips", tag});
//     });
const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const urlMain = req.query.urlMain;
  if (urlMain) {
    pages.count({}).exec((err, total) => {
        pages.find({ $or: [{ urlMain: { $regex: urlMain, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).distinct("urlMain").exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'detachments not found'
                  });
              }

              res.json({
                  "identifier": "get all main URL", tag,
                  pagination, page, total
              });

          });
      });
  } else {

    pages.count({}).exec((err, total) => {

        pages.find({}).skip((page - 1) * pagination).limit(pagination).select('pageTitle urlMain isActive dateCreated dateUpdated').exec((err, tag) => {
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

exports.getOneMainUrl = (req, res) => {
const urlMain = req.query.urlMain;

pages.find({ urlMain: urlMain }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One urlId", tag});
});
};

exports.updateOneMainUrl = (req, res) => {
 const urlId = req.query.urlId;
var myquery = { urlId: urlId }
var newV = req.body;

trips.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Trips'
        });
    }
    res.json("Message: Successfully updated urlId " + urlId);
});
};


exports.deleteOneMainUrl = (req, res) => {
    var urlId = req.query.urlId;
    trips.deleteOne({ urlId: urlId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One MainUrl"});
    });
    };

    exports.addSubUrl = (req, res) => {

        var transactionPrefix = "urlSub";
        var urlSubId = transactionPrefix + moment().format("x");
      
        const { urlMainId, urlSub } = req.body;
        let tripss = new subUrl({urlSubId, urlMainId, urlSub});
      
      
        tripss.save((err, data) => {
            console.log("check" + err)
            if (err) {
                return res.status(400).json({
                    error: err.errmsg
                });
            }
      
            res.json("url added! " + urlSubId); // dont do this res.json({ tag: data });
        });
      };
      
      exports.getSubUrl = (req, res) => {
         
      //   trips.find({}).exec((err, tag) => {
      //         if (_.isEmpty(tag)) {
      //             return res.status(400).json({
      //                 error: 'lookup not found'
      //             });
      //         }
      //         res.json({ "identifier": "GetAll-Trips", tag});
      //     });
      const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
      
        const urlMainId = req.query.urlMainId;
        if (urlMainId) {
            subUrl.count({}).exec((err, total) => {
            subUrl.find({ $or: [{ urlMainId: { $regex: urlMainId, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'detachments not found'
                        });
                    }
      
                    res.json({
                        "identifier": "get all main URL", tag,
                        pagination, page, total
                    });
      
                });
            });
        } else {
      
            subUrl.count({}).exec((err, total) => {
      
                subUrl.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
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
      
      exports.getOneSubUrl = (req, res) => {
      const urlSubId = req.query.urlSubId;
      
      subUrl.findOne({ urlSubId: urlSubId }).exec((err, tag) => {
          if (err) {
              return res.status(400).json({
                  error: 'product not found'
              });
              
          }
          res.json({ "identifier": "Get One urlId", tag});
      });
      };
      
      exports.updateOneSubUrl = (req, res) => {
       const urlSubId = req.query.urlSubId;
      var myquery = { urlSubId: urlSubId }
      var newV = req.body;
      
      subUrl.updateOne(myquery, newV).exec((err, tag) => {
          if (err) {
              return res.status(400).json({
                  error: 'cant update Trips'
              });
          }
          res.json("Message: Successfully updated urlMainId " + urlSubId);
      });
      };
      
      
      exports.deleteOneSubUrl = (req, res) => {
          var urlSubId = req.query.urlSubId;
          subUrl.deleteOne({ urlSubId: urlSubId }).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'product not found'
                  });
                  
              }
              res.json({ "identifier": "Delete One" + urlSubId});
          });
          };

          

          exports.getOnePublicPhotoVideo = (req, res) => {
            const animals = req.query.animals;
            const subAnimal = req.query.subAnimal;
            let encoded = encodeURIComponent(subAnimal);
            let decodedSub = decodeURIComponent(encoded);
            console.log("dasdsada " + decodedSub)
            mphotoVid.find({ $and: [{animals: animals} , {subAnimal: decodedSub}] }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                    
                }
                res.json({ "identifier": "Get One urlId", tag});
            });
            };          

            exports.getOnePublicPhotoVideo = (req, res) => {
                const animals = req.query.animals;
                const subAnimal = req.query.subAnimal;
                let encoded = encodeURIComponent(subAnimal);
                let decodedSub = decodeURIComponent(encoded);
                console.log("dasdsada " + decodedSub)
                mphotoVid.find({ $and: [{animals: animals} , {subAnimal: decodedSub}] }).exec((err, tag) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'product not found'
                        });
                        
                    }
                    res.json({ "identifier": "Get One urlId", tag});
                });
                };          


                exports.getAllNonePublicPhotoVideo = (req, res) => {
                    const animals = req.query.animals;
                    const subAnimal = req.query.subAnimal;
                    let encoded = encodeURIComponent(subAnimal);
                    let decodedSub = decodeURIComponent(encoded);
                    console.log("dasdsada " + decodedSub)
                    mphotoVid.find({ $and: [{animals: {$ne: animals}} , {subAnimal: {$ne: decodedSub}},{animals: {$ne: null}} , {subAnimal: {$ne: null}}] }).exec((err, tag) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'product not found'
                            });
                            
                        }
                        res.json({ "identifier": "Get One urlId", tag});
                    });
                    };          


                    
                exports.getAllNonePublicPhotoVideo2 = (req, res) => {
                    const animals = req.query.animals;
                    const subAnimal = req.query.subAnimal;
                    let encoded = encodeURIComponent(subAnimal);
                    let decodedSub = decodeURIComponent(encoded);
                    console.log("dasdsada " + decodedSub)
                    mphotoVid.find({ $and: [{animals: {$ne: animals}} , {subAnimal: {$ne: decodedSub}}] }).exec((err, tag) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'product not found'
                            });
                            
                        }
                        res.json({ "identifier": "Get One urlId", tag});
                    });
                    };          