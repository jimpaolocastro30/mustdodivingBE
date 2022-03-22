const animal = require('../models/animals');
const subAnimal = require('../models/subAnimals');
var moment = require("moment");
var _ = require("lodash");

exports.addMainAnimal = (req, res) => {

  var transactionPrefix = "mainAnimals";
  var animalsId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { animalsMain } = req.body;
  let animalM = new animal({animalsId, animalsMain, DateCreated});


  animalM.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("animal added! " + animalsMain); // dont do this res.json({ tag: data });
  });
};

exports.getAllAnimals = (req, res) => {
   
  animal.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({ "identifier": "GetAll-Animals", tag});
    });

};

exports.getOneAnimals = (req, res) => {
var animalId = req.query.animalId;

subAnimal.find({ animalsId: animalId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One Animals", tag});
});
};

exports.updateOneAnimals = (req, res) => {
  var animalId = req.query.animalId;
var myquery = { animalsId: animalId }
var newV = req.body;

animal.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Animals'
        });
    }
    res.json("Message: Successfully updated Animals " + animalId);
});
};

exports.deleteOneAnimals = (req, res) => {
    var animalsId = req.query.animalsId;
    console.log("dasdas " + animalsId)
    animal.deleteOne({ animalsId: animalsId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "deleted One Animals"});
    });
    };

exports.addSubAnimal = (req, res) => {

  var transactionPrefix = "subAnimals";
  var subAnimalsId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { subAnimals, animalsId } = req.body;
  let animalM = new subAnimal({subAnimalsId, subAnimals, animalsId, DateCreated});


  animalM.save((err, data) => {
      console.log("check" + err)
      if (err) {
          return res.status(400).json({
              error: err.errmsg
          });
      }

      res.json("animal added! " + subAnimals); // dont do this res.json({ tag: data });
  });
};



exports.getAllSubAnimalsByMainId = (req, res) => {
  var animalId = String(req.query.animalId);
  
  subAnimal.find(
    { 
      animalsId:animalId
    }
  ).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({ "identifier": "GetAll-Sub-Animals", tag});
    });

};

exports.getOneSubAnimals = (req, res) => {
var subAnimalsId = req.query.subAnimalsId;
console.log("dasdas " + subAnimalsId)
subAnimal.findOne({ subAnimalsId : subAnimalsId }).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'product not found'
        });
        
    }
    res.json({ "identifier": "Get One Animals", tag});
});
};

exports.updateOneSubAnimals = (req, res) => {
  var subAnimalsId = req.query.subAnimalsId;
  console.log("dasdas " + subAnimalsId)
var myquery = { subAnimalsId : subAnimalsId }
var newV = req.body;

subAnimal.updateOne(myquery, newV).exec((err, tag) => {
    if (err) {
        return res.status(400).json({
            error: 'cant update Animals'
        });
    }
    res.json("Message: Successfully updated Animals " + subAnimalsId);
});
};


exports.deleteOneSubAnimals = (req, res) => {
    var subAnimalsId = req.query.subAnimalsId;
    console.log("dasdas " + subAnimalsId)
    subAnimal.deleteOne({ subAnimalsId: subAnimalsId }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'product not found'
            });
            
        }
        res.json({ "identifier": "Delete One Sub Animals"});
    });
    };


    exports.getAllAnimalMainSub = async(req, res) => {
        try {
            const query = animal.aggregate([
                {
                    $lookup: {
                        from: "subAnimals",
                        localField: "animalsId",
                        foreignField: "animalsId",
                        as: "animals"
                    }
                }
            ]);
            let result = await query.exec();
            console.log("pasok ", result)
            res.json({"identifier": "Get One Animals", result})
        }
        catch(err) {
            console.log("pasok err", err)
            res.json(err);
        }
    };