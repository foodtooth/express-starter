'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('vsk:helpers:mongoose');

const mongooseConfig = require('config').get('mongoose');

debug('mongooseConfig: %O', mongooseConfig);

mongoose.Promise = Promise;
mongoose.connect(mongooseConfig.url, mongooseConfig.connectOptions);

module.exports = mongoose;