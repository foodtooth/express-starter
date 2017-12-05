const mongoose = require('mongoose');
const debug = require('debug')('es:helpers:mongoose');

const mongooseConfig = require('config').get('mongoose');

debug('mongooseConfig: %O', mongooseConfig);

mongoose.Promise = require('bluebird');

const dbUrl =
  process.env.NODE_ENV === 'development' ?
    mongooseConfig.url :
    mongooseConfig[`url_${process.env.NODE_ENV}`] || mongooseConfig.url;

mongoose.connect(dbUrl, Object.assign({ useMongoClient: true }, mongooseConfig.connectOptions));

module.exports = mongoose;
