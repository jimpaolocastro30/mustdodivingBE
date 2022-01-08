const trips = require('../models/trips');
var moment = require("moment");
var _ = require("lodash");

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

exports.getAllTrips = (req, res) => {
   
  trips.find({}).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({ "identifier": "GetAll-Trips", tag});
    });

};

exports.getOneTrips = (req, res) => {
const tripId = req.query.tripId;

trips.findOne({ tripId: tripId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One Trips", tag});
});
};

exports.updateOneTrips = (req, res) => {
 const tripId = req.query.tripId;
var myquery = { tripId: tripId }
var newV = req.body;

trips.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Trips'
        });
    }
    res.json("Message: Successfully updated Trips " + tripId);
});
};