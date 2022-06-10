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
    //   console.log("check" + err)
    //   if (err) {
    //       return res.status(400).json({
    //           error: err.errmsg
    //       });
    //   }

    //   res.json("animal added! " + animalsMain); // dont do this res.json({ tag: data });
    animal.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    });  
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

console.log("dasdadsa" + animalId)
subAnimal.find({ animalsId: animalId }).exec((err, tag) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: 'product not found'
    //     });
        
    // }
    // res.json({ "identifier": "Get One Animals", tag});

    animal.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    }); 
});
};

exports.updateOneAnimals = (req, res) => {
  var animalId = req.query.animalId;
var myquery = { animalsId: animalId }
var newV = req.body;

if (_.isEmpty(animalId)) {
    return res.status(400).json({
        error: 'animalId cannot be empty'
    });
}

animal.updateOne(myquery, newV).exec((err, tag) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: 'cant update Animals'
    //     });
    // }
    // res.json("Message: Successfully updated Animals " + animalId);

    animal.find({}).sort({ "_id": -1 }).exec((err, tag) => {
        if (_.isEmpty(tag)) {
            return res.status(400).json({
                error: 'lookup not found'
            });
        }
        res.json({tag});
    }); 
});
};

exports.deleteOneAnimals = (req, res) => {
    var animalsId = req.query.animalsId;

    if (_.isEmpty(animalsId)) {
        return res.status(400).json({
            error: 'animalsId cannot be empty'
        });
    }
    

    animal.deleteOne({ animalsId: animalsId }).exec((err, tag) => {
        // if (err) {
        //     return res.status(400).json({
        //         error: 'product not found'
        //     });
            
        // }
        // res.json({ "identifier": "deleted One Animals"});
        animal.find({}).sort({ "_id": -1 }).exec((err, tag) => {
            if (_.isEmpty(tag)) {
                return res.status(400).json({
                    error: 'lookup not found'
                });
            }
            res.json({tag});
        });     
    });
    };

exports.addSubAnimal = (req, res) => {

  var transactionPrefix = "subAnimals";
  var subAnimalsId = transactionPrefix + moment().format("x");
  let DateCreated = new Date();

  const { subAnimals, animalsId } = req.body;
  let animalM = new subAnimal({subAnimalsId, subAnimals, animalsId, DateCreated});


  animalM.save((err, data) => {
    //   console.log("check" + err)
    //   if (err) {
    //       return res.status(400).json({
    //           error: err.errmsg
    //       });
    //   }

    //   res.json("animal added! " + subAnimals); // dont do this res.json({ tag: data });
    subAnimal.find(
        { 
          animalsId:animalsId
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
  var animalId = req.query.animalId;

  if (_.isEmpty(subAnimalsId)) {
    return res.status(400).json({
        error: 'subAnimalsId cannot be empty'
    });
}

if (_.isEmpty(animalId)) {
    return res.status(400).json({
        error: 'animalId cannot be empty'
    });
}

var myquery = { subAnimalsId : subAnimalsId }
var newV = req.body;

subAnimal.updateOne(myquery, newV).exec((err, tag) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: 'cant update Animals'
    //     });
    // }
    // res.json("Message: Successfully updated Animals " + subAnimalsId);
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
            res.json({tag});
        });
});
};


exports.deleteOneSubAnimals = (req, res) => {
    var subAnimalsId = req.query.subAnimalsId;
    var animalId = req.query.animalId;
    
    if (_.isEmpty(subAnimalsId)) {
        return res.status(400).json({
            error: 'subAnimalsId cannot be empty'
        });
    }
    
    if (_.isEmpty(animalId)) {
        return res.status(400).json({
            error: 'animalId cannot be empty'
        });
    }
    subAnimal.deleteOne({ subAnimalsId: subAnimalsId }).exec((err, tag) => {
        // if (err) {
        //     return res.status(400).json({
        //         error: 'product not found'
        //     });
            
        // }
        // res.json({ "identifier": "Delete One Sub Animals"});

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
                res.json({tag});
            });
    });
    };


    exports.getAllAnimalMainSub = async(req, res) => {
        try {
            let test = await subAnimal.find();
            console.log({test})
            const query = animal.aggregate([
                {
                    $lookup: {
                        from: "subanimals",//!!!!!!! ALWAYS CHECK THE COLLECTION NAME hahaha
                        foreignField: "animalsId",
                        localField: "animalsId",
                        as: "subAnimals"
                    }
                },
                {
                    $project: { // pwede mo alisin to kung gusto mo ilabas lahat ng fields from both collections.
                        "_id": 1, //  redundant kasi kaya ko to ginawa
                        "animalsId": 1,
                        "animalsMain" : 1,
                        "subAnimals": {
                            _id: 1, subAnimalsId: 1, subAnimals: 1
                        }
                    }
                }
            ]);
            let result = await query.exec();
            res.json({"identifier": "Get One Animals", result})
        }
        catch(err) {
            console.log("pasok err", err)
            res.json(err);
        }
    };