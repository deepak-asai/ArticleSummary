require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  message: process.env.MESSAGE || 'Hello World!'
};
