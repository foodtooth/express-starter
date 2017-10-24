const mongoose = require('mongoose');
const debug = require('debug')('es:helpers:mongoose');

const mongooseConfig = require('config').get('mongoose');

debug('mongooseConfig: %O', mongooseConfig);

mongoose.Promise = require('bluebird');

mongoose.connect(mongooseConfig.url, mongooseConfig.connectOptions);

module.exports = mongoose;
