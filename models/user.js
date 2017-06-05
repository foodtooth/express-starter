'use strict';

const uuid = require('uuid');
const debug = require('debug')('vsk:models:user');

const utils = require('../helpers/utils');
const mongoose = require('../helpers/mongoose');
const schemaOptions = require('config').get('mongoose.schemaOptions');
const env = require('config').get('env');

const Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - username
 *       - email
 *     properties:
 *       username:
 *         type: string
 *       age:
 *         type: number
 *       name:
 *         first:
 *           type: string
 *         last:
 *           type: string
 */
const userSchema = new Schema({
  _id: { type: String, default: uuid },
  age: { type: Number, min: 1 },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: utils.emailRegex,
    lowercase: true,
  },
  extra: { type: Schema.Types.Mixed, default: {} },
  spouses: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: env.username.max,
    minlength: env.username.mix,
  },
}, schemaOptions);

const User = mongoose.model('User', userSchema);

User.on('error', (error) => {
  debug(error);
});

module.exports = User;
