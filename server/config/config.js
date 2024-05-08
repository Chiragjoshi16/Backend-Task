// config.js

require('dotenv').config();

module.exports = {
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING
  },
  jwtSecret: process.env.JWT_SECRET 
};
