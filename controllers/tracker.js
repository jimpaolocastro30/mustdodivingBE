let config = require('../env.js');
let mysql = require('mysql');




exports.addTransactionTracker = (req, res) => {
  const { userFirstname, userLastname, userCurrentLocation, userDestination, userChosenProvider} = req.body;
    let rideDatetime = new Date();
    let sql = `insert into ride_transaction_tbl (user_firstname, user_lastname, user_current_location, user_destination, user_chosen_provider,ride_datetime) values (?,?,?,?,?,?);`;
     
    let connection = mysql.createConnection(config);
  
    connection.query(sql,[userFirstname, userLastname, userCurrentLocation, userDestination, userChosenProvider,rideDatetime], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("inserted transaction logs" + userChosenProvider);
    });
    connection.end();
};



exports.getTransactionTrackerDetails = (req, res) => {
  const limit = req.query.limit
  // page number
  const page = req.query.page
  // calculate offset
  const offset = (page - 1) * limit
  // query for fetching data with page number and offset+
  let connection = mysql.createConnection(config);
  const prodsQuery = "select * from ride_transaction_tbl limit "+limit+" OFFSET "+offset
    connection.query(prodsQuery, (error, results, fields) => {
      // When done with the connection, release it.
      connection.end();
           if (error) throw error;
      // create payload
      var jsonResult = {
        'products_page_count':results.length,
        'page_number':page,
        'products':results
      }
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = "Products for page "+page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    })
};


exports.getTransactionPerUser = (req, res) => {
  const limit = req.query.limit
  // page number
  const page = req.query.page
  // calculate offset
  const offset = (page - 1) * limit
  // query for fetching data with page number and offset+
  let connection = mysql.createConnection(config);
  const prodsQuery = "select * from ride_transaction_tbl where user_firstname = +firstname+ and user_lastname = +lastname+ limit "+limit+" OFFSET "+offset
    connection.query(prodsQuery, (error, results, fields) => {
      // When done with the connection, release it.
      connection.end();
           if (error) throw error;
      // create payload
      var jsonResult = {
        'products_page_count':results.length,
        'page_number':page,
        'products':results
      }
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = "Products for page "+page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    })
};


exports.getTransactionTrackerCount = (req, res) => {
  let sql = `select user_chosen_provider as provider, COUNT(*) as total_transaction from ride_transaction_tbl GROUP BY user_chosen_provider`;

  let connection = mysql.createConnection(config);
  
  connection.query(sql, (error, results, fields) => {
      if (error) return console.error(error.message);
      return res.json(results);
  });
  connection.end();
};

exports.addRegistrationTracker = (req, res) => {
  const { firstName, lastName, userNumber} = req.body;
    let dateRegistration = new Date();
    let sql = `insert into registration_rideradar_logs (first_name, last_name, user_number, date_registration) values (?,?,?,?);`;
     
    let connection = mysql.createConnection(config);
  
    connection.query(sql,[firstName, lastName, userNumber,dateRegistration], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("inserted registration logs");
    });
    connection.end();
};


exports.getRegistrationTrackerDetails = (req, res) => {
  // let sql = `select * from registration_rideradar_logs`;

  const limit = req.query.limit
  // page number
  const page = req.query.page
  // calculate offset
  const offset = (page - 1) * limit
  // query for fetching data with page number and offset+
  let connection = mysql.createConnection(config);
  const prodsQuery = "select * from registration_rideradar_logs limit "+limit+" OFFSET "+offset
    connection.query(prodsQuery, (error, results, fields) => {
      // When done with the connection, release it.
      connection.end();
           if (error) throw error;
      // create payload
      var jsonResult = {
        'products_page_count':results.length,
        'page_number':page,
        'products':results
      }
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = "Products for page "+page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    })
};

exports.getRegistrationTrackerCount = (req, res) => {
  let sql = `select COUNT(*) as total  from registration_rideradar_logs`;

  let connection = mysql.createConnection(config);
  
  connection.query(sql, (error, results, fields) => {
      if (error) return console.error(error.message);
      return res.json(results);
  });
  connection.end();
};