 const mysql = require('mysql2');
 const config = require('./config/config')

const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    database: config.db_database,
    port: config.db_port,
    password: config.db_password,
}).promise();

module.exports = pool;



