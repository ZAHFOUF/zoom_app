const sqlmodule=require('mysql')
const config=require('../config/connection.json')
const mysql=sqlmodule.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database
})

mysql.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

      // Define the SQL query to create the necessary tables
  const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS room (
    id varchar(500),
    name VARCHAR(500),
    number int(11) ,
    password varchar(500) DEFAULT NULL
  );
`;

mysql.query(createTablesQuery,(err,result)=>{
    if (err) throw err;
    console.log("Tables Al ready exixting in the db !!");
})



})

module.exports = mysql
