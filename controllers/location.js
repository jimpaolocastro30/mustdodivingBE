const location = require('../models/location');
const subLocation = require('../models/subLocation');
var moment = require("moment");
var _ = require("lodash");

exports.addLocation = (req, res) => {

  var transactionPrefix = "location";
  var locationId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { locationName } = req.body;
  let local = new location({locationId, locationName, DateCreated});


  local.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("location added! " + locationName); // dont do this res.json({ tag: data });
  });
};

exports.getAllLocation = (req, res) => {
   
    location.find({}).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({ "identifier": "GetAll-location", tag});
    });

};

exports.getOneLocation = (req, res) => {
const locationId = req.query.locationId;
location.findOne({ locationId : locationId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'location not found'
        });
        
    }
    res.json({ "identifier": "Get One location", tag});
});
};

exports.updateOneLocation = (req, res) => {
const locationId = req.query.locationId;
var myquery = { locationId: locationId }
var newV = req.body;
location.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Animals'
        });
    }
    res.json("Message: Successfully updated Location " + locationId);
});
};


exports.addSubLocation = (req, res) => {

  var transactionPrefix = "subLocation";
  var subLocationId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { subLocationName, locationId } = req.body;
  let sublocal = new subLocation({subLocationId, subLocationName, locationId, DateCreated});


  sublocal.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("sub local added! " + subLocations); // dont do this res.json({ tag: data });
  });
};



exports.getAllSubLocalByMainId = (req, res) => {
  var locationId = String(req.query.locationId);
  subLocation.find(
    { 
        locationId:locationId
    }
  ).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({ "identifier": "GetAll-Sub-Location", tag});
    });

};

exports.getOneSubLocal = (req, res) => {
var subLocationId = req.query.subLocationId;
subLocation.findOne({ subLocationId : subLocationId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One Sub local", tag});
});
};

exports.updateOneSubLocal = (req, res) => {
var subLocationId = req.query.subLocationId;
var myquery = { subLocationId : subLocationId }
var newV = req.body;

subLocation.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Animals'
        });
    }
    res.json("Message: Successfully updated Sub location " + subLocationId);
});
};