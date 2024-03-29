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
    //   console.log("check" + err)
    //   if (err) {
    //       return res.status(400).json({
    //           error: err.errmsg
    //       });
    //   }

    //   res.json("location added! " + locationName); // dont do this res.json({ tag: data });
    location.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    });
});
};

exports.getAllLocation = (req, res) => {
   
    location.find({}).sort({ "_id": -1 }).exec((err, tag) => {
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
subLocation.find({ locationId : locationId }).exec((err, tag) => {
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

if (_.isEmpty(locationId)) {
    return res.status(400).json({
        error: 'locationId cannot be empty'
    });
}

location.updateOne(myquery, newV).exec((err, tag) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: 'cant update Animals'
    //     });
    // }
    // res.json("Message: Successfully updated Location " + locationId);

    location.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    });

});
};

exports.deleteOneLocation = (req, res) => {
    var locationId = req.query.locationId;
    
    
    if (_.isEmpty(locationId)) {
        return res.status(400).json({
            error: 'locationId cannot be empty'
        });
    }
    
    location.deleteOne({ locationId: locationId }).exec((err, tag) => {
        // if (err) {
        //     return res.status(400).json({
        //         error: 'product not found'
        //     });
            
        // }
        // res.json({ "identifier": "Delete One location "});
        location.find({}).sort({ "_id": -1 }).exec((err, tag) => {
            if (_.isEmpty(tag)) {
                return res.status(400).json({
                    error: 'lookup not found'
                });
            }
            res.json({tag});
        });
    });
    };

exports.addSubLocation = (req, res) => {

  var transactionPrefix = "subLocation";
  var subLocationId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { subLocationName, locationId } = req.body;
  let sublocal = new subLocation({subLocationId, subLocationName, locationId, DateCreated});


  sublocal.save((err, data) => {
//       if (err) {
//           return res.status(400).json({
//               error: err.errmsg
//           });
//       }

//       res.json("sub local added! " + subLocationName); // dont do this res.json({ tag: data });
//   });

subLocation.find(
    { 
        locationId:locationId
    }
  ).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    });
});
};



exports.getAllSubLocalByMainId = (req, res) => {
  var locationId = String(req.query.locationId);
  subLocation.find(
    { 
        locationId:locationId
    }
  ).sort({ "_id": -1 }).exec((err, tag) => {
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
var locationId = req.query.locationId;
var myquery = { subLocationId : subLocationId }
var newV = req.body;

if (_.isEmpty(locationId)) {
    return res.status(400).json({
        error: 'locationId cannot be empty'
    });
}

if (_.isEmpty(subLocationId)) {
    return res.status(400).json({
        error: 'subLocationId cannot be empty'
    });
}

subLocation.updateOne(myquery, newV).exec((err, tag) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: 'cant update Animals'
    //     });
    // }
    // res.json("Message: Successfully updated Sub location " + subLocationId);
    subLocation.find(
        { 
            locationId:locationId
        }
      ).sort({ "_id": -1 }).exec((err, tag) => {
            if (_.isEmpty(tag)) {
                return res.status(400).json({
                    error: 'lookup not found'
                });
            }
            res.json({tag});
        });
});
};

exports.deleteOneSubLocation = (req, res) => {
    var subLocationId = req.query.subLocationId;
    var locationId = req.query.locationId;


    if (_.isEmpty(locationId)) {
        return res.status(400).json({
            error: 'locationId cannot be empty'
        });
    }
    
    if (_.isEmpty(subLocationId)) {
        return res.status(400).json({
            error: 'subLocationId cannot be empty'
        });
    }

    subLocation.deleteOne({ subLocationId : subLocationId }).exec((err, tag) => {
        // if (err) {
        //     return res.status(400).json({
        //         error: 'product not found'
        //     });
            
        // }
        // res.json({ "identifier": "Delete One Sub location"});
        subLocation.find(
            { 
                locationId:locationId
            }
          ).sort({ "_id": -1 }).exec((err, tag) => {
                if (_.isEmpty(tag)) {
                    return res.status(400).json({
                        error: 'lookup not found'
                    });
                }
                res.json({tag});
            });
    });
    };



    exports.getAllLocationMainSub = async(req, res) => {
        try {
            let test = await subLocation.find();
            // console.log("pasok 11", {test})
            const query = location.aggregate([
                {
                    $lookup: {
                        from: "sublocations",//!!!!!!! ALWAYS CHECK THE COLLECTION NAME hahaha
                        foreignField: "locationId",
                        localField: "locationId",
                        as: "sublocations"
                    }
                },
                {
                    $project: { // pwede mo alisin to kung gusto mo ilabas lahat ng fields from both collections.
                        "_id": 1, //  redundant kasi kaya ko to ginawa
                        "locationId": 1,
                        "locationName": 1,
                        "sublocations": {
                            _id: 1, subLocationId: 1, subLocationName: 1
                        }
                    }
                }
            ]);
            let result = await query.exec();
            console.log("sadsada " + query)
            res.json({"identifier": "Get One Location", result})
        }
        catch(err) {
            console.log("pasok err", err)
            res.json(err);
        }
    };
