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
// const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
//   const page = req.query.page ? parseInt(req.query.page) : 1;

//   const tripName = req.query.tripName;
//   if (tripName) {
//     trips.count({}).exec((err, total) => {
//         trips.find({ $or: [{ tripName: { $regex: tripName, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
//               if (err) {
//                   return res.status(400).json({
//                       error: 'detachments not found'
//                   });
//               }

//               res.json({
//                   "identifier": "get all manage media", tag,
//                   pagination, page, total
//               });

//           });
//       });
//   } else {

//     trips.count({}).exec((err, total) => {

//         trips.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
//               if (err) {
//                   return res.status(400).json({
//                       error: 'detachments not found'
//                   });
//               }
//               res.json({
//                 "identifier": "get all manage media", tag,
//                 pagination, page, total
//             });
//         });
//       });
//   }

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


exports.deleteOneTrips = (req, res) => {
    var tripId = req.query.tripId;
    console.log("dasdas " + tripId)
    trips.deleteOne({ tripId: tripId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One Trips"});
    });
    };