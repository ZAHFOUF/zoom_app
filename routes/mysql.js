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
})

module.exports = mysql
