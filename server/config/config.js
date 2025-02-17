const config={}
config.port=process.env.NODE_PORT;
config.node_env=process.env.NODE_ENV;
config.db_host=process.env.DB_HOST;
config.db_port=process.env.DB_PORT;
config.db_user=process.env.DB_USER;
config.db_database=process.env.DB_DATABASE;
config.db_password =process.env.DB_PASSWORD;


// NODE_PORT = 3000
// NODE_ENV = developement
// DB_HOST = localhost
// DB_PASSWORD = mysql24
// DB_PORT = 3306
// DB_USER ='root'
// DB_DATABASE ='database_event_management'
module.exports=config;