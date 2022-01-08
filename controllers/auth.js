const User = require('../models/user');
//const notificationDb = require('../models/animals');
//const savePlace = require('../models/saveplace');
// const reminder = require('../models/reminder');
// const employee = require('../models/employee');
// const cutoff = require('../models/cutoff');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
var moment = require("moment");

exports.signup = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                err: 'Email is taken'
            });
        }

        var active = 0;
        const { firstName, lastName, mobileNumber, email, password, role, sex  } = req.body;
        let profile = `${process.env.CLIENT_URL}/profile/${mobileNumber}`;
        let DateCreated = new Date();
        let newUser = new User({ firstName, lastName, mobileNumber, email, password, profile, active, DateCreated,role,sex});
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // res.json({
            //     user: success
            // });

            // res.json({
            //     message: 'Signup success! Please signin.'
            // });

                        // generate a token and send to client
                        User.findOne({ email }).exec((err, user) => {
                            if (err || !user) {
                                return res.status(400).json({
                                    error: 'User with that mobile does not exist. Please signup.'
                                });
                            }
                            // authenticate
                            if (!user.authenticate(password)) {
                                return res.status(400).json({
                                    error: 'mobile number and password do not match.'
                                });
                            }
                            // generate a token and send to client
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    
                            res.cookie('token', token, { expiresIn: '1w' });
                            return res.json({
                                "identifier: user created " : firstName +" " + lastName , mobileNumber, email
                            });
                        });
        });
    });
};

exports.signin = (req, res) => {
    const { email, MobileNumber, password } = req.body;
    // check if user exist
    if(email){
        User.findOne({ email }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User with that mobile does not exist. Please signup.'
                });
            }
            // authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'mobile number and password do not match.'
                });
            }
            // generate a token and send to client
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
            res.cookie('token', token, { expiresIn: '1d' });
            const { _id, username, name, email, role, photo,sex,ReferralCode} = user;
            return res.json({
                token
            });
        });
    }
    
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSigninUser = expressJwt({
    secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

const decode_token = (token) => {
    return jwt.verify (token, process.env.JWT_SECRET)
    
  }

exports.loginToken = (req, res) =>{

  const token = req.headers.authorization.split (' ')[1]
  const data = decode_token (token)

  User.findOne({ _id : data }).exec((err, user) => {
    const { _id, username, Firstname,Lastname,MobileNumber, email, role, photo} = user;
    
    if (err) {  
        return res.status(400).json({
            error: 'inventory not found'
        });
    }
    
    res.json({
        "identifier": username, Firstname,Lastname,MobileNumber, email, role, photo
    });
});

  
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};


exports.accountMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 2) {
            return res.status(400).json({
                error: 'Accounting resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};

exports.payrollMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 3) {
            return res.status(400).json({
                error: 'Payroll resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};

exports.userList = (req,res) => {
    //const operatorId = req.user._id;
    User.find({})
    .exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json(data);

    });
}

exports.getPaginatedSearchUser = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const Name = req.query.Name;
    const Code = req.query.Code;
    console.log(Code)
    if (Name) {
        User.count({}).exec((err, total) => {
            User.find({ $or: [{ username: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }

                res.json({
                    "identifier": "get all User list", tag,
                    pagination, page, total
                });

            });
        });
    } else if (Code) {
        User.count({}).exec((err, total) => {
            User.find({
                $or: [
                    { email: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }
                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });
            });
        });

    } else {

        User.count({}).exec((err, total) => {

            User.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                }
                for (let val of tag) {

                    console.log(val.TypeID)
                    let TypeID = (val.TypeID);
                    User.find({ _id: TypeID }).exec((err, tag) => {
                        for (let val of tag) {
                            let name = val.Name;
                            console.log(name)
                        }
                    });
                }
                res.json({ "identifier": "get all Product list", tag, pagination, page, total });

            });
        });
    }
};

exports.readUser = (req, res) => {
    const token = req.headers.authorization.split (' ')[1]
    const data = decode_token (token)
    console.log(slug)

    User.findOne({ _id: slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.resetPasswordUser = (req, res) => {
    const { userId, newPassword } = req.body;
    if (_.isEmpty(userId)||_.isEmpty(newPassword))  {
        return res.status(400).json({
            err: 'User id and newPassword is needed'
        });
    }
            User.findOne({ _id: userId }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                
                const updatedFields = {
                    password: newPassword,
                    userId: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
    
};


exports.addEmployees = (req, res) => {
    const { IdNumber, Position, FirstName, LastName, MiddleName, SSS, PagIbig, TIN, Phone, Nationality, RELIGION, MaritalStatus, EmergencyContact,basicRate, OTRate, Allowance,nightDifferential, HDMFMpl,CashBond} = req.body;
    let completeId = new employee({ IdNumber, Position, FirstName, LastName, MiddleName, SSS, PagIbig, TIN, Phone, Nationality, RELIGION, MaritalStatus, EmergencyContact,basicRate, OTRate, Allowance,nightDifferential, HDMFMpl,CashBond });


    completeId.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err.errmsg
             
            });
        }

        res.json('Success : Added one employees'); // dont do this res.json({ tag: data });
    });
};

exports.getPaginatedSearchEmployee = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const Name = req.query.Name;
    const Code = req.query.Code;
    console.log(Code)
    if (Name) {
        employee.count({}).exec((err, total) => {
            employee.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'employee not found'
                    });
                }

                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });

            });
        });
    } else if (Code) {
        employee.count({}).exec((err, total) => {
            employee.find({
                $or: [
                    { IdNumber: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'employee not found'
                    });
                }
                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });
            });
        });

    } else {

        employee.count({}).exec((err, total) => {

            employee.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                }
                for (let val of tag) {

                    console.log(val.TypeID)
                    let TypeID = (val.TypeID);
                    employee.find({ _id: TypeID }).exec((err, tag) => {
                        for (let val of tag) {
                            let name = val.Name;
                            console.log(name)
                        }
                    });
                }
                res.json({ "identifier": "get all Product list", tag, pagination, page, total });

            });
        });
    }
};

