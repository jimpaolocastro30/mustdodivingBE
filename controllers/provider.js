let config = require('../env.js');
let mysql = require('mysql');


exports.addProvider = (req, res) => {
  const { iconUrl, name, redirUrl, rate, category} = req.body;
    let sql = `insert into provider (icon_url, name, redir_url, rate, category) values (?,?,?,?,?);`;
     
    let connection = mysql.createConnection(config);
  
    connection.query(sql,[iconUrl, name, redirUrl, rate, category], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("inserted provider" + name);
    });
    connection.end();
};

exports.updateProvider = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { iconUrl, name, redirUrl, rate, category} = req.body;
    let sql = `UPDATE provider SET redir_url= ?, name = ?, redir_url = ?, rate = ?, category = ? where id_provider = ?;`;
     
    let connection = mysql.createConnection(config);
  
    connection.query(sql,[iconUrl, name, redirUrl, rate, category, slug], (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(error)
        return res.json("updated provider" + name);
    });
    connection.end();
};

exports.getProvider= (req, res) => {

  const category = req.query.category;

  let sql = `select * from provider where category = ?`;

  let connection = mysql.createConnection(config);
  
  connection.query(sql,[category], (error, results, fields) => {
      if (error) return console.error(error.message);
      return res.json(results);
  });
  connection.end();
};

exports.getOneProvider= (req, res) => {
  const slug = req.params.slug.toLowerCase();
  console.log("dasda " + slug)

  let sql = `select * from provider where id_provider = ?`;

  let connection = mysql.createConnection(config);
  
  connection.query(sql,[slug], (error, results, fields) => {
      if (error) return console.error(error.message);
      return res.json(results);
  });
  connection.end();
};

