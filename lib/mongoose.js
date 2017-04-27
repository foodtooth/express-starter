let mongoose = require('mongoose');

let utils = require('./utils');
let connectionOptions = require('config').get('mongoose.connectionOptions');

mongoose.conn = mongoose.createConnection(utils.mongooseUrl, connectionOptions);
mongoose.conn.on('error', function(err) {
  if (err) {
    console.log('err:', err);
  }
});

module.exports = mongoose;
