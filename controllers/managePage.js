const mpage = require('../models/finaleManagePage');
const watermarkM = require('../models/watermarkManagement')
var moment = require("moment");
const aws = require("aws-sdk");
var _ = require("lodash");
const multer = require("multer");
const multerS3 = require("multer-s3");

exports.addManagePage = (req, res) => {

  var transactionPrefix = "managePageid";
  var pageId = transactionPrefix + moment().format("x");
  let dateCreated = new Date();
  let dateUpdated = new Date();
  const { path, published, description, title, socialMedia, body, logo, menu, subscription,  topbar} = req.body;
  let mmedias = new mpage({ pageId,path, published, description, title, socialMedia, body, logo, menu, subscription,  topbar, dateCreated, dateUpdated});


  mmedias.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("Manage Media added! " + pageId); // dont do this res.json({ tag: data });
  });
};

exports.getAllManagePage = (req, res) => {
   
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const pageId = req.query.pageId;
  const pageUrl = req.query.pageUrl;
  const pageTitle = req.query.pageTitle;
  const pageDescription = req.query.pageDescription;
  const pageBody = req.query.pageBody;

  if (pageId) {
    mpage.count({}).exec((err, total) => {
      mpage.find({ $or: [{ pageId: { $regex: pageId, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'page not found'
                  });
              }

              res.json({
                  "identifier": "get all manage page", tag,
                  pagination, page, total
              });

          });
      });
  } else if (pageUrl) {
    mpage.count({}).exec((err, total) => {
      mpage.find({
              $or: [
                  { pageUrl: { $regex: pageUrl, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'page not found'
                  });
              }
              res.json({
                  "identifier": "get all manage page", tag,
                  pagination, page, total
              });
          });
      });

  } else if (pageTitle) {
    mpage.count({}).exec((err, total) => {
      mpage.find({
              $or: [
                  { pageTitle: { $regex: pageTitle, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'page not found'
                  });
              }
              res.json({
                  "identifier": "get all manage page", tag,
                  pagination, page, total
              });
          });
      });

  }  else if (pageDescription) {
    mpage.count({}).exec((err, total) => {
      mpage.find({
              $or: [
                  { pageDescription: { $regex: pageDescription, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'page not found'
                  });
              }
              res.json({
                  "identifier": "get all manage page", tag,
                  pagination, page, total
              });
          });
      });

  }  else if (pageBody) {
    mpage.count({}).exec((err, total) => {
      mpage.find({
              $or: [
                  { pageBody: { $regex: pageBody, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'page not found'
                  });
              }
              res.json({
                  "identifier": "get all manage page", tag,
                  pagination, page, total
              });
          });
      });

  } 
   else {

    mpage.count({}).exec((err, total) => {

      mpage.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
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

exports.getOneManagePage = (req, res) => {
const pageId = req.query.pageId;

mpage.findOne({ pageId: pageId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One all manage media", tag});
});
};

exports.updateOneManagePage = (req, res) => {
const pageId = req.query.pageId;
var myquery = { pageId: pageId }
var newV = req.body;

mpage.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Trips'
        });
    }
    res.json("Message: Successfully updated Manage Media " + pageId);
});
};


exports.deleteOneManagePage = (req, res) => {
    var pageId = req.query.pageId;
    mpage.deleteOne({ pageId: pageId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One Manage Media :" + pageId});
    });
    };