exports.getEmployee = (req, res) => {
    

    employee.find({}).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'inventory not found'
            });
        }
        res.json({
            "identifier": "get ALL Employee", allUser
        });
});
};

exports.getOneEmployee = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    employee.findOne({IdNumber: slug }).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'inventory not found'
            });
        }
        res.json({
            "identifier": "get One Employee", allUser
        });
});
};


exports.updateEmployee = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
    var newV = req.body;
    employee.updateOne(myquery, newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant update product'
            });
        }
        res.json(tag);
    });
};



exports.getUserProfile = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log(slug)
    User.findOne({ _id: slug }).exec((err, allUser) => {
        if (err) {  
            return res.status(400).json({
                error: 'inventory not found'
            });
        }
        res.json({
            "identifier": "get One user wallet", allUser
        });
});
};

exports.uploadPictureUser = (req, res) => {
    const token = req.headers.authorization.split (' ')[1]
    const data = decode_token (token)
    const image = req.file.destination + req.file.filename
    User.findOne({ _id : data }).exec((err, user) => {
        const { Firstname , Lastname } = user;
    var myquery ={ _id: data } 
    let newV = {photo : image};
    User.updateOne(myquery,newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: err.errmsg
            
            });
         
        }
        console.log(err)
        res.json({status: "Success", message: "Successfully uploaded avatar! " + Firstname + " " + Lastname });
    });
});
};

exports.uploadPictureEmployee = (req, res) => {
   
    const token = req.headers.authorization.split (' ')[1]
    const data = decode_token (token)
  
    const image = req.file.destination + req.file.filename
    var myquery ={ _id: data } 
    let newV = {photo : image};
    employee.updateOne(myquery,newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: err.errmsg
            });
        }
        res.json({status: "Success", message: "Successfully uploaded avatar!",image});
    });
};


exports.readUser = (req, res) => {

    const token = req.headers.authorization.split (' ')[1]
    const data = decode_token (token)

    User.findOne({ _id: data }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.getPaginatedSearchUser = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const Name = req.query.Name;
    const Code = req.query.Code;
    console.log(Code)
    if (Name) {
        User.count({}).exec((err, total) => {
            User.find({ $or: [{ username: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }

                res.json({
                    "identifier": "get all User list", tag,
                    pagination, page, total
                });

            });
        });
    } else if (Code) {
        User.count({}).exec((err, total) => {
            User.find({
                $or: [
                    { email: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }
                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });
            });
        });

    } else {

        User.count({}).exec((err, total) => {

            User.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                }
                for (let val of tag) {

                    console.log(val.TypeID)
                    let TypeID = (val.TypeID);
                    User.find({ _id: TypeID }).exec((err, tag) => {
                        for (let val of tag) {
                            let name = val.Name;
                            console.log(name)
                        }
                    });
                }
                res.json({ "identifier": "get all Product list", tag, pagination, page, total });

            });
        });
    }
};

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

        // email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <p>Please use the following link to reset your password:</p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
        };
        // populating the db > user > resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: errorHandler(err) });
            } else {
            //     sgMail.send(emailData).then(sent => {
            //         return res.json({
            //             message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
            //         });
            //     });
            }
        });
    });
};

exports.updateUser = (req, res) => {
    const token = req.headers.authorization.split (' ')[1]
    const data = decode_token (token)
    var myquery ={ _id: data }
    
 
    var newV = req.body;

    User.updateOne(myquery,newV).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error" + err
            });
        }
        res.json(data.nModified + " Updated User");
    });
};

// exports.addNotification = (req, res) => {

//     var transactionPrefix = "notifRideradar";
//     var notificationId = transactionPrefix + moment().format("x");
//     let DateCreated = new Date();

//     const { notification } = req.body;
//     let not = new notificationDb({notificationId, notification, DateCreated});


//     not.save((err, data) => {
//         console.log("check" + err)
//         if (err) {
//             return res.status(400).json({
//                 error: err.errmsg
//             });
//         }

//         res.json("notification added! " + notification); // dont do this res.json({ tag: data });
//     });
// };


// exports.addSavePlace = (req, res) => {


//   const token = req.headers.authorization.split (' ')[1]
//   const data = decode_token (token)

//   User.findOne({ _id : data }).exec((err, user) => {
//     const { _id} = user;
    
//     var userId = _id;
//     const { savePlaceName, long, lat, details } = req.body;
//     let not = new savePlace({userId, savePlaceName, long, lat, details});


//     not.save((err, data) => {
//         console.log("check" + err)
//         if (err) {
//             return res.status(400).json({
//                 error: err.errmsg
//             });
//         }

//         res.json("save place added! " + savePlaceName); // dont do this res.json({ tag: data });
//     });
// });
// };



// exports.getSavePlace = (req, res) => {


//     const token = req.headers.authorization.split (' ')[1]
//     const data = decode_token (token)
  
//     User.findOne({ _id : data }).exec((err, user) => {
//       const { _id} = user;
//       savePlace.find({ userId: _id }).exec((err, savePlaces) => {
//         if (err) {  
//             return res.status(400).json({
//                 error: 'inventory not found'
//             });
//         }
//         res.json({
//             "identifier": "get all save places", savePlaces
//         });
// });
      
//   });
//   };