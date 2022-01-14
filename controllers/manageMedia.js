const mmedia = require('../models/managePhotoVideo');
var moment = require("moment");
var _ = require("lodash");

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